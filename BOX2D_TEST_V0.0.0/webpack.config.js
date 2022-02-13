//require path和hyml-webpack-plugin'
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// __dirname是nodejs的一个全局变量，它指向当前执行脚本所在的目录。



const config = {
  mode: 'development',
  entry: "./src/index.js",
  devServer: {
    static: './dist',
  },
  devtool: 'inline-source-map',
  //哪些文件可以被引入 
  resolve: {
    fallback: {
      fs: false,
      path: false
    }
  },

  //指定输出文件目录
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),

    clean: true,
  },

  //配置webpack文件 plugins插件
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: './src/index.html'
    }),
  ],
}

module.exports = config;
