import path from "path";
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import { fileURLToPath } from "url";
import TerserPlugin from "terser-webpack-plugin";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function(env, argv) {
  return {
    entry: "./src/index.ts",
    output: {
      // See https://webpack.js.org/configuration/output/#outputglobalobject
      globalObject: 'this',
      // See https://webpack.js.org/guides/author-libraries/
      library: {
        name: 'common',
        type: 'umd',
      },
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
      filename: 'index.js',
    },
    devtool: false,
    mode: 'development',
    // optimization: {
    //   minimize: false,
    //   minimizer: [new TerserPlugin()],
    // },
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