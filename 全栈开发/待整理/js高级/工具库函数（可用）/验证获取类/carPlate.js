/**
 * @desc 验证车牌（传统，新能源）
 * @param {String} carNo
 *      carNo is like：粤ABC123
 *@return {Boolean} true || false
 */

export default function CarPlate(carNo) {
  if (!carNo) {
    return false;
  }
  if (carNo.length === 6) {
    // 传统车牌
    return /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/.test(
      carNo
    );
  } else if (carNo.length === 7) {
    // 新能源车牌
    return /^(([\u4e00-\u9fa5]{1}[A-Z]{1})[-]?|([wW][Jj][\u4e00-\u9fa5]{1}[-]?)|([a-zA-Z]{2}))([A-Za-z0-9]{5}|[DdFf][A-HJ-NP-Za-hj-np-z0-9][0-9]{4}|[0-9]{5}[DdFf])$/.test(
      carNo
    );
  } else {
    return false;
  }
}
