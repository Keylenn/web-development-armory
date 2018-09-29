/**
 *
 * @desc 导入excel文件
 * @import XLSX : yarn add xlsx
 * @param {Object} options
 *  fileInput：input对象
 *  maxSize：文件传输最大值，单位为M
 * @return  Promise
 *  resolve:{
 *       workbook, //{Object},读取 Excel 文档,获得workbook 对象
         data,  //{Array,}读取excel数据
         jsonData,  //{String},json序列化后的数据
         getDateFormExcel //{Function},处理excel文件中的时间，返回正确格式的时间
 *  }
 *  @use:
 *       const options = {
          fileInput: this.fileInput,
          maxSize: 1,
            names:{
              Sheet1:{
                  A1: 'foods',
                  B1:'quantities',
                  C1:'registration_time'
              },
              Sheet2:{
                  A1: 'foods',
                  B1:'quantities',
                  C1:'registration_time'
              }
          }
        }
        importExcel(options).then((result)=>{
          console.info('getResultFromExcel',result);
        });
 }
 */

import XLSX from 'xlsx';

const getDateFormExcel =  (excelTimeStamp) => {
    let systemTimeStamp = ((excelTimeStamp-19-70*365)*86400-8*3600)*1000;
    const check = value => (value < 10 ? `0${value}` : value);
    const date = new Date(systemTimeStamp);
    const year = 1900+date.getYear();
    const month = check(date.getMonth() + 1);
    const today = check(date.getDate());
    return `${year}-${month}-${today}`;
}

export default function importExcel(options){
    const file = options.fileInput.files[0];
    const suffix = file.name.split('.')[1];//文件名后缀
    const IMPORTFILE_MAXSIZE = options.maxSize ? options.maxSize * 1024 : 1*1024; //文件大小
    if(!file) {
        return;
    }
    if(suffix != 'xls' && suffix !='xlsx'){
        alert('导入的文件格式不正确!');
        return;
    }
    if(file.size/1024 > IMPORTFILE_MAXSIZE){
        alert(`导入的表格文件不能大于${IMPORTFILE_MAXSIZE/1024}M`);
        return;
    }
    return new Promise(function(resolve,reject){
        const reader = new FileReader(); //H5对象，打开本地文件
        reader.readAsBinaryString(file); //以二进制方式打开文件
        let workbook ={}; //读取 Excel 文档,获得workbook 对象
        let data =[]; //读取excel数据,数组
        let jsonData = ""; //json序列化后的数据，字符串
        reader.onload = (e) => {
            workbook = XLSX.read(e.target.result, {
                type: 'binary'
            });

            /*
            console.info('workbook',workbook);
            const sheetNames = workbook.SheetNames; //获取 Excel 中所有表名,返回 ['sheet1', 'sheet2',...]
            const worksheet = workbook.Sheets[sheetNames[0]];// 根据表名获取对应某张表
            console.info('sheet1',worksheet)
            */

            // 遍历每张表读取
            for (let sheet in workbook.Sheets) {
                if (workbook.Sheets.hasOwnProperty(sheet)) {
                    let worksheet = workbook.Sheets[sheet];
                    if(options.names[sheet] instanceof Object){
                        let keys = Object.keys(options.names[sheet]);
                        keys.forEach((key) => {
                            if(worksheet[key].w){
                                worksheet[key].w = options.names[sheet][key]
                            }
                        })
                    }
                    data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                    // break; // 如果只取第一张表，就取消注释这行
                }
            }
            console.info('data',data);

            jsonData = JSON.stringify(data);

            // console.info('jsonData',jsonData);
            if(jsonData){
                resolve({
                    workbook,
                    data,
                    jsonData,
                    getDateFormExcel
                })
            }else{
                reject();
            }
        };
    })
}