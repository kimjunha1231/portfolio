import type { NextConfig } from "next";

const agentDiscoveryLinkHeader = [
  '</llms.txt>; rel="describedby"; type="text/plain"',
  '</skill.md>; rel="service-desc"; type="text/markdown"',
  '</.well-known/agent-skills/index.json>; rel="alternate"; type="application/json"',
].join(", ");

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/",
        headers: [{ key: "Link", value: agentDiscoveryLinkHeader }],
      },
      {
        source: "/projects",
        headers: [{ key: "Link", value: agentDiscoveryLinkHeader }],
      },
      {
        source: "/projects/:slug",
        headers: [{ key: "Link", value: agentDiscoveryLinkHeader }],
      },
      {
        source: "/blog",
        headers: [{ key: "Link", value: agentDiscoveryLinkHeader }],
      },
      {
        source: "/blog/:slug",
        headers: [{ key: "Link", value: agentDiscoveryLinkHeader }],
      },
    ];
  },
};

export default nextConfig;
