import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const mode = 'production'
const dist_name = 'docs'

const html_minify = {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
  removeEmptyAttributes: true,
  removeStyleLinkTypeAttributes: true,
  keepClosingSlash: true,
  minifyJS: true,
  minifyCSS: true,
  minifyURLs: true
}

const config = {
  mode: mode,

  context: __dirname,

  performance: {
    hints: 'warning', // 或者 'error'，取决于您希望如何处理超出限制的情况
    maxAssetSize: 5000000, // 设置单个资源的最大尺寸，例如5MB
    maxEntrypointSize: 10000000 // 设置入口起点的最大尺寸，例如10MB
  },

  entry: {
    common: path.resolve(__dirname, 'src/common.js'),
    index: path.resolve(__dirname, 'src/index.js'),
    leave: path.resolve(__dirname, 'src/leave.js'),
    contributors: path.resolve(__dirname, 'src/contributors.js'),
    sponsors: path.resolve(__dirname, 'src/sponsors.js'),
    sponsorsnow: path.resolve(__dirname, 'src/sponsors-now.js'),
    zsxq: path.resolve(__dirname, 'src/zsxq.js'),
    notfound: path.resolve(__dirname, 'src/404.js')
  },

  output: {
    path: path.resolve(__dirname, dist_name), //打包后的文件存放的地方
    filename: 'js/[name].[fullhash].bundle.js', //打包后输出文件的文件名
    chunkFilename: '[name].bundle.js',
    clean: true,
    charset: true,
    publicPath: '/'
  },

  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // 移除console.log (Github/发布版专属)
            drop_debugger: true // 移除debugger (Github/发布版专属)
          }
        }
      })
    ]
  },

  module: {
    rules: [
      {
        test: /\.(js|mjs|cjs)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // 8KB 以下的文件将被转换为 Data URL
              fallback: 'file-loader',
              outputPath: 'images', // 类似于 file-loader 的配置
              name: '[name].[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(mp4|m4v|avi|mov|qt|wmv|mkv|flv|webm|mpeg|mpg|3gp|3g2)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // 8KB 以下的文件将被转换为 Data URL
              fallback: 'file-loader',
              outputPath: 'videos', // 类似于 file-loader 的配置
              name: '[name].[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // 8KB 以下的文件将被转换为 Data URL
              fallback: 'file-loader',
              outputPath: 'fonts', // 类似于 file-loader 的配置
              name: '[name].[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      }
    ]
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public', to: './' },
        { from: './config.json', to: './CONFIG.json' }
      ]
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: path.resolve(__dirname, 'src/html/index.html'), //指定模板文件
      filename: 'index.html',
      chunks: ['common', 'index'],
      minify: html_minify,
      publicPath: './'
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: path.resolve(__dirname, 'src/html/leave.html'), //指定模板文件
      filename: 'leave.html',
      chunks: ['common', 'leave'],
      minify: html_minify,
      publicPath: './'
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: path.resolve(__dirname, 'src/html/contributors.html'), //指定模板文件
      filename: 'contributors.html',
      chunks: ['common', 'contributors'],
      minify: html_minify,
      publicPath: './'
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: path.resolve(__dirname, 'src/html/sponsors.html'), //指定模板文件
      filename: 'sponsors.html',
      chunks: ['common', 'sponsors'],
      minify: html_minify,
      publicPath: './'
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: path.resolve(__dirname, 'src/html/sponsors-now.html'), //指定模板文件
      filename: 'sponsors-now.html',
      chunks: ['common', 'sponsorsnow'],
      minify: html_minify,
      publicPath: './'
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: path.resolve(__dirname, 'src/html/zsxq.html'), //指定模板文件
      filename: 'zsxq.html',
      chunks: ['common', 'zsxq'],
      minify: html_minify,
      publicPath: './'
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: path.resolve(__dirname, 'src/html/404.html'), //指定模板文件
      filename: '404.html',
      chunks: ['common', 'notfound'],
      minify: html_minify,
      publicPath: './'
    }),
    new MiniCssExtractPlugin({
      filename: 'style/[name].[fullhash].bundle.css',
      chunkFilename: 'css/[id].bundle.css'
    })
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, dist_name)
    },
    compress: true,
    port: 1001,
    open: true,
    hot: false
  }
}

export default config
