/** @type {import("next").NextConfig} */

const config = {
    reactStrictMode: true,
    experimental: {
       optimizeCss: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default config;
