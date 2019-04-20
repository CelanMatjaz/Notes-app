const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const clientConfig = {
    mode: 'development',
    entry: ['@babel/polyfill', './src/client/index.js'],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'main.[contenthash].bundle.js'
    },
    module: {
        rules: [
            { test: /\.(js)$/, use: 'babel-loader' },
            { test: /\.(jsx)$/, use: 'babel-loader' },
            { test: /\.(scss)$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __isBrowser__: "true"
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "maincss.[contenthash].css",
        })
    ]
}

const serverConfig = {
    mode: 'development',
    entry: ['@babel/polyfill', './src/server/index.js'],
    target: 'node',
    externals: [nodeExternals()],
    output: {
        path: __dirname,
        filename: './server.js'
    },
    module: {
        rules: [
            { test: /\.(js)$/, use: 'babel-loader' },
            { test: /\.(jsx)$/, use: 'babel-loader' },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __isBrowser__: "false"
        })
    ]
  }


  module.exports = [clientConfig, serverConfig]