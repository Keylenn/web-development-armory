/**
 * @desc 获取格式化的时间格式,支持当前时间和自定义时间
 * @param {Object} option
 *    option.date {String || null} "1996/6/11","1996-6-11",1996/6/11 12:25:3,1996-6-11 12:25:3
 *    option.format {String} yyyy-mm-dd,yyyy-mm-dd hh:mm:ss
 * @return
 *    getFormedDate(): return {String} "年-月-日 时:分:秒"(当前时间)
 *    getFormedDate({format:'yyyy-mm-dd'}):  return  {String} "年-月-日"(当前时间)
 *    getFormedDate({format:'yyyy-mm-dd hh:mm:ss'}): return {String} "年-月-日 时:分:秒"(当前时间)
 *    getFormedDate({date:"1996/6/11",format:'yyyy-mm-dd'}) return {String} `1996-06-11`
 *    getFormedDate({date:"1996/6/11",format:'yyyy-mm-dd hh:mm:ss'}) return {String} `1996-06-11 12:25:03`
 */

export default function getFormedDate(option) {
  let formedDate = "";
  const date = option && option.date ? new Date(option.date) : new Date();
  const check = value => (value < 10 ? `0${value}` : value);
  const year = date.getFullYear();
  const month = check(date.getMonth() + 1);
  const today = check(date.getDate());
  const hour = check(date.getHours());
  const min = check(date.getMinutes());
  const second = check(date.getSeconds());
  if (option && option.format === "yyyy-mm-dd") {
    formedDate = `${year}-${month}-${today}`;
  } else if (!option || (option && option.format === "yyyy-mm-dd hh:mm:ss")) {
    formedDate = `${year}-${month}-${today} ${hour}:${min}:${second}`;
  }
  return formedDate;
}