var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var providePlugin = new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery'});
module.exports = {
    //入口文件,多个文件使用{}
    entry: {
        index: './src/js/index.js',
        goodsInfo: './src/js/goodsInfo.js',
    },
    //生成的输出文件,
    output: {
        filename: '[name].js',
        path: __dirname + '/out',
        publicPath: 'http://localhost:8080/out'     //'./out'
    },
    module: {
        rules: [
            //以.js结尾的文件，使用babel-loader进行解析
            {test: /.js$/, use: ['babel-loader']},
            // //将css文件加载进html
            // {test: /.css$/, use: ['css-loader','style-loader']},
            // //单独生成css文件
            // {
            //     test: /.css$/,
            //     use: ExtractTextPlugin.extract({
            //       fallback: "style-loader",
            //       use: "css-loader"
            //     })
            // },
            //以..jpg|png|gif|svg结尾的文件，使用url-loader进行解析，8kb以内为base64字符串，大于8kb则输出到publicPath文件夹，以原文件名命名
            {test: /.jpg|png|gif|svg/, use: ['url-loader?limit=8192&name=/[name].[ext]']},
            //less编译
            {test: /.less$/, use: ['style-loader','css-loader','less-loader']}
        ]
    },
    //插件 
    plugins: [
        //压缩插件
        new UglifyJSPlugin(),
        // //打包公共模块
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: "commons",
        //     filename: "commons.js",
        //     minChunks: 3
        // }),
        // //单独生成css文件
        // new ExtractTextPlugin("[name].css"),
        //挂载全局jQuery
        providePlugin
     ]
}

//webpack服务器
//下载服务器npm install webpack-dev-server -g
//打包命名 webpack-dev-server
//publicPath路径要变成：http://localhost:8080/out

//npm run LJ 代替命名（package 文件里面）