### 创建目录结构
```cmd
mkdir my-project
cd my-project
npm init -y
git init
code .
```
![目录结构.png](https://i.loli.net/2020/08/22/cLmvisGNUJW984T.png)

### hello world
- 安装webpack相关
```sh
    npm i webpack webpack-cli webpack-dev-server -D
```
- 安装react相关
```sh
    npm i react react-dom -S
```

<p style="color: darkcyan; font-weight: bold">话不多说，先整些基础配置</p>

```javascript
    const path = require('path');

    module.exports = {
        entry: '../src/index/index.js',
        output: {
            filename: '[name].js',
            path: path.join(__dirname, '../dist')
        }
    }
```

- 打包es6相关
```sh
    npm install -D babel-loader @babel/core @babel/preset-env
```
```javascript
    // webpack.config.js
    module.exports = {
        ...
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                }
            ]
        }
    }

    // .babelrc
    {
        "presets": [
            "@babel/preset-env"
        ]
    }
```
- 打包react
```sh
    npm install --save-dev @babel/preset-react
```
```javascript
    // .babelrc
    {
        "presets": [
            ...
            "@babel/preset-react"
        ]
    }
```
- 打包css
```sh
    npm install --save-dev css-loader style-loader
```
```javascript
    // webpack.config.js
    module.exports = {
        ...
        module: {
            rules: [
                ...
                {
                    test: /\.css$/i,
                    use: [
                        'style-loader',
                        'css-loader'
                    ],
                }
            ]
        }
    }
```
- 打包less
```sh
    npm install less less-loader --save-dev
```
```javascript
    // webpack.config.js
    module.exports = {
        ...
        module: {
            rules: [
                ...
                {
                    test: /\.less$/,
                    use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'less-loader'
                        },
                    ],
                }
            ]
        }
    }
```
- 打包图片和字体包
```sh
    npm install file-loader --save-dev
```
```javascript
    // webpack.config.js
    module.exports = {
        ...
        module: {
            rules: [
                ...
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                        },
                    ],
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [
                        {
                            loader: 'file-loader',
                        },
                    ],
                },
            ]
        }
    }
```
- 打包html
```sh
    npm install --save-dev html-webpack-plugin
```
```javascript
    // webpack.config.js
    const HtmlWebpackPlugin = require('html-webpack-plugin');

    module.exports = {
        ...
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.join(__dirname, '../src/index/index.html'),
                inject: true // 打包后的入口文件是否自动注入到html中
            })
        ]
    }
```
- 自动清理构建目录
```sh
    npm install --save-dev clean-webpack-plugin
```
```javascript
    // webpack.config.js
    const { CleanWebpackPlugin } = require('clean-webpack-plugin');

    module.exports = {
        ...
        plugins: [
            ...
            new CleanWebpackPlugin()
        ]
    }
```

基础配置完成，改下运行脚本，开始吧！
```javascript
    {
        ...
        "script": {
            "start": "npm run dev",
            "dev": "webpack-dev-server --config ./build/webpack.config.js",
            "build": "webpack --config ./build/webpack.config.js",
        }
    }
```
***hello world已经完成，详细代码可参考tag v1.x.x***

---

<p style="color: darkcyan; font-weight: bold">这里继续深入配置</p>
- 文件指纹

入口文件：
```javascript
    ...
    output: {
        filename: '[name][chunkhash:8].js'
        ...
    }
    ...
```
css文件：

css文件设置文件指纹得先将css抽离成1个文件，可使用mini-css-extract-plugin
```sh
    npm install --save-dev mini-css-extract-plugin
```
```javascript
    // webpack.config.js
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');

    module.exports = {
        ...
        module: {
            rules: [
                ...
                {
                    test: /\.css$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        // 'style-loader',
                        'css-loader'
                    ],
                },
                {
                    test: /\.less$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        // {
                        //     loader: 'style-loader'
                        // },
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'less-loader'
                        }
                    ],
                },
            ]
        },
        plugins: [
            ...
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash:8].css'
            })
        ]
    }
```
- 自动补全css3前缀
```sh
    npm i -D postcss-loader autoprefixer
```
```javascript
    // webpack.config.js

    module.exports = {
        ...
        module: {
            rules: [
                ...
                {
                    test: /\.less$/,
                    use: [
                        ...
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: [
                                    require('autoprefixer')({
                                        overrideBrowserslist: [
                                            "last 2 version", "> 1%", "ios 7"
                                        ]
                                    })
                                ]
                            }
                        }
                    ],
                }
            ]
        }
    }
```

<p style="color: darkcyan; font-weight: bold">针对移动端一些配置</p>
- px转换rem，配合amfe-flexible实现各个终端尺寸兼容

```sh
    npm install px2rem-loader --save-dev
    npm i -S amfe-flexible
```

```javascript
    // webpack.config.js
    module.exports = {
        ...
        module: {
            rules: [
                ...
                {
                    test: /\.less$/,
                    use: [
                        ...
                        {
                            loader: 'px2rem-loader',
                            options: {
                                remUni: 75,
                                remPrecision: 8
                            }
                        }
                    ],
                }
            ]
        }
    }
```
- 内联js
```sh
    npm install raw-loader --save-dev
```
```html
    <script>${ require('raw-loader!babel-loader!../../node_modules/amfe-flexible/index.js') }</script>
```
<p style="color: darkcyan; font-weight: bold">配置多页面入口</p>

```sh
    npm i glob
```
```javascript
    // webpack.config.js
    const glob = require('glob');

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
        ...
        entry,
        output: {
            ...
            path: path.join(rootPath, 'dist')
        },
        ...
        plugins: [
            ...
        ].concat(htmlWebpackPlugin)
    }
```

<p style="color: darkcyan; font-weight: bold">依据运行环境打包</p>

webpack.config.js --> webpack.base.js

![build.png](https://i.loli.net/2020/08/24/5usB9XAYnvGMaiL.png)

```json
    {
        ...
        "scripts": {
            ...
            "dev": "webpack-dev-server --config ./build/webpack.dev.js",
            "build": "webpack --config ./build/webpack.prod.js",
            ...
        },
        ...
    }
```
```sh
    npm install webpack-merge --save
    npm install css-minimizer-webpack-plugin friendly-errors-webpack-plugin --save-dev
    npm install html-webpack-externals-plugin --save-dev
```
```javascript
    // webpack.dev.js

    const webpack = require('webpack');
    const { merge } = require('webpack-merge');
    const baseConfig = require('./webpack.base');

    const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

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

    // webpack.prof.js

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
```

<p style="color: darkcyan; font-weight: bold">eslint</p>

- 这里使用airbnb
```sh
    npm install eslint eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-config-airbnb --save-dev

    npm install eslint-loader babel-eslint --save-dev
```
```javascript
    // .eslintrc.js

    module.exports = {
        parser: 'babel-eslint',
        env: {
            browser: true,
            node: true
        },
        extends: 'airbnb',
        rules: {
            'react/jsx-filename-extension': 'off',
            'comma-dangle': ['error', 'never']
        }
    };

    // webpack.base.js

    module.exports = {
        ...
        module: {
            relus: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader'
                        },
                        {
                            loader: 'eslint-loader'
                        }
                    ]
                }
                ...
            ]
        }
    }
```
```json
    {
        ...
        "scripts": {
            ...
            "eslint": "eslint --ext .js src/",
            "lint": "eslint --ext .js src/ --fix",
            ...
        }
    }
```

<p style="color: darkcyan; font-weight: bold">增加precommit钩子</p>
- 规范commit、push等git操作

```sh
    npm install husky validate-commit-msg lint-staged conventional-changelog-cli commitizen --save-dev
```
```json
    {
        ...
        "scripts": {
            ...
            "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0",
            "commitmsg": "validate-commit-msg",
            "commit": "git-cz "
            ...
        }
    }
    ...
    "husky": {
        "hooks": {
            "pre-commit": "lint-staged"
        }
    },
    "lint-staged": {
        "src/**/*.{js|jsx}": [
            "eslint",
            "git add"
        ]
    }
```