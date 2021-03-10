const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: path.resolve(__dirname, "../src/server.js"),
  mode: "development",
  target: "node",
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'index.js',
  },
  externalsPresets: { node: true },
  externals: [nodeExternals()],
}