const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        path: path.join(__dirname, '/build'),
        filename: '[name].js'
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    plugins: [
        // webpack2 需要设置 LoaderOptionsPlugin 开启代码压缩
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        // Uglify的配置
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            compress: {
                warnings: false,
                drop_console: true,
                collapse_vars: true
            }
        })
    ],
    resolve: {
        // 给src目录一个路径，避免出现'../../'这样的引入
        alias: {
            _: path.resolve(__dirname, 'src')
        }
    },
    module: {
        rules: [{
                test: /\.jsx?$/,
                // 可以在这里配置babelrc，也可以在项目根目录加.babelrc文件
                options: {
                    // false是不使用.babelrc文件
                    babelrc: false,

                    // webpack2 需要设置modules 为false
                    presets: [
                        ['es2015', {
                            'modules': false
                        }],
                        'react'
                    ],

                    // babel的插件
                    plugins: [
                        'react-require',
                        'transform-object-rest-spread'
                    ]
                }
            }, {
                // 这是sass的配置，less配置和sass一样，把sass-loader换成less-loader即可
                // webpack2 使用use来配置loader，并且不支持字符串形式的参数，x需要使用options
                // loader的加载顺序是从后向前的，这里是 sass -> postcss -> css -> style
                test: /\.scss$/,
                use: [{
                        loader: 'style-loader'
                    },

                    {
                        loader: 'css-loader',

                        // 开启了CSS Module功能，避免类名冲突问题
                        options: {
                            modules: true,
                            localIdentName: '[name]-[local]'
                        }
                    },

                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function() {
                                return [
                                    autoprefixer
                                ]
                            }
                        }
                    },

                    {
                        loader: 'sass-loader'
                    }
                ]
            },

            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: './images/[name].[ext]'
                    }
                }]
            }
        ]
    }



}