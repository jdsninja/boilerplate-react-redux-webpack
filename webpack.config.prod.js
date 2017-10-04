var path = require('path');
var webpack = require('webpack');

module.exports = {
  resolve: {
    root: __dirname + '/src'
  },
  entry: './src',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
 ],
  module: {
    loaders: [
      { 
        test: /\.js?$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'src')
      },
      { test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      { test: /\.json$/,
        loaders: ['json-loader']
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
        include: path.join(__dirname, 'src')
      },
      { test: /\.(png|svg|ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader'
      }
    ]
  }
};
