/**
 * Created by xiechunming on 2017/04/23.
 */

const path = require('path'); // 加载Node的Path模块
const MXENV = require('./../env'); // 当前项目环境变量路径配置
const utils = require('./utils');

/**
 * 模块引入方案
 * modules: webpack 解析模块时应该搜索的目录
 * alias: 程序中import或者require组件的别名 当 import or require 资源时, 如果没有使用./ 相对路径表示，则自动从该路径加载资源
 * @returns {{modules: [string,*], extensions: [string,string,string,string,string], alias: {}}}
 */
exports.get = () => {
    let modules = ['node_modules'];
    if(utils.getEnv().core)
        modules.unshift(MXENV.path.src);
    return {
        modules,
        extensions: ['.js', '.json', '.mson'], // 解析模块的拓展名的数组，设置了可在import或者require中忽略后缀
        alias: {},
    };
};