/* eslint-disable */

const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const { GenerateSW } = require('workbox-webpack-plugin');

const config = {
  entry: path.join(__dirname, '/src/index.tsx'),
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js'
  },
  resolve: {
    modules: [path.join(__dirname, '/src'), 'node_modules'],
    alias: {
      Components: path.join(__dirname, '/src/components/'),
      Hooks: path.join(__dirname, '/src/hooks/'),
      Stores: path.join(__dirname, '/src/stores/'),
      Utils: path.join(__dirname, '/src/utils/')
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.svg']
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
          
        },
      },

      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'public'
        }
      ]
    }),
  ],
  performance: {
    hints: false,
  },
  devtool: 'eval-source-map'
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new GenerateSW({
      maximumFileSizeToCacheInBytes: 4 * 1024 * 1024
    })
  )
}

module.exports = config