import path from "path";
import CopyPlugin from "copy-webpack-plugin";
import { fileURLToPath } from "url";
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
// import Dotenv from 'dotenv-webpack';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function(env, argv) {
  const isDevelopment = argv.mode === "development";

  return {
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'public'),
      publicPath: '/',
      filename: 'index.js',
    },
    // mode: 'development',
    // See webpack-dev-server interop with nested routes
    // https://stackoverflow.com/questions/56573363/react-router-v4-nested-routes-not-work-with-webpack-dev-server
    devServer: {
      static: './public',
      // hot: true,
      historyApiFallback: true,
    },
    devtool: isDevelopment ? 'eval-source-map' : false,
    // devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              sourceMaps: true,
              plugins: [
                [
                  "@babel/plugin-transform-typescript",
                  {
                    "isTSX": true,
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
      fallback: {
        "fs": false
      }
    },
    plugins: [
      new NodePolyfillPlugin(),
      isDevelopment && new ReactRefreshWebpackPlugin(),
      new CopyPlugin({
        patterns: [
          "./index.html"
        ],
      }),
      // new Dotenv()
    ].filter(Boolean)
  };
}