import path from "path";
import { fileURLToPath } from "url";
import CopyPlugin from "copy-webpack-plugin";
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import Webpack from "webpack";
import Package from './package.json' assert { type: "json" };


const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function(env, argv) {
  const isDevelopment = argv.mode === "development";

  const devDependencies = Object.keys({...Package.devDependencies});
  const externals = [];
  devDependencies.forEach(dep => {
    externals.push(new RegExp(`^${dep}`));
  });

  console.debug("Excluding from bundle", externals);

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
      historyApiFallback: true,
    },
    devtool: isDevelopment ? 'eval-source-map' : false,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                sourceMaps: true,
                plugins: [
                  "@babel/plugin-transform-react-jsx",
                  isDevelopment && 'react-refresh/babel',
                ].filter(Boolean)
              }
            },
            {
              loader: 'ts-loader'
            }
          ]
        },
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
      },
      alias: {
        pages: path.resolve(__dirname, 'src/pages/'),
        // components: path.resolve(__dirname, 'src/components/'),
        // config: path.resolve(__dirname, 'src/config/'),
        // styles: path.resolve(__dirname, 'src/styles/'),
        utils: path.resolve(__dirname, 'src/utils/'),
        layout: path.resolve(__dirname, "src/layout"),
        // hooks: path.resolve(__dirname, "src/hooks"),
        types: path.resolve(__dirname, "src/types"),
        context: path.resolve(__dirname, "src/context"),
        // See https://github.com/facebook/react/issues/13991
        "react": path.resolve('./node_modules/react')
      },
    },
    plugins: [
      isDevelopment && new ReactRefreshWebpackPlugin(),
      new CopyPlugin({
        patterns: [
          "./index.html"
        ],
      }),
      new Webpack.DefinePlugin({
        'process.env.FIREBASE_API_KEY': JSON.stringify("AIzaSyDioYUezUmlXR4j-VqQAln6DIqXnm4jd8w"),
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify("workshop-system-24df0.firebaseapp.com"),
        'process.env.FIREBASE_PROJECT_ID': JSON.stringify("workshop-system-24df0"),
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify("workshop-system-24df0.appspot.com"),
        'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify("618972475742"),
        'process.env.FIREBASE_APP_ID': JSON.stringify("1:618972475742:web:787a52f8e2933791019fcf"),
        'process.env.FIREBASE_MEASUREMENT_ID': JSON.stringify("G-CGHQN8ZEGH"),
        'process.env.FIREBASE_APPCHECK_SITE_KEY': JSON.stringify("6Lecx8UhAAAAACEy_BQD1Ow7ws3Zo7SJpGYRKtcT"),
        'process.env.MODE': JSON.stringify("dev"),
      })
    ].filter(Boolean)
  };
}