/**
 *default: validateIdCardNo (idCardNo), return true || false
 * type="get": getInfoFormIdCardNo (idCardNo), return{ province, birthday, sex, age }
 */
export default function IdCard(idCardNo, type) {
  let provinceAndCitys = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外'
  };
  let powers = ['7', '9', '10', '5', '8', '4', '2', '1', '6', '3', '7', '9', '10', '5', '8', '4', '2'];
  let parityBit = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

  let checkAddressCode =  addressCode => {
    let check = /^[1-9]\d{5}$/.test(addressCode);
    if (!check) return false;
    if (provinceAndCitys[parseInt(addressCode.substring(0, 2), 10)]) {
      return true;
    } else {
      return false;
    }
  }
  let checkBirthdayCode = birdayCode => {
    let check = /^[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))$/
      .test(birdayCode);
    if (!check) return false;
    let yyyy = parseInt(birdayCode.substring(0, 4), 10);
    let mm = parseInt(birdayCode.substring(4, 6), 10);
    let dd = parseInt(birdayCode.substring(6), 10);
    let xdata = new Date(yyyy, mm - 1, dd);
    if (xdata > new Date()) {
      return false;// 生日不能大于当前日期
    } else if ((xdata.getFullYear() == yyyy)
      && (xdata.getMonth() == mm - 1) && (xdata.getDate() == dd)) {
      return true;
    } else {
      return false;
    }
  }
  let checkParityBit = idCardNo =>{
    let parityBit = idCardNo.charAt(17).toUpperCase();
    if (getParityBit(idCardNo) == parityBit) {
      return true;
    } else {
      return false;
    }
  }
  let check15IdCardNo = idCardNo => { // 15位身份证号码的基本校验
    let check = /^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/.test(idCardNo);
    if (!check) return false;
    // 校验地址码
    let addressCode = idCardNo.substring(0, 6);
    check = checkAddressCode(addressCode);
    if (!check) return false;
    let birdayCode = '19' + idCardNo.substring(6, 12);
    // 校验日期码
    return checkBirthdayCode(birdayCode);
  }
  let check18IdCardNo = idCardNo => {
    let check = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/.test(idCardNo);
    if (!check) return false;
    // 校验地址码
    let addressCode = idCardNo.substring(0, 6);
    check = checkAddressCode(addressCode);
    if (!check) return false;
    // 校验日期码
    let birdayCode = idCardNo.substring(6, 14);
    check = checkBirthdayCode(birdayCode);
    if (!check) return false;
    // 验证校检码
    return checkParityBit(idCardNo);
  }

  let getParityBit = idCardNo => {
    let id17 = idCardNo.substring(0, 17);
    let power = 0;
    for (let i = 0; i < 17; i++) {
      power += parseInt(id17.charAt(i), 10) * parseInt(powers[i], 10);
    }
    let mod = power % 11;
    return parityBit[mod];
  }
  let getProvice = idCardNo => provinceAndCitys[parseInt(idCardNo.substr(0,2), 10)];
  let getBirthday = idCardNo => {
    let birthday = idCardNo.length === 18 ? idCardNo.substr(6,8) : "19"+idCardNo.substr(6,6);
    birthday = birthday.replace(/(.{4})(.{2})/,"$1-$2-");
    return birthday
  }
  let getAge = birthday => {
    let year = parseInt( birthday.substr(0,4), 10 );
    let month = parseInt( birthday.substr(5,2), 10 );
    let day = parseInt( birthday.substr(8,2), 10 );
    let age = new Date().getFullYear() - year - 1;
    if( month < new Date().getMonth() + 1 || month === new Date().getMonth() && day <= new Date().getDate()){
      age++
    }
    return age;
  }
  let getSex = idCardNo => {
    let sexNo = idCardNo.length === 18 ?  idCardNo.substr(16,1) : idCardNo.substr(14,1);
    return parseInt( sexNo ) % 2 === 1 ? "男" : "女";
  }

  let validateIdCardNo = idCardNo => {
    let check = /^\d{15}|(\d{17}(\d|x|X))$/.test(idCardNo);
    if(!check) return false;
    if (idCardNo.length == 15) {
      return check15IdCardNo(idCardNo);
    } else if(idCardNo.length == 18) {
      return check18IdCardNo(idCardNo);
    } else {
      return false;
    }
  }
  let getInfoFormIdCardNo = idCardNo => {
    if( !validateIdCardNo(idCardNo) ){
      return {};
    }
    let info = Object.assign({},{
      province: getProvice(idCardNo),
      birthday: getBirthday(idCardNo),
      sex: getSex(idCardNo),
    })
    info.age = getAge(info.birthday);
    return info;
  }

  return type === "get" ? getInfoFormIdCardNo (idCardNo) : validateIdCardNo (idCardNo);
}
