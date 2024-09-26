import { createRouteHandler } from 'uploadthing/next';
import { uploadRouter } from './core';
import { UTApi } from 'uploadthing/server';

export const { GET, POST } = createRouteHandler({
    router: uploadRouter,
});