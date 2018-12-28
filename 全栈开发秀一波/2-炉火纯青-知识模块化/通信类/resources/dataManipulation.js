
/**
 * 封装数据校验方法
 * 封装操作数据的请求方法
 *
 */

//自行封装数据校验方法

// 参考validateData：
export let validateData = (Data) => {  //表单的钩子对象
  let invalid = 0;
  let validate = Data.validate();//自行封装validate（），返回对象
  invalid += validate.length;
  return invalid > 0 ? false : true;
};
export let request = () => {
  /**
    * 思路1：封装Fetch方法，将新增数据放到数据库参考https://www.jianshu.com/p/1fb0213ada79
                                                    https://segmentfault.com/a/1190000008484070
    *思路2：封装基于Promise的http库axios，将新增数据放到数据库参考https://segmentfault.com/a/1190000008470355
    *思路3：JQuery ajax
    *三种思路的区别：https://segmentfault.com/a/1190000012836882
   */
};

