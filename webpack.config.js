const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        bundle: path.resolve(__dirname, 'src/index.js'),
        articles: path.resolve(__dirname, "src/articles.js"),
        videos: path.resolve(__dirname, "src/videos.js"),
        speaking: path.resolve(__dirname, "src/speaking.js"),
        writing: path.resolve(__dirname, "src/writing.js"),
        tests: path.resolve(__dirname, "src/tests.js")
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        assetModuleFilename: '[name][ext]',
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|pdf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.pdf$/,
                use: ['url-loader']
            },
            {
                test: /\.(png|svg|jpg|gif|pdf)$/,
                use: ['file-loader']
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'My App',
            filename: 'index.html',
            template: 'src/template.html',
            chunks: ["bundle"]
        }),
        new HtmlWebpackPlugin({
            title: 'Articles',
            filename: 'articles.html',
            template: 'src/articles.html',
            chunks: ["articles"]
        }),
        new HtmlWebpackPlugin({
            title: 'Videos',
            filename: 'videos.html',
            template: 'src/videos.html',
            chunks: ["videos"]
        }),
        new HtmlWebpackPlugin({
            title: 'Speaking',
            filename: 'speaking.html',
            template: 'src/speaking.html',
            chunks: ["speaking"]
        }),
        new HtmlWebpackPlugin({
            title: 'Writing',
            filename: 'writing.html',
            template: 'src/writing.html',
            chunks: ["writing"]
        }),
        new HtmlWebpackPlugin({
            title: 'Tests',
            filename: 'tests.html',
            template: 'src/tests.html',
            chunks: ["tests"]
        })
    ],
}