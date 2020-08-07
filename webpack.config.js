const path = require('path');
const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, 'src')
}

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'public')
    },
    devServer: {
        contentBase: './public',
        writeToDisk: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'ify-loader'
            },
            {
                test: /\.(a?png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            outputPath: 'images'
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|gif|bmp|mp3|mp4|ogg|wav)$/,
                use: 'file-loader'
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'fonts'
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            outputPath: 'css'
                        }
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('tailwindcss'),
                                require('postcss-nesting'),
                                require('autoprefixer')
                            ]
                        }
                    },
                    'less-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.ejs'
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', "!CNAME", "!data/**", "!api/**"]
        }),
        new OptimizeCssAssetsPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
        })
    ],
    mode: mode,
    devtool: prod ? false : 'inline-source-map'
};