// seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create users
    const user1 = await prisma.user.create({
        data: {
            email: 'user1@example.com',
            name: 'User One',
            password: 'password123', // Ensure to hash passwords in production
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    const user2 = await prisma.user.create({
        data: {
            email: 'user2@example.com',
            name: 'User Two',
            password: 'password123', // Ensure to hash passwords in production
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    // Create workspaces
    const workspace1 = await prisma.workspace.create({
        data: {
            name: 'Workspace One',
            description: 'Description for Workspace One',
            workspaceEmoji: '🚀',
            userId: user1.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    const workspace2 = await prisma.workspace.create({
        data: {
            name: 'Workspace Two',
            description: 'Description for Workspace Two',
            workspaceEmoji: '💡',
            userId: user2.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    // Create workspace documents
    await prisma.workspaceDocument.createMany({
        data: [
            {
                name: 'Document One',
                content: 'Content for Document One',
                workspaceId: workspace1.id,
                userId: user1.id,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Document Two',
                content: 'Content for Document Two',
                workspaceId: workspace2.id,
                userId: user2.id,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
    });

    // Create uploaded documents
    await prisma.uploadedDocument.createMany({
        data: [
            {
                name: 'File One',
                url: 'http://example.com/file1.pdf',
                size: 1024,
                type: 'application/pdf',
                userId: user1.id,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'File Two',
                url: 'http://example.com/file2.png',
                size: 2048,
                type: 'image/png',
                userId: user2.id,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
    });

    // Create workspace members
    await prisma.workspaceMember.createMany({
        data: [
            {
                userId: user1.id,
                workspaceId: workspace1.id,
                role: 'admin',
            },
            {
                userId: user2.id,
                workspaceId: workspace2.id,
                role: 'member',
            },
        ],
    });

    console.log('Seeding completed!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
