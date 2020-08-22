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
    npm install less-loader --save-dev
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
***hello world已经完成，详细代码可参考tag v1.0.0***