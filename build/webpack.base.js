const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const rootPath = process.cwd();

function setMPA() {
    const entry = {},
        htmlWebpackPlugin = [];

    const pageFiles = glob.sync(path.join(rootPath, 'src/*/index.js'));
    Object.keys(pageFiles)
        .forEach(index => {
            const pageFile = pageFiles[index];
            const match = pageFile.match(/src\/(.*)\/index\.js/);
            const pageName = match && match[1];
            entry[pageName] = pageFile;
            htmlWebpackPlugin.push(
                new HtmlWebpackPlugin({
                    filename: `${pageName}.html`,
                    template: path.join(rootPath, `src/${pageName}/index.html`),
                    inject: true, // 打包后的入口文件是否自动注入到html中
                    chunks: [`${pageName}`]
                })
            )
        })

    return {
        entry,
        htmlWebpackPlugin
    }
}

const { entry, htmlWebpackPlugin } = setMPA();

module.exports = {
    entry,
    output: {
        filename: '[name][hash:8].js',
        path: path.join(rootPath, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ],
            },
            {
                test: /.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')({
                                    overrideBrowserslist: ['last 2 version', '>1%', 'ios 7']
                                })
                            ]
                        }
                    },
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrecision: 8
                        }
                    },
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]',
                            outputPath: 'images'
                        }
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]'
                        }
                    },
                ],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:8].css'
        }),
        new CleanWebpackPlugin()
    ].concat(htmlWebpackPlugin)
}