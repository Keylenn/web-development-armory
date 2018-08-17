/**
 * Created by xiechunming on 2018/03/15.
 */

const utils = require('./utils');

exports.get = apps => {
    let compiled = 0;
    apps.forEach(app => app.compiled && (compiled += 1));
    if(compiled <= 1 || utils.getEnv().env === 'development'){
        return {};
    }else return {
        splitChunks: {
            minSize: 1,
            chunks: 'initial',
            name: 'vendor',
        }
    };
};