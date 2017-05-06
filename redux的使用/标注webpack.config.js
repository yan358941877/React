var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    // path.resolve相当于执行cd操作，第一个参数相当于指明“当前”在哪个路径下，后面的参数就相当于在当前路径下
    // 执行cd操作的相对路径，最后得到最后一个参数的绝对路径
    entry: path.resolve(__dirname, 'app/index.jsx'),
    ouput: {
        filename: "bundle.js"
    },
    // 影响解析模块的选项
    resolve: {
        //配置程序可以自行补全哪些文件的后缀，保证文件的正确解析，例如我们想加载一个jsx文件，只要require('xxxxxxx/xxx')就可以了，webpack会根据
        //extensions中指定的后缀去相应的路径中对应的名称及后缀的文件
        extensions: ['', '.js','.jsx']
    },
    //
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                //先用less-loader，再用postcss-loader，再用css-loader,再用style-loader
                /* 
                style-loader: 将css插入到页面的style标签
                css-loader: 处理css文件中的url()等
                postcss-loader: 给一些css属性前加上前缀
                less-loader：将less文件编译成css
                */
                loader: 'style!css!postcss!less'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: 'style!css!postcss'
            },
            {
                test: /\.(png|gif|jpg|jpeg|bmp)$/i,
                loader: 'url-loader?limit=5000'
            },
            {
                test: /\.(png|woff|woff2|svg|ttf|eof)($|\?)/i,
                loader:'url-loader?limit=5000'
            }

        ]
    },
    
    postcss: [
        require('autoprefixer')
    ],
    plugins: [
        // html 模版插件
        new HtmlWebpackPlugin({
            template: __dirname + '/app/index.tmp.html'
        }),
        
        // 热加载插件
        new webpack.HotModuleReplacementPlugin(),

        // 自动打开浏览器插件
        new OpenBrowserPlugin({
            url: 'http://localhost:8080'
        }),

        //可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
        new webpack.DefinePlugin({
          __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
        })
    ],

    devServer: {
        color: true, //终端中输出结果为红色
        historyApiFallback: true, //不跳转，在开发单页应用时能用到，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        inline: true, //实时刷新
        hot: true //使用热加载插件 HotModuleReplacementPlugin
    }
}