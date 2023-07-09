import { resolve, dirname } from 'path'
import * as url from 'url'
import { createRequire } from 'node:module'

import CopyPlugin from 'copy-webpack-plugin'
import preprocess from 'svelte-preprocess'

import devSettings from './dev.js'
import prodSettings from './prod.js'

const require = createRequire(import.meta.url)
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export default (emv, argv) => {
  const dev = argv.mode === 'development'

  console.log(dirname(require.resolve('svelte/package.json')))

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
            'style-loader',
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader',
          ],
        },
      ],
    },
    plugins: [new CopyPlugin({ patterns: [{ from: 'static' }] })],

    experiments: {
      topLevelAwait: true,
    },

    ...(dev ? devSettings : prodSettings),
  }
}
