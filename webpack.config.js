const config = {
  mode: "production",
  entry: {
    index: "./src/js/index.js",
    parents: "./src/js/parents.js",
    public: "./src/js/public.js",
    legislation: "./src/js/legislation.js",
    groups: "./src/js/groups.js",
    advice: "./src/js/advice.js",
    translations: "./src/js/translations.js",
  },
  output: {
    filename: "[name].bundle.js",
  },
  performance: {
    hints: "warning",
    maxAssetSize: 250000, // Розмір файлу в байтах
    maxEntrypointSize: 250000, // Розмір entrypoint в байтах
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  resolve: {
    fallback: {
      fs: require.resolve("browserify-fs"),
      constants: require.resolve("constants-browserify"),
      path: require.resolve("path-browserify"),
      os: require.resolve("os-browserify/browser"),
      util: require.resolve("util/"),
      assert: require.resolve("assert/"),
      stream: require.resolve("stream-browserify"),
      domain: require.resolve("domain-browser"),
    },
  },
};

module.exports = config;
