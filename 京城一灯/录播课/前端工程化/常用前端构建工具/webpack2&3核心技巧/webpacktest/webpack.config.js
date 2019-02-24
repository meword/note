const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: path.join(__dirname, './assets/scripts/index.es'),
	output: {
		path: path.join(__dirname, './dist'),
		publicPath: './',
		filename: '[name].bundle.js',
	},
	module: {
		rules: [{
			test: /\.es$/,
			exclude: /node_modules/,
			loader: "babel-loader"
		}, {
			test: /\.less$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				//resolve-url-loader may be chained before sass-loader if necessary
				use: ['css-loader', 'less-loader']
			})
		}]
	},
	plugins: [
		new ExtractTextPlugin('styles/style.css'),
		new HtmlWebpackPlugin({
			template: './assets/index.html',
			filename: 'index.html',
		})
	]
}