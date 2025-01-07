/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.S3_BASE_URL || 'your-s3-bucket.amazonaws.com', // Replace with your S3 bucket hostname
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost', // Include localhost for development
        port: '3000', // Specify the port if needed
        pathname: '**',
      },
    ],
  },
  async rewrites() {
    const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:3001'; // Default to localhost in dev
    return [
      {
        source: '/signup',
        destination: `${apiBaseUrl}/api/signup`,
      },
      {
        source: '/login',
        destination: `${apiBaseUrl}/api/login`,
      },
      {
        source: '/me',
        destination: `${apiBaseUrl}/api/me`,
      },
      {
        source: '/logout',
        destination: `${apiBaseUrl}/api/logout`,
      },
      {
        source: '/pomo_sessions',
        destination: `${apiBaseUrl}/api/pomo_sessions`,
      },
      {
        source: '/ai-analyzer',
        destination: `${apiBaseUrl}/api/ai-analyzer`,
      },
    ];
  },
};

export default nextConfig;
