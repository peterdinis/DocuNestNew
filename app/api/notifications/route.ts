import { db } from "@/app/_utils/db";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const { userId, title, message } = await req.json();
	try {
		const notification = await db.notification.create({
			data: { userId, title, message },
		});

		if (!notification) {
			throw new Error("Failed to create new notification");
		}

		return NextResponse.json(notification);
	} catch (error) {
		return NextResponse.json(
			{ error: "Error creating notification" },
			{ status: 500 },
		);
	}
}
