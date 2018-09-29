/**
 *
 * @desc   数组去重，支持多个数组合并后去重，兼容IE
 * @param  {Array} 支持一个或多个数组
 * @return {Array}
 */
export default function uniqueArray() {
  let userAgent = navigator.userAgent;
  let arr = [].concat(...arguments); //没有去重复的新数组
  if (
    //判断是否IE<11浏览器
    userAgent.indexOf("compatible") > -1 &&
    userAgent.indexOf("MSIE") > -1
  ) {
    let obj = {},
      result = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] instanceof Array || arr[i] instanceof Object) {
        result.push(arr[i]);
        continue;
      }
      if (!obj[arr[i]]) {
        //如果能查找到，证明数组元素重复了
        obj[arr[i]] = 1;
        result.push(arr[i]);
      }
    }
    return result;
  }
  return Array.from(new Set(arr));
}
