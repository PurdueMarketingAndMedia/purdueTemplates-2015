var path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = env => {
  const devConfig = {
    mode: 'development',
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
    },
    // plugins: [
    //   new BundleAnalyzerPlugin()
    // ]
  }

  const prodConfig = {
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
      path: path.resolve(__dirname, 'builds/production/js'),
      filename: '[name].js'
    },
    // plugins: [
    //   new BundleAnalyzerPlugin()
    // ]
  }

  console.log(env.prod === true ? 'Running production js build 🚀' : 'Running development js build 🛠')

  return env.prod === true ? prodConfig : devConfig
}
