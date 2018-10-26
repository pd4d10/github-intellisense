const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const configs = require('./webpack.config')

// TODO Tree shaking
module.exports = configs.map((config, index) => ({
  ...config,
  mode: 'production',
  devtool: false,
  optimization: {
    noEmitOnErrors: false,
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true,
          },
          output: {
            // Fix Safari error:
            // SyntaxError: Invalid regular expression: missing terminating ] for character class
            ascii_only: true,
          },
        },
      }),
    ],
  },
  plugins: [
    ...config.plugins,
    new BundleAnalyzerPlugin({
      analyzerPort: 8888 + index,
    }),
  ],
}))
