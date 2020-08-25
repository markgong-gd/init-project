const webpack = require('webpack');
const { merge } = require('webpack-merge');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const baseConfig = require('./webpack.base');

const devConfig = {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin()
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    stats: 'errors-only'
  },
  devtool: 'cheap-source-map'
};

module.exports = merge(baseConfig, devConfig);
