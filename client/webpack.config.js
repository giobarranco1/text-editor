const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    // TODO: Add and configure workbox plugins for a service worker and manifest file.
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Text Editor',
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: './src-sw.js',
      }),
      new WebpackPwaManifest({
        name: 'Text Editor',
        short_name: 'Text Editor',
        description: 'Just Another Text Editor',
        background_color: '#7eb4e2',
        theme_color: '#7eb4e2',
        fingerprints: false,
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96],
            destination: path.join('src', 'icons'),
          },
        ],
      }),
    ],

    // TODO: Add CSS loaders and babel to webpack.
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/presets-env'],
              plugins: ['@babel/plugin-propsal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
