export default {
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    allowedHosts: ['all'],
    devMiddleware: {
      writeToDisk: true,
    },
    client: {
      logging: 'verbose',
    },
  },
  optimization: {
    runtimeChunk: true,
  },
}
