import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'

export default {
  devtool: 'source-map',

  optimization: {
    runtimeChunk: true,
    usedExports: true,
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: ['default', { normalizeWhitespace: false }],
        },
      }),
      new TerserPlugin({
        exclude: ['defaults/preferences/prefs.js'],
        terserOptions: {
          format: {
            semicolons: false,
          },
        },
      }),
    ],
  },
}
