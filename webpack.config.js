const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: ["./src/index.tsx"],
  mode: "development",
  devtool: "inline-source-map",
  output: {
    library: "main",
    libraryTarget: "umd",
    path: path.resolve(__dirname, "dist"),
    filename: "app-bundle.js", // <--- Will be compiled to this single file
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "index.html", to: "index.html" }],
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
    ],
  },
};
