module.exports = (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    images: {
      domains: ['localhost', 's3.amazonaws.com'],
    },
  }
  return nextConfig
}