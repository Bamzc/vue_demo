'use strict'

//模块加载器兼打包工具
var webpack = require('webpack');
//构建服务器
var WebpackDevServer = require('webpack-dev-server');

var config = require('./webpack.config');
config.entry.unshift('webpack-dev-server/client?http://localhost:8090', 'webpack/hot/dev-server');
//代码热替换
config.plugins.push(new webpack.HotModuleReplacementPlugin());
/*
 * 这里配置：请求http://localhost:8090/api，
 * 相当于通过本地node服务代理请求到了http://cnodejs.org/api
 */ 
var proxy = [{
    path : "/api/*",
    target : "https://cnodejs.org",
    host : 'cnodejs.org'
}];
//启动服务
var app = new WebpackDevServer(webpack(config),{
    publicPath : config.output.publicPath,
    hot : true,//开启代码热替换
    historyApiFallback : true,
    proxy : proxy
});
app.listen(8090);