const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: path.resolve(__dirname, "../src/server.ts"),
  mode: "development",
  target: "node",
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'index.js',
  },
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "swc-loader",
          options: {
            jsc: {
              parser: {
                syntax: "typescript"
              }
            }
          }
        }
      }
    ],
  },
}