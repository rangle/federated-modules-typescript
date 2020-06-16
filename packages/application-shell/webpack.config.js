// @ts-check
const HtmlWebpackPlugin = require("html-webpack-plugin");
// @ts-ignore
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");

const mode = process.env.NODE_ENV || "production";

const port = 3010;
const publicPath = `http://localhost:${port}/`;
const remoteHosts = ["http://localhost:3011", "http://localhost:3012"];

module.exports = {
  mode,
  entry: "./src/index",
  output: {
    publicPath,
  },
  devtool: "source-map",
  devServer: {
    port,
    contentBase: "./dist",
    historyApiFallback: {
      index: "index.html",
    },
  },
  optimization: {
    minimize: mode === "production",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "application_shell_remote",
      library: { type: "var", name: "application_shell_remote" },
      filename: "app-shell.js", // expose it as `app-shell.js
      remotes: {
        applicationHome: "applicationHome", // loads Home app as remote
        applicationCart: "applicationCart", // loads Cart app as remote
      },
      shared: ["react", "react-dom"],
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),

    // load the other apps entry
    new HtmlWebpackTagsPlugin({
      tags: remoteHosts.map((remoteHost) => `${remoteHost}/remoteEntry.js`),
      append: false, // prepend this as needs to be loaded before application-home
      publicPath: false,
    }),
  ],
};
