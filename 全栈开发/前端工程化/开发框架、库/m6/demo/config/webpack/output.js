/**
 * Created by xiechunming on 2017/04/23.
 */

const path = require('path'); // 加载Node的Path模块
const MXENV = require('./../env'); // 当前项目环境变量路径配置
const utils = require('./utils');

/**
 * webpack打包输出配置
 * @returns {{path: (string|*), publicPath: string, filename: string, sourceMapFilename: string, chunkFilename: string}}
 */
exports.get = () => {
    let output = {
        path: '', // 编译生成目录
        publicPath: '', // 生成的公共目录 加.代表当前
        filename: '',
        sourceMapFilename: '', // 资源映射名
        chunkFilename: '',
    };
    if(utils.getEnv().env === 'development'){ // 开发模式
        if(utils.getEnv().operation === 'dev'){ // 浏览器模式(内存模式)
            output.path = path.join(process.cwd(), MXENV.dev.root);
            output.publicPath = MXENV.dev.public;
            output.filename = MXENV.output.js + '[name].js';
            output.sourceMapFilename = MXENV.output.js + '[name].map';
            output.chunkFilename = MXENV.output.js + '[name].chunk.js';
        }else{ // 内测模式
            output.path = path.join(process.cwd(), MXENV.build.root);
            output.publicPath = MXENV.build.public;
            output.filename = MXENV.output.js + '[name].js';
            output.sourceMapFilename = MXENV.output.js + '[name].map';
            output.chunkFilename = MXENV.output.js + '[name].chunk.js';
        }
    }else{ // 生产模式
        // 生产模式开启gzip压缩，因此要求请求当前APP应用的HTTP request header头部，
        // 添加 Accept-Encoding: gzip, deflate
        output.path = path.join(process.cwd(), MXENV.prod.root); // 编译生成目录
        output.publicPath = MXENV.prod.public;
        output.filename = MXENV.output.js + '[name].js'; // 如果是生产环境下，将文件名加上
        output.sourceMapFilename = MXENV.output.js + '[name].map'; // 资源映射名
        output.chunkFilename = MXENV.output.js + '[name].chunk.js';
    }
    return output;
};