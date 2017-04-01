var path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    entry: './app/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
    	new UglifyJSPlugin({
    		test: /\.js$/,
    		comments: false
    	})
    ]
}
