var path = require('path')

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
    }
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
    }
  }

  console.log(env.prod ? 'Running production js build 🚀' : 'Running development js build 🛠')

  return env.prod ? prodConfig : devConfig
}
