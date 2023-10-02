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
    plugins: [
      // TODO: Add and configure workbox plugins for a service worker and manifest file.
      
      // simplifies creation of HTML files to serve your webpack bundles.
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Text Editor'
      }),
      // service worker stuff
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      // manifest json
      new WebpackPwaManifest({
        fingerprints: false, //makes it so that is is just manifest.json
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E',
        description: 'Edit text',
        background_color: '#7eb4e2', //lightish blue
        theme_color: '#7eb4e2',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
      
    ],

    module: {
      // TODO: Add CSS loaders and babel to webpack.
      rules: [
        {
          // css loader (looks for any file that ends with .css)
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          //used for image files
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          //babel loader helps converts javascript from ES6 to ES5
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        
      ],
    },
  };
};
