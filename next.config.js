/** @type {import('next').NextConfig} */
// we do this to make the environment variables available client side
const nextConfig = {
    reactStrictMode: true,
    env: {
        BILLIARDS_API_URL: process.env.BILLIARDS_API_URL,
    }
}

module.exports = nextConfig
