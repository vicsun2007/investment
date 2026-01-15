/** @type {import('next').NextConfig} */
// 如果使用路径前缀方案（/investment/），使用此配置
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  basePath: '/investment',
  assetPrefix: '/investment',
}

module.exports = nextConfig

