const path = require('path');
const webpack = require('webpack');
// configure webpack to exclude all packages under the node_modules folder.
const nodeExternals = require('webpack-node-externals');
/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');

/*
 * We've enabled HtmlWebpackPlugin for you! This generates a html
 * page for you when you compile webpack, which will make you start
 * developing and prototyping faster.
 *
 * https://github.com/jantimon/html-webpack-plugin
 *
 */
 const moduleObj = {
	 rules: [
		 {
			 test: /.(js|jsx)$/,
			 exclude: /node_modules/,
			 loader: ['babel-loader'],
		 }
	 ]
 };

const server = {
	entry: {
		server: ['./src/server/index.js'],
	},
	target: 'node',
	mode: 'development',
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},
	module: moduleObj,
	externals: [nodeExternals()]
};

const client = {
	entry: {
		client: ['./src/client/index.js'],
	},
	target: 'web',
	mode: 'development',
	output: {
		filename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, 'dist/public')
	},

	plugins: [new webpack.ProgressPlugin(), new HtmlWebpackPlugin({
		template: './src/client/index.html',
	})],

	module: {
		rules: [
			{
				test: /.(js|jsx)$/,
				include: [path.resolve(__dirname, 'src')],
				loader: 'babel-loader',

				options: {
					plugins: ['syntax-dynamic-import'],

					presets: [
						[
							'@babel/preset-env',
							{
								modules: false
							}
						]
					]
				}
			}
		]
	},

	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: true
		}
	},
};

module.exports = [client, server];
