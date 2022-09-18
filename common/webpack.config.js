import path from "path";
// import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import { fileURLToPath } from "url";
// import TerserPlugin from "terser-webpack-plugin";
import Package from './package.json' assert { type: "json" };

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function(env, argv) {
  const dependencies = Object.keys({...Package.dependencies, ...Package.devDependencies});
  const bundledDependencies = Package.bundledDependencies;
  const externals = [];
  dependencies.forEach(dep => {
    if (!bundledDependencies.includes(dep))
      externals.push(new RegExp(`^${dep}`));
  });

  return /** @type { import('webpack').Configuration } */ ({
    entry: "./src/index.ts",
    output: {
      // See https://webpack.js.org/configuration/output/#outputglobalobject
      // globalObject: 'this',
      // See https://webpack.js.org/guides/author-libraries/
      library: {
        type: 'commonjs',
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
    // experiments: {
    //   topLevelAwait: true,
    //   outputModule: true
    // },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                configFile: "tsconfig.json"
              }
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
    // plugins: [
    //   new NodePolyfillPlugin(),
    // ].filter(Boolean),

    // See: https://stackoverflow.com/questions/41823313/externals-defined-in-webpack-config-still-getting-error-module-not-found
    // externals: [
    //   /^firebase/,
    //   /^zod/,
    //   /^firebase-admin/,
    // ]
    externals
  });
}