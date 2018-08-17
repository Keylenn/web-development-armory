/**
 * Created by xiechunming on 2017/09/18.
 */

import React from 'react';
import M6Core from 'm6-core'; // eslint-disable-line

export default class MyImgCtrl extends M6Core.Controller {

    constructor(context, config) {
        super(context, config);
        this.toBind('deleteImg');
    }

    deleteImg(imgTarget, index) {
        console.log('删除图片下标', index);
        // 实质imgTarget就是当前Img的实例对象了，类似ref，可以通过imgTarget直接访问Img的api
        //console.log('图片src', imgTarget.getData()[index]);
        return true;
    }
}