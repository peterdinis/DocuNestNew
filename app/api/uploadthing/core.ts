import { db } from "@/app/_utils/db";
import axios from "axios";
import { getServerSession } from "next-auth";
import { type FileRouter, createUploadthing } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import authOptions from "../auth/authOptions";

const f = createUploadthing();

export const uploadRouter = {
	fileUploader: f(["application/pdf", "text/plain", "application/msword"])
		.middleware(async () => {
			const session = await getServerSession(authOptions);
			if (!session || !session.user) {
				throw new UploadThingError("Unauthorized");
			}
			return { userId: session.user.id };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			try {
				const session = await getServerSession(authOptions);
				if (!session || !session.user) {
					throw new UploadThingError("Unauthorized");
				}
				await db.uploadedDocument.create({
					data: {
						name: file.name,
						size: file.size,
						url: file.url,
						userId: metadata.userId,
						type: file.type,
					},
				});
				await axios.post("/api/notifications", {
					userId: session.user.id,
					title: "New Document",
					message: `New document was uploaded ${file.name}`,
				});
				return { uploadedBy: metadata.userId };
			} catch (error) {
				console.error("Error in onUploadComplete:", error);
			}
		}),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
