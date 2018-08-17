/**
 * Created by Cumidia on 2017/5/16.
 */

const FS = require('fs');
const path = require('path');
const PATH = path.join(process.cwd(), '');

const MXENV = require('./../env'); // 当前项目环境变量路径配置

const DEV_ENV_STRING = process.env.DEV_ENV || '';
const DEV_ENV = DEV_ENV_STRING ? JSON.parse(DEV_ENV_STRING) : {};
let tmpEnv;
/** 获取当前webpack运行环境配置 */
function getEnv() {
    // 合并Node环境和dev环境配置设置
    if(tmpEnv === undefined)
        tmpEnv = {
            env: DEV_ENV.env, // 运行环境：开发，内存，生产
            operation: DEV_ENV.operation, // 运行配置属性：开发，资料库
            core: DEV_ENV.core === undefined ? false : (DEV_ENV.core === 'true'), // 是否核心开发模式
            version: process.env.npm_package_version,
        };
    return tmpEnv;
}

let apps; // 缓存寻址app列表
/** 通过 Node.js fs 获取 APP 应用列表 */
function getApp() {
    if(apps) return apps;
    apps = [];
    console.log('通过Node.js fs 查找APP应用列表');
    let appPath = path.join(__dirname, '../../src/app/module');
    let files0 = FS.readdirSync(appPath);
    files0.forEach(file0 => {
        let file0Path = `${appPath}/${file0}`;
        if(!FS.statSync(file0Path).isDirectory()) return;
        let files1 = FS.readdirSync(file0Path);
        files1.forEach(file1 => {
            let file1Path = `${file0Path}/${file1}`;
            if(file1 === 'app.json'){
                if(FS.statSync(file1Path).isFile()){
                    console.log('查找应用：', file0, ' 成功');
                    apps.push(eval(`[${FS.readFileSync(file1Path, {encoding: 'utf8'})}]`)[0]);
                }else console.error('查找应用：', file0, ' 失败，app.json格式异常');
            }
        });
    });
    return apps;
}

module.exports = {
    getEnv,
    getApp,
};