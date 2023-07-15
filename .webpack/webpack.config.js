import { resolve } from 'path'
import * as url from 'url'

import CopyPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import preprocess from 'svelte-preprocess'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import devSettings from './dev.js'
import prodSettings from './prod.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export default (emv, argv) => {
  const dev = argv.mode === 'development'

  return {
    name: 'Client',
    entry: {
      main: './src/index.ts',
    },
    output: {
      path: resolve(__dirname, '..', 'dist'),
      filename: '[name].js',
      clean: true,
    },
    resolve: {
      alias: {
        '~': resolve(__dirname, '..', 'src'),
        // svelte: resolve(__dirname, '..', 'node_modules', 'svelte'),
      },
      extensions: ['.ts', '.mjs', '.js', '.svelte'],
    },

    module: {
      rules: [
        {
          test: /\.svelte$/,
          use: {
            loader: 'svelte-loader',
            options: {
              compilerOptions: {
                dev,
              },
              emitCss: !dev,
              hotReload: dev,
              preprocess: preprocess({
                postcss: true,
              }),
            },
          },
        },
        {
          test: /node_modules\/svelte\/.*\.mjs$/,
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: {
            context: resolve(__dirname, '..'),
            configFile: resolve(__dirname, '..', 'tsconfig.json'),
          },
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [
            dev ? 'style-loader' : MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader',
          ],
        },
        {
          test: /\.sql$/,
          type: 'asset/source',
        },
      ],
    },
    plugins: [
      // new CopyPlugin({ patterns: [{ from: 'static' }] }),
      new HtmlWebpackPlugin({
        title: 'SnippetMan',
        template: 'src/index.html',
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
    ],

    experiments: {
      topLevelAwait: true,
    },

    ...(dev ? devSettings : prodSettings),
  }
}
