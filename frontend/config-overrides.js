const { override, addWebpackModuleRule } = require("customize-cra");

module.exports = override(
  addWebpackModuleRule({
    test: /\.js$/,
    enforce: "pre",
    use: ["source-map-loader"],
    exclude: /node_modules\/timeago.js/,
  }),
  addWebpackModuleRule({
    test: /\.(js|mjs|jsx|ts|tsx)$/,
    include: /src/,
    loader: require.resolve("babel-loader"),
    options: {
      customize: require.resolve("babel-preset-react-app/webpack-overrides"),
      presets: [
        [
          require.resolve("babel-preset-react-app"),
          {
            runtime: "automatic",
          },
        ],
      ],
      plugins: [
        [
          require.resolve("babel-plugin-named-asset-import"),
          {
            loaderMap: {
              svg: {
                ReactComponent: "@svgr/webpack?-svgo,+titleProp,+ref![path]",
              },
            },
          },
        ],
      ],
      cacheDirectory: true,
      cacheCompression: false,
      compact: false,
    },
  })
);
