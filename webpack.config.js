var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/client/public/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: [

    __dirname + '/client/app.js'
  ],
  output: {
    path: __dirname + '/dist',
		publicPath: '/',
    filename: "index_bundle.js"
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
    ]
  },
  plugins: [HTMLWebpackPluginConfig],
	target: 'web'
};