const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
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
 * HtmlWebpackPlugin generates a html
 * page for you when you compile webpack, which will make you start
 * developing and prototyping faster.
 *
 * https://github.com/jantimon/html-webpack-plugin
 *
 */

 // Node Babel transpiler
 const moduleObj = {
	rules: [
		{
			test: /.(js|jsx)$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			options: {
				plugins: ['@babel/plugin-transform-regenerator'],
				presets: [
					['@babel/preset-flow']
				],
			}
		}
	]
 };

const server = {
	entry: {
		server: ['./src/server/index.js'],
	},
	target: 'node',
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},
	module: moduleObj,
	externals: [nodeExternals()]
};

// React transpile, bundle, and compress 
const client = {
	entry: {
		client: ['./src/client/index.js'],
	},
	devtool: 'source-map',
	target: 'web',
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
					plugins: ['syntax-dynamic-import', '@babel/plugin-transform-regenerator'],

					presets: [
						[
							'@babel/preset-env',
							{
								modules: false
							}
						],
						[
            '@babel/preset-flow'
						]
					],
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
/**
 * The webpack command line environment option --env allows you to pass in as 
 * many environment variables as you like.
 */
module.exports = function(env, argv) {
	argv.mode ? console.log(`argv mode ${argv.mode}`) : console.log('argv mode null');
	if (env.production) {
		console.log('optimize client for production build');
		client.optimization = {
          minimizer: [new TerserPlugin({ /* additional options here */ })],
      }
    } 
	console.log('development build');
	server.mode = argv.mode;
	client.mode = argv.mode;
	
	if (env.NODE_ENV === 'debug') {
		server.devtool = 'source-map';
		client.devtool = 'source-map';
	}
	
	return	[client, server];
};
