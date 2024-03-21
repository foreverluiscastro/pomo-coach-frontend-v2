/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/signup',
        destination: 'http://localhost:3001/api/signup',
      },
      {
        source: '/login',
        destination: 'http://localhost:3001/api/login',
      },
      {
        source: '/me',
        destination: 'http://localhost:3001/api/me'
      },
      {
        source: '/logout',
        destination: 'http://localhost:3001/api/logout'
      },
      {
        source: '/pomo_sessions',
        destination: 'http://localhost:3001/api/pomo_sessions'
      },
      {
        source: '/ai-analyzer',
        destination: 'http://localhost:3001/api/ai-analyzer',
      }
    ];
  },
};

export default nextConfig;