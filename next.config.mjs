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
        destination: 'https://18.226.169.30/api/signup',
      },
      {
        source: '/login',
        destination: 'https://18.226.169.30/api/login',
      },
      {
        source: '/me',
        destination: 'https://18.226.169.30/api/me'
      },
      {
        source: '/logout',
        destination: 'https://18.226.169.30/api/logout'
      },
      {
        source: '/pomo_sessions',
        destination: 'https://18.226.169.30/api/pomo_sessions'
      },
      {
        source: '/ai-analyzer',
        destination: 'https://18.226.169.30/api/ai-analyzer',
      }
    ];
  },
};

export default nextConfig;