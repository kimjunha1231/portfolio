import type { NextConfig } from "next";

const agentDiscoveryLinkHeader = [
  '</llms.txt>; rel="describedby"; type="text/plain"',
  '</skill.md>; rel="service-desc"; type="text/markdown"',
  '</.well-known/agent-skills/index.json>; rel="alternate"; type="application/json"',
].join(", ");

const nextConfig: NextConfig = {
  async headers() {
    return [
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
