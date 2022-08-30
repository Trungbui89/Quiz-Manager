const webpack = require('webpack');
const dotenv = require('dotenv');
const env = dotenv.config().parsed;
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: process.env.NODE_ENV ? process.env.NODE_ENV : 'development', 
    // context: path.join(__dirname, 'public'),
    // entry: '../src/index.js',
    // output: {
    //     path: path.resolve(__dirname, 'build'),
    //     filename: 'index.[name].[contenthash].js',
    //     clean: true,
    // },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@components': path.resolve(__dirname, './src/components'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@constants': path.resolve(__dirname, './src/constants'),
            '@controller': path.resolve(__dirname, './src/controller/'),
            '@helper': path.resolve(__dirname, './src/helper'),
        },
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.s?css$/,
                    chunks: 'all',
                    minChunks: 1,
                    reuseExistingChunk: true,
                    enforce: true,
                },
            },
        },
        removeAvailableModules: false,
        removeEmptyChunks: false,
    },
    // devServer: {
    //     port: process.env.PORT,
    //     open: true,
    //     disableHostCheck: true,
    //     historyApiFallback: false,
    //     overlay: true,
    //     stats: 'minimal',
    //     inline: true,
    //     compress: true,
    //     contentBase: '/',
    // },
    module:{
        rules:[
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use:[
                    {
                        loader:'babel-loader',
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            },
            {
                loader: 'file-loader',
                test: /\.svg$|\.woff$|\.woff2$|\.eot$|\.ttf$|\.wav$|\.mp3$|\.ico$/,
                options: {
                    outputPath: 'assets/fonts',
                },
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$|\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
        ]
    },
    plugins: [
        //buffer
        // new webpack.ProvidePlugin({
        //     process: 'process/browser',
        //     Buffer: ['buffer', 'Buffer'],
        // }),
        // new HtmlPlugin({
        //     filename: 'index.html',
        //     template: './src/index.html',
        //     favicon: './src/assets/favicon.ico'
        // }),
        // new MiniCssExtractPlugin(),
        // new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.URL_API_ACCOUNT_SERVICE': JSON.stringify(process.env.URL_API_ACCOUNT_SERVICE),
            'process.env.URL_API_QUIZ_SERVICE': JSON.stringify(process.env.URL_API_QUIZ_SERVICE),
            'process.env.REDIRECT_URL': JSON.stringify(process.env.REDIRECT_URL),
        }),
    ],
};
