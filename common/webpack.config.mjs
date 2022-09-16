import path from "path";
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function(env, argv) {
  return {
    entry: "./src/index.ts",
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
      filename: 'index.js',
    },
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader'
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: [ '.tsx', '.jsx', '.ts', '.js' ],
      fallback: {
        "fs": false
      }
    },
    plugins: [
      new NodePolyfillPlugin(),
    ].filter(Boolean)
  };
}