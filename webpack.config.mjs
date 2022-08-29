import path from "path";
import CopyPlugin from "copy-webpack-plugin";
import { fileURLToPath } from "url";
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function(env, argv) {
  const isDevelopment = argv.mode === "development";

  return {
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'public'),
      publicPath: '',
      filename: 'index.js',
    },
    // mode: 'development',
    devServer: {
      static: './public',
      // hot: true,
    },
    devtool: isDevelopment ? 'source-map' : false,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins: [
                [
                  "@babel/plugin-transform-typescript",
                  {
                    "isTSX": true
                  }
                ],
                "@babel/plugin-transform-react-jsx",
                isDevelopment && 'react-refresh/babel',
              ].filter(Boolean)
            }
          }
        },
        // {
        //   test: /\.tsx?$/,
        //   use: 'ts-loader',
        //   exclude: /node_modules/,
        // },
        {
          test: /\.(jpe?g|webp|png)$/,
          type: 'asset/resource'
        },
      ]
    },
    resolve: {
      // https://stackoverflow.com/questions/40565361/what-does-resolve-extensions-do-in-webpack
      extensions: [ '.tsx', '.jsx', '.ts', '.js' ],
    },
    plugins: [
      new NodePolyfillPlugin(),
      isDevelopment && new ReactRefreshWebpackPlugin(),
      new CopyPlugin({
        patterns: [
          "./index.html"
        ],
      }),
    ].filter(Boolean)
  };
}