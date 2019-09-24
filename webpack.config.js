var path = require('path')

module.exports = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  entry: {
    'mm/templates/main': './src/js/mm/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'builds/js'),
    filename: '[name].js'
  }
}
