/**
 *
 * @desc   url参数转对象
 * @param  {String} url  default: window.location.href
 * @return {Object}
 */
function parseQueryString(url) {
  url = url == null ? window.location.href : url;
  let searchFlag = url.lastIndexOf("?");
  let hashFlag = url.indexOf("#");
  let search =
    hashFlag !== -1
      ? url.substring(searchFlag + 1, hashFlag)
      : url.substring(searchFlag + 1);
  if (searchFlag === -1 || !search) {
    return {};
  }
  return JSON.parse(
    `{"${decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')}"}`
  );
}
