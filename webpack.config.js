/* eslint-disable */
const path = require('path');

module.exports = {
  entry: './src',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {

    rules: [{
      test: /\.js$/,
      exclude: [/node_modules/],
      use: [{
        loader: 'babel-loader',
        options: {
          "presets": [
            [ "es2015", { "modules": false } ],
            [ "stage-2" ],
            [ "react"]
          ],
          "plugins": [ "syntax-async-functions", "transform-regenerator"]
        }
      }]
    }, {
      test: /.(gif|png|jpg|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]'
        }
      }
    }, {
      test: /\.css$/,
      exclude: /flexboxgrid/,
      use: ['style-loader', {
        loader: 'css-loader',
        options: {
          'importLoaders': 1
        }
      }, 'postcss-loader']
    }, {
      test: /\.scss$/,
      exclude: /flexboxgrid/,
      use: [
        'style-loader', 
        {
          loader: 'css-loader',
          options: {
            'importLoaders': 1
          }
        }, 
        'postcss-loader', 
        'resolve-url-loader', 
        { 
          loader: 'sass-loader',

          options: {
            outputStyle: 'expanded',
            sourceMap: true,
            includePaths: ['../src', '../node_modules', '../node_modules/@material/*']
              .map(d => path.join(__dirname, d))
              .map(g => glob.sync(g))
              .reduce((a, c) => a.concat(c), [])
          }

        }
      ]
    }, {
      test: /\.css$/,
      include: /flexboxgrid/,
      exclude: path.join(__dirname, 'src'),
      use: ['style-loader', {
        loader: 'css-loader',
        options: {
          'modules': true,
          'importLoaders': 1
        }
      }, 'postcss-loader']
    },{
      test: /\.hbs$/,
      loader: 'handlebars-loader'
    }, {
      test: /\.html$/,
      loader: 'html-loader'
    }, {
      test: /bootbox\.min\.js$/,
      use: {
        loader: 'expose-loader',
        options: 'bootbox'
      }
    }]
  }
}

// This will make the redux-simpler-router module resolve to the
// latest src instead of using it from npm. Remove this if running
// outside of the source.
var src = path.join(__dirname, '..', '..', 'src')
var fs = require('fs')
if (fs.existsSync(src)) {
  // Use the latest src
  module.exports.resolve = { alias: { 'react-router-redux': src } }
  module.exports.module.loaders.push(
    {
      test: /\.js$/,
      loaders: ['babel'],
      include: src
    }
  );
}
