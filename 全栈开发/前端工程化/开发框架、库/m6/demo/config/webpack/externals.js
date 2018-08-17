/**
 * Created by xiechunming on 2017/04/23.
 */

const libraries = require('../library');
const utils = require('./utils');

/**
 * 引用变量别名指向声明
 * @returns {{DEV_ENV: string, *}}
 */
exports.get = () => {
    let defaultES = {
        DEV_ENV: JSON.stringify(utils.getEnv()),
    };
    const {env, operation} = utils.getEnv();
    if(env === 'production'){
        if(operation === 'M6Dev'){
            console.log('编译 M6-dev 库');
            Object.assign(defaultES, libraries.runtime);
        }else if(operation === 'M6Prod'){
            console.log('编译 M6-Min 库');
            Object.assign(defaultES, libraries.common);
        }else{
            console.log('编译 M6-APP 打包');
            Object.assign(defaultES, libraries.common, libraries.m6);
        }
    }else{
        if(operation === 'build'){
            Object.assign(defaultES, libraries.common, libraries.m6);
        }
        console.log('编译 M6-APP 调试');
    }
    return defaultES;
};