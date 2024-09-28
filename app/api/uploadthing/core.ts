import { getServerSession } from 'next-auth';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import authOptions from '../auth/authOptions';
import { db } from '@/app/_utils/db';

const f = createUploadthing();

export const uploadRouter = {
    fileUploader: f(['application/pdf', 'text/plain', 'application/msword'])
        .middleware(async () => {
            const session = await getServerSession(authOptions);
            if (!session || !session.user) {
                throw new UploadThingError('Unauthorized');
            }
            return { userId: session.user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            try {
                await db.uploadedDocument.create({
                    data: {
                        name: file.name,
                        size: file.size,
                        url: file.url,
                        userId: metadata.userId,
                        type: file.type,
                    },
                });
                return { uploadedBy: metadata.userId };
            } catch (error) {
                console.error('Error in onUploadComplete:', error);
            }
        }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
