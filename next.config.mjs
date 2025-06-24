import withFlowbiteReact from "flowbite-react/plugin/nextjs";

/** @type {import('next').NextConfig} */

const nextConfig = {
    productionBrowserSourceMaps: false,
    webpack: (config) => {
    config.resolve.fallback = {
      tls: false,
      net: false
    };
    return config;
  }
};

export default withFlowbiteReact(nextConfig);