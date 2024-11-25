/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      // {
      //   source: '/signup',
      //   destination: 'http://localhost:3001/api/signup',
      // },
      // {
      //   source: '/login',
      //   destination: 'http://localhost:3001/api/login',
      // },
      // {
      //   source: '/me',
      //   destination: 'http://localhost:3001/api/me'
      // },
      // {
      //   source: '/logout',
      //   destination: 'http://localhost:3001/api/logout'
      // },
      // {
      //   source: '/pomo_sessions',
      //   destination: 'http://localhost:3001/api/pomo_sessions'
      // },
      // {
      //   source: '/ai-analyzer',
      //   destination: 'http://localhost:3001/api/ai-analyzer',
      // },
      {
        source: '/signup',
        destination: 'http://18.226.169.30/api/signup',
      },
      {
        source: '/login',
        destination: 'http://18.226.169.30/api/login',
      },
      {
        source: '/me',
        destination: 'http://18.226.169.30/api/me'
      },
      {
        source: '/logout',
        destination: 'http://18.226.169.30/api/logout'
      },
      {
        source: '/pomo_sessions',
        destination: 'http://18.226.169.30/api/pomo_sessions'
      },
      {
        source: '/ai-analyzer',
        destination: 'http://18.226.169.30/api/ai-analyzer',
      }
    ];
  },
};

export default nextConfig;