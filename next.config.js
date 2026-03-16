/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['pbs.twimg.com', 'abs.twimg.com'],
  },
  // 修复开发模式下的 chunk 缓存问题
  experimental: {
    // 使用更稳定的 webpack 配置
    optimizePackageImports: ['react-markdown', 'remark-gfm'],
  },
  // 强制使用稳定的 chunk ID
  webpack: (config, { dev }) => {
    if (dev) {
      config.optimization = {
        ...config.optimization,
        chunkIds: 'named', // 使用命名 chunk ID，避免数字 ID 不一致
      }
    }
    return config
  },
}

module.exports = nextConfig