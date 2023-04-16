/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    i18n: {
        locales: ['en-US', 'zh'],
        defaultLocale: 'en-US',
    }
};

module.exports = nextConfig;
