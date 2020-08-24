const { merge } = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // css 压缩
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin') // cdn 托管第三方包
const baseConfig = require('./webpack.base');

const profConfig = {
    mode: 'production',
    plugins: [
        new HtmlWebpackExternalsPlugin({
            externals: [
                {
                    module: 'react',
                    entry: 'https://cdn.staticfile.org/react/0.0.0-0c756fb-f7f79fd/umd/react.production.min.js',
                    global: 'React',
                },
                {
                    module: 'react-dom',
                    entry: 'https://cdn.staticfile.org/react-dom/0.0.0-0c756fb-f7f79fd/umd/react-dom.production.min.js',
                    global: 'ReactDOM',
                }
            ]
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin()],
    }
};

module.exports = merge(baseConfig, profConfig);