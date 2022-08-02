import { resolve } from "path";
import * as url from "url";
import CopyPlugin from "copy-webpack-plugin";

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
    devMiddleware: {
      writeToDisk: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "esbuild-loader",
        options: {
          loader: "tsx", // Or 'ts' if you don't need tsx
          target: "es2019",
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
