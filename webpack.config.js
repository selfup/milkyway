const path = require('path');
const BabiliPlugin = require('babili-webpack-plugin');
const webpack = require('webpack');

const plugins = [
  new webpack.optimize.ModuleConcatenationPlugin(),
];

module.exports = function webpackStuff(env) {
  if (env === 'production') plugins.push(new BabiliPlugin());

  return {
    entry: [
      './lib/index.js',
    ],
    output: {
      filename: 'main.bundle.js',
      path: path.resolve(__dirname, './'),
      library: "MilkyWay",
      libraryTarget: 'umd',
    },
    module: {
      rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: [
            'es2015',
          ],
          plugins: [],
        },
        include: [
          path.resolve(__dirname, './'),
        ],
      }],
    },
    plugins,
  };
};
