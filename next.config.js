/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  api: {
    bodyParser: false // we'll parse manually for file uploads
  }
}
module.exports = nextConfig
