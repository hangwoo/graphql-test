import path from 'path';
import nodeExternals from 'webpack-node-externals';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default {
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
              },
              target: "node",
              loose: true,
              externalHelpers: true,
              module: {
                type: "commonjs",
              },
            }
          }
        }
      }
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  }
}