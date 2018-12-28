/**
*   json-loader
    var config = require('./config.json');//内置json-loader，无需手动配置
    module.exports = function(){
        var helloObj = document.createElement('div');
        helloObj.innerHTML = config.greetText;
        return helloObj;
    };
 */

import React, {Component} from 'react'
import config from './config.json'

class Hello extends Component {
    render() {
        return (
            <div>
                {config.greetText}
            </div>
        );
    }
}

export default Hello