import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'

export default {
  devtool: 'source-map',

  optimization: {
    usedExports: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({ exclude: ['defaults/preferences/prefs.js'] }),
    ],
  },
}
