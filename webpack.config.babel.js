import path from 'path'
import fs from 'fs'
import HtmlWebpackPlugin from 'html-webpack-plugin'

module.exports = {
  entry: './src',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle2.js'
  },
  devServer: {
    inline: true,
    historyApiFallback: true,
    stats: {
      colors: true,
      hash: false,
      version: false,
      chunks: false,
      children: false
    }
  },
  module: {
    loaders: [ {
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
      include: path.join(__dirname, 'src')
    },
    {
      test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
      loader: 'file-loader'
    },
    {
      test: /\.(less|css)$/,
      loaders: ['style', 'css', 'less'],
      include: path.join(__dirname, 'src')
    },
    {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=25000'
    } ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html', // Load a custom template
      inject: 'body' // Inject all scripts into the body
    })
  ]
}

// This will make the redux-auth-wrapper module resolve to the
// latest src instead of using it from npm. Remove this if running
// outside of the source.
const src = path.join(__dirname, '..', '..', 'src')
if (fs.existsSync(src)) {
  // Use the latest src
  module.exports.resolve = { alias: { 'redux-auth-wrapper': src } }
  module.exports.module.loaders.push({
    test: /\.js$/,
    loaders: [ 'babel' ],
    include: src
  })
}
