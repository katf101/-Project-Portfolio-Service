const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const prod = process.env.NODE_ENV === "production";

module.exports = {
  reactStrictMode: true,
  images: {
    domains: [prod ? "http://api.foli.site/" : "http://localhost:3060/"],
  },
};

module.exports = withBundleAnalyzer({
  compress: true,
  webpack(config, { webpack }) {
    return {
      ...config,
      mode: prod ? "production" : "development",
      devtool: prod ? "hidden-source-map" : "eval-source-map",
      plugins: [
        ...config.plugins,
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
      ],
    };
  },
});
