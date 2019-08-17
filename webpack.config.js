const path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals()],
};
