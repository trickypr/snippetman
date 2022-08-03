import { resolve } from "path";
import * as url from "url";
import CopyPlugin from "copy-webpack-plugin";
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export default {
  entry: "./src/main.tsx",
  output: {
    path: resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  mode: "development",
  devtool: "inline-source-map",
  stats: "errors-only",
  devServer: {
    static: "./dist",
    hot: true,
    allowedHosts: ["all"],
    devMiddleware: {
      writeToDisk: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          getCustomTransformers: () => ({
            before: [ReactRefreshTypeScript()],
          }),
          transpileOnly: true,
        },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /\.module\.css$/,
      },
    ],
  },
  plugins: [
    new ReactRefreshPlugin(),
    new CopyPlugin({
      patterns: [{ from: "public" }],
    }),
  ],
  optimization: {
    runtimeChunk: "single",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
};
