/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb"
    }
  },
  async redirects() {
    return [
      // Old admin routes → new SPT admin
      { source: "/admin", destination: "/spt/admin/dashboard", permanent: true },
      { source: "/admin/:path*", destination: "/spt/admin/:path*", permanent: true },
      // Old vip-signals route → new SPT route
      { source: "/vip-signals", destination: "/spt/vip-signals", permanent: true }
    ];
  }
};

export default nextConfig;
