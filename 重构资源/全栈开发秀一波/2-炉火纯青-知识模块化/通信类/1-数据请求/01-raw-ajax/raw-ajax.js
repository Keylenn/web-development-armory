/**
 *@desc 封装原生ajax
 *@params {Object} options
 * type {String} GET,POST,
 * url {String},
 * async {Boolean} default:true,
 * data {Objcet},
 * header {Object},
 * success {Function} ajax请求成功时调用
 * error{Function} ajax请求失败时调用
 */


function addURLParam(url,data){
    for (let key in data){
        url += (url.includes("?") ? "&" : "?");
        url += encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
    }
    return url;
}

function formData(data){
    let formData;
    if(data.nodeName && data.nodeName.toUpperCase() === "FORM"){
        formData = new FormData(data);
    }else{
        formData = new FormData();
        for (let key in data){
            formData.append(key, data[key]);
        }
    }
    return formData;
}

function ajax(options){
    if(!options || !( options instanceof Object )){
        return;
    }
    let xhr = XMLHttpRequest ? new XMLHttpRequest() : new window.ActiveXObject("Microsoft.XMLHTTP");
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if((xhr.status>=200 && xhr.status <=300)||xhr.status === 304){
                if(options.success && options.success instanceof Function){
                    let data = JSON.parse(xhr.responseText);
                    options.success(data);
                }
            }else{
                if(options.error && options.errror instanceof Function){
                    let errorInfo = {
                        status: xhr.status,
                        statusText: xhr.statusText
                    }
                    options.error(errorInfo);
                }
            }
        }
    }
    if(options.type.toUpperCase() ==="GET"){
        options.url = options.data ?  addURLParam(options.url,options.data) : options.url;
        options.data = null;
    }
    if(options.type.toUpperCase() === "POST"){
        options.data =  options.data ? formData(options.data) : null;
    }
    xhr.open(options.type, options.url, options.async ? options.async : true);
    options.header ? xhr.setRequestHeader(options.header) : null;
    xhr.send(options.data);
}






