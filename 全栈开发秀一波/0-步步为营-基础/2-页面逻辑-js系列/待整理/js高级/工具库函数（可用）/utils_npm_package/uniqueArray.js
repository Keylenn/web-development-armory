/**
 *
 * @desc   ����ȥ�أ�֧�ֶ������ϲ���ȥ�أ�����IE
 * @param  {Array} ֧��һ����������
 * @return {Array}
 */
export default function uniqueArray() {
  let userAgent = navigator.userAgent;
  let arr = [].concat(...arguments); //û��ȥ�ظ���������
  if (
    //�ж��Ƿ�IE<11�����
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
        //����ܲ��ҵ���֤������Ԫ���ظ���
        obj[arr[i]] = 1;
        result.push(arr[i]);
      }
    }
    return result;
  }
  return Array.from(new Set(arr));
}
