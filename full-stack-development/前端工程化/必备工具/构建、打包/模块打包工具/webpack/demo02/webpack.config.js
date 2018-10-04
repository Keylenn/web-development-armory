module.exports = {
    //配置devtool，生成的source maps
    devtool: 'eval-source-map',
    //入口文件main.js，_dirname是node.js中的一个全局变量，它指向当前执行脚本所在的目录
    entry: __dirname + '/app/main.js',
    output: {
        path: __dirname + "/public",//打包后的文件存放的地方
        filename: "bundle.js"//打包后输出文件的文件名
    },

    //构建本地服务器
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        port:803,//设置默认监听端口，如果省略，默认为”8080“
        inline:true//实时刷新
    },

    /*
    *loaders加载器
     webpack一切皆模块
     Webpack可以把所有的文件都都当做模块处理，JavaScript代码，CSS和fonts以及图片等等通过合适的loader都可以被处理
    */
    
    /**
     * ①Babel的安装与配置--常用
        -- babel-core：Babel的核心功能，负责大部分工作
        --babel-loader：webpack的加载器，调用babel-core
        --babel-preset-env：解析Es6+遵循的规则
        --babel-preset-react：解析React的JSX
     */
    /**
     * ②css-loader 和 style-loader-----二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中
        -- css-loader：使用类似@import 和 url(...)的方法实现 require()的功能
        --style-loader：将所有的计算后的样式加入页面中
     */
    module: {
        rules:[
            {
                test: /(\.jsx|\.js)$/,//一个用以匹配loaders所处理文件的拓展名的正则表达式（必须）
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/ //include:手动添加必须处理的文件（文件夹）,exclude屏蔽不需要处理的文件（文件夹）（可选）
            },
            {
                test: /\.css$/,
                //！！对同一个文件引入多个loader的写法
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader"
                    }
                ]
            }
        ]
        
    }
};