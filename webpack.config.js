const { resolve } = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './js/index.js', // точка входа для webpack
    output: {
        filename: 'main.[contenthash].js', // выходной js файл 
        path: resolve(__dirname, 'build'),
        clean: true,
    },
    module: {
        rules: [
            // правило для экспорта аудио файлов в папку build/audio
            {
                test: /\.(wav|mp3)$/i,
                loader: 'file-loader',
                options: {
                    outputPath: 'audio',
                    name: '[name].[contenthash].[ext]'
                }
            },
            // // правило для экспорта граф файлов в папку build/images
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    outputPath: 'images',
                    name: '[hash:4]-[name].[ext]'
                }
            },
            // правило для экспорта css файлов
            {
                test: /\.css$/i,
                use: [MiniCssExtPlugin.loader, 'css-loader']
                // use: [MiniCssExtPlugin.loader, { loader: 'css-loader', options: { url: true } }]
                // use: [
                //     (info) => (
                //         MiniCssExtPlugin.loader, { loader: 'css-loader', options: { url: true } }
                //     )]
            },
            // правило для экспорта sass/scss файлов
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtPlugin.loader, 'css-loader', 'sass-loader']
                // use: [
                //     MiniCssExtPlugin.loader,
                //     { loader: 'css-loader', options: { url: false } },
                //     { loader: 'sass-loader', options: { sourceMap: true } }
                // ]
            }
        ]
    },
    plugins: [
        new HtmlPlugin({ template: resolve(__dirname, 'index.html') }), // плагин для экспорта index.html

        new MiniCssExtPlugin({                  // плагин для создания css файла
            filename: '[name].[contenthash].css'
        }),
    ]
}