const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { ModuleFederationPlugin } = require("webpack").container

const swcLoader = {
  test: /\.m?jsx?$/,
  exclude: /(node_modules)/,
  use: {
    loader: "swc-loader",
  },
}

module.exports = () => ({
  mode: "development",
  cache: true,
  target: "web",
  devtool: false,
  entry: path.resolve(__dirname, "./src/main.js"),
  output: {
    publicPath: "/",
  },
  module: {
    rules: [swcLoader],
  },
  plugins: [
    new ModuleFederationPlugin({
      shared: ["swr", "swr/inifinite"],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname),
    },
    compress: true,
    port: 5001,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
})
