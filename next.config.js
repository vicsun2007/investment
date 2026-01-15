/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 只在生产构建时使用 standalone 模式
  ...(process.env.NODE_ENV === 'production' && { output: 'standalone' }),
}

module.exports = nextConfig

