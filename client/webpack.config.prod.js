const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          // keep original filenames and copy images to `dist/img/`
          filename: '[name][ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack App',
      filename: 'index.html',
      template: './src/index.html',
      publicPath: '/',
    }),
    new HtmlWebpackPlugin({
      title: 'Webpack App',
      filename: 'room.html',
      template: './src/room.html',
      publicPath: '/',
    }),
    new HtmlWebpackPlugin({
      title: 'Webpack App',
      filename: 'not-found.html',
      template: './src/not-found.html',
      publicPath: '/',
    }),
  ],
};
