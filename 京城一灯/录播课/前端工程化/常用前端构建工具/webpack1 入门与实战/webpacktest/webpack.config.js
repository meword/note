const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: __dirname + '/src/scripts/app.js',
	output: {
		path: __dirname + '/build',
		filename: "scripts/[name]-[hash].js"
	},
	plugins: [
		new HtmlWebpackPlugin({ // Also generate a test.html
			filename: 'index.html',
			template: __dirname + '/src/index.html'
		})
	],
	module: {
		rules: [{
			test: /\.css$/,
			use: [{
					loader: 'style-loader'
				},
				{
					loader: 'css-loader',
					options: {
						modules: true
					}
				}
			]
		}]
	},
	resolve: {
		extensions: ['.js', '.css']
	}
}