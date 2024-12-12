/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
