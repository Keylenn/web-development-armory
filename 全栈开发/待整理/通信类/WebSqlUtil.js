/**
 * Created by yemin02729 on 2017/7/17.
 * 这个工具是用来websql数据库的工具类
 *
 */
export default class WebSqlUtil{

    //记录数据库的请求接口
    static db = "";//在initDb()中进行初始化

    constructor(){
        this.dbName = "sqxjw";//社区新警务
        this.dbVersion = "1.0";
    }
    /**
     * 初始化创建数据库
     * @param dbName 数据库名称
     * @param dbVersion 数据库版本
     */
    static async initDb(dbName,dbVersion){
        if(!dbName){//没有赋值就采用默认数据库
            dbName = this.dbName;
            dbVersion = this.dbVersion;
        }
        return await new Promise((resolve,reject) => {
            let dataBase = openDatabase(dbName, dbVersion, "离线数据库", 1024 * 1024);
            WebSqlUtil.db = dataBase;
           if(!dataBase){//创建或者获取失败
               reject(0);
            }else{
               resolve(1);
            }
        });
    }


    /**
     * 创建数据库表
     * create table if not exists b_ydjw_dxc_mdxc([id] integer PRIMARY KEY AUTOINCREMENT,[rYSYSID_CL] TEXT)
     * @param sql
     */
    static async createTable(sql) {
        return await new Promise((resolve,reject) =>{
            WebSqlUtil.db.transaction( (tx) => {
                tx.executeSql(sql, [],  (tx, result) => {
                    resolve(true);
                }, (tx, e)=> {
                    console.log("WebSqlUtil.js_51",  e);
                    resolve("");
                });
            });
        });
    }

    /**
     * 创建表结构 自动携带自增的id
     * @param tableName 表名
     * @param fieldNames  列名称 英文逗号,隔开
     */
    static async createTableAutoAddPrimary(tableName, fieldNames) {
        return await new Promise((resolve,reject) => {
            let createFields = "id integer primary key autoincrement" + ",";
            let colNamesArr = fieldNames.split(",");
            for(let i=0,len=colNamesArr.length;i<len;i++){
                createFields += colNamesArr[i] + " text,";
            }
            createFields = createFields.substring(0, createFields.length - 1);
            WebSqlUtil.db.transaction((tx) => {
                tx.executeSql('create table if not exists ' + tableName + '(' + createFields + ')', [], (tx, result) =>{
                    resolve(result);
                }, (tx, e) =>{
                    resolve("");
                    console.error(e);
                });
            });
        });
    }


    /**
     * 删除表中的所有数据（连表一起删除）
     * @param tableName 表名
     */
     static  async deleteTable(tableName) {
        return await new Promise((resolve,reject) => {
            WebSqlUtil.db.transaction( (tx) => {
                tx.executeSql('drop table ' + tableName + '', [],  (tx,result) => {
                    resolve(result);
                },  (tx, e) => {
                    console.error(e);
                    resolve("");
                });
            });
        });
    }



    /**
     * 判断表是否存在
     */
   static async isTable(tableName) {
       return await new Promise((resolve,reject) => {
            WebSqlUtil.db.transaction((tx) => {
                tx.executeSql('select count(1)  from sqlite_master where type="table" and name = "' + tableName + '"', [], (tx, rs) => {
                    let str1 = rs.rows.item(0);
                    let str2;
                    for (let key in str1) {
                        str2 = str1[key];
                    }
                    if (str2 > 0) {
                        resolve("true");
                    }
                    if (str2 === 0) {
                        resolve("false");
                    }
                }, (tx, e) => {
                    resolve("");
                    console.error(e);
                });
            });
        });
    }

    //----------------添加数据-------------


    /**
     * 插入数据
     * @param sql
     */
    static async addDataBySql(sql) {
        return await new Promise((resolve,reject) => {
            WebSqlUtil.db.transaction((tx) => {
                tx.executeSql(sql, [],  () => {
                    tx.executeSql('select last_insert_rowid()', [], (tx, rs) => {
                        let str1 = rs.rows.item(0);
                        let str2;
                        for (let key in str1) {
                            str2 = str1[key];
                        }
                        resolve(str2);
                    },  (tx,e) => {
                        console.error(e);
                        resolve("");
                    });
                },  (tx, e) =>{
                    console.error(e);
                    resolve("");
                });
            });
        });
    }



    /**
     * 添加数据
     * @param tableName
     * @param fields
     * @param fieldNames 可以不设置
     */
     static async addDataFromJsonData(tableName, fields, fieldNames) {
        return await new Promise((resolve, reject) => {
            let field = "id,";
            let value = "null,";
            let colArr = fieldNames ?  fieldNames.split(",") : [];
            for(let item=0,fieldsLen=fields.length;item<fieldsLen;item++){
                if(colArr.length > 0){
                    for(let col=0,len=colArr.length;col<len;col++){
                        if(item.toLowerCase() === colArr[col].toLowerCase()){//存在相同的key
                            field += item.toLowerCase() + ",";
                            value += '"' + fields[item] + '"' + ',';
                            break;
                        }
                    }
                }else{
                    field += item.toLowerCase() + ",";
                    value += '"' + fields[item] + '"' + ',';
                }
            }
            if(field === "id,"){//没有存在要新增的业务数据
                resolve("没有发现相关业务数据要保存。。。");
            }
            field = field.substring(0, field.length - 1);
            value = value.substring(0, value.length - 1);
            let addSql = 'insert into ' + tableName + '(' + field + ')' + ' values(' + value + ')';
            WebSqlUtil.db.transaction( (tx) => {
                tx.executeSql(addSql, [],  () => {
                    tx.executeSql("select last_insert_rowid()", [], (tx, rs) => {
                        let str1 = rs.rows.item(0);
                        let str2;
                        for (let key in str1) {
                            str2 = str1[key];
                        }
                        resolve(str2);
                    },  (tx, e) => {
                        console.error(e);
                        resolve("");
                    });
                }, (tx, e) => {
                    console.error(e);
                    resolve("");
                });
            });
        });
    }

    /**
     * 多数据保存
     * @param tableName
     * @param listData
     * @param fieldNames 可以不设置
     */
    static async addListData(tableName, listData,fieldNames) {
        return await new Promise( (resolve, reject) => {
            let colArr = fieldNames ?  fieldNames.split(",") : [];
            WebSqlUtil.db.transaction(tx=> {
                listData.forEach((items, index) => {
                    let field = "id,";
                    let value = "null,";
                    for(let item=0,fieldsLen=items.length;item<fieldsLen;item++){
                        if(colArr.length > 0){
                            for(let col=0,len=colArr.length;col<len;col++){
                                if(item.toLowerCase() === colArr[col].toLowerCase()){//存在相同的key
                                    field += item.toLowerCase() + ",";
                                    value += '"' + items[item] + '"' + ',';
                                    break;
                                }
                            }
                        }else{
                            field += item.toLowerCase() + ",";
                            value += '"' + items[item] + '"' + ',';
                        }
                    }
                    if(field !== "id,"){//存在要新增的业务数据
                        field = field.substring(0, field.length - 1);
                        value = value.substring(0, value.length - 1);
                        let addSql = 'insert into ' + tableName + '(' + field + ')' + ' values(' + value + ')';
                        tx.executeSql(addSql);
                    }
                });
                resolve(true);
            }, (tx, e) => {
                console.error(e);
                resolve("");
            });
        });
    }


    //------------修改数据部分----------------------
    /**
     * 修改数据
     * @param sql
     */
    static async updateDataBySql(sql) {
        return await new Promise( (resolve, reject) => {
            WebSqlUtil.db.transaction((tx) => {
                tx.executeSql(sql, [],  (tx,result) => {
                    resolve(result);
                },  (tx,e) => {
                    resolve("");
                });
            });
        });

    }


    /**
     * 更新数据信息
     * @param tableName
     * @param keyField
     * @param keyValue
     * @param fields
     * @param fieldNames 表结构全部的的字段名
     */
    static async updateDataByFieldAndValue(tableName, keyField, keyValue, fields,fieldNames) {
        return await new Promise( (resolve, reject) => {
            let colArr = fieldNames ?  fieldNames.split(",") : [];
            let updatemessage = "";
            for (let key in fields) {
                if(colArr.length > 0){
                    for(let col in colArr){
                        if(key.toLowerCase() === colArr[col].toLowerCase()){//存在相同的key
                            updatemessage += " " + key + "='" + fields[key] + "',";
                            break;
                        }
                    }
                }else{
                    updatemessage += " " + key + "='" + fields[key] + "',";
                }
            }
            updatemessage = updatemessage.substring(0, updatemessage.length - 1);
            WebSqlUtil.db.transaction(tx => {
                tx.executeSql('update ' + tableName + ' set ' + updatemessage + ' where ' + keyField + '=' + keyValue + '', [],
                     (tx,result) => {
                    resolve(result);
                }, (tx, e) => {
                    console.error(e);
                    resolve("");
                });
            });
        });

    }


    /**
     * 更新数据信息(添加过滤条件)
     * @param tableName
     * @param conditionSql
     * @param fields
     * @param fieldNames
     */
    static async updateMessageByConditionSql(tableName, conditionSql, fields,fieldNames) {
        return await new Promise( (resolve, reject) => {
            let colArr = fieldNames ?  fieldNames.split(",") : [];
            let updatemessage = "";
            for (let key in fields) {
                if(colArr.length > 0){
                    for(let col in colArr){
                        if(key.toLowerCase() === colArr[col].toLowerCase()){//存在相同的key
                            updatemessage += " " + key + "='" + fields[key] + "',";
                            break;
                        }
                    }
                }else{
                    updatemessage += " " + key + "='" + fields[key] + "',";
                }
            }
            updatemessage = updatemessage.substring(0, updatemessage.length - 1);
            WebSqlUtil.db.transaction( tx => {
                tx.executeSql('update ' + tableName + ' set ' + updatemessage + ' where ' + conditionSql , [],
                     (tx,result) => {
                        resolve(result);
                    }, (tx, e) => {
                        console.error(e);
                        resolve("");
                    });
            });
        });

    }

    /**
     * 更新数据信息(通过id)
     * @param tableName
     * @param id
     * @param fields
     * @param fieldNames
     */
    static async updateMessageById(tableName, id, fields,fieldNames) {
        return await new Promise( (resolve, reject) => {
            let updatemessage = "";
            let colArr = fieldNames ?  fieldNames.split(",") : [];
            for (let key in fields) {
                if(colArr.length > 0){
                    for(let col in colArr){
                        if(key.toLowerCase() === colArr[col].toLowerCase()){//存在相同的key
                            updatemessage += " " + key + "='" + fields[key] + "',";
                            break;
                        }
                    }
                }else{
                    updatemessage += " " + key + "='" + fields[key] + "',";
                }
            }
            updatemessage = updatemessage.substring(0, updatemessage.length - 1);
            WebSqlUtil.db.transaction( tx => {
                tx.executeSql('update ' + tableName + ' set ' + updatemessage + ' where id=' + id , [],
                     (tx,result) => {
                        resolve(result);
                    },  (tx, e) => {
                        console.error(e);
                        resolve("");
                    });
            });
        });

    }

    //-----------------删除数据-----------------
    /**
     * 删除数据（sql语句）
     * @param sql
     */
    static async deleteDataBySql (sql) {
        return await new Promise((resolve, reject) => {
            WebSqlUtil.db.transaction( tx=> {
                tx.executeSql(sql, [],  (tx,result) => {
                    resolve(result);
                },  (tx,e) => {
                    resolve("");
                });
            });
        });

    }

    /**
     * 根据字段删除信息
     * @param tableName 表名
     * @param field 字段
     * @param value 字段值
     */
    static async deleteDataByFieldAndValue(tableName, field, value) {
        return await new Promise((resolve, reject) => {
            WebSqlUtil.db.transaction((tx) => {
                tx.executeSql('delete from ' + tableName + ' where ' + field + '=?', [value], (tx, rs) => {
                    resolve(rs);
                }, (tx, e) => {
                    console.error(e);
                    resolve("");
                });
            });
        });

    }

    /**
     * 根据sql过滤条件删除信息
     * @param tableName 表名
     * @param conditionSql sql过滤条件
     */
    static async deleteDataByConditionSql(tableName, conditionSql) {
        return await new Promise((resolve, reject) => {
            WebSqlUtil.db.transaction((tx) => {
                tx.executeSql('delete from ' + tableName + ' where ' + conditionSql , [], (tx, rs) => {
                    resolve(rs);
                }, (tx, e) => {
                    console.error(e);
                    resolve("");
                });
            });
        });

    }

    /**
     * 根据主键id的值删除信息
     * @param tableName 表名
     * @param id 主键值
     */
    static async deleteDataById(tableName, id) {
        return await new Promise((resolve, reject) => {
            WebSqlUtil.db.transaction((tx) => {
                tx.executeSql('delete from ' + tableName + ' where id=' + id , [], (tx, rs) => {
                    resolve(rs);
                }, (tx, e) => {
                    console.error(e);
                    resolve("");
                });
            });
        });

    }



    //---------查询数据-----------------

    /**
     * 查询数据（通过sql语句）
     * @param sql
     */
    static async queryDataBySql(sql) {
        return await new Promise((resolve, reject) => {
            let dataList = [];
            WebSqlUtil.db.transaction((tx) => {
                tx.executeSql(sql, [], (tx, rs) => {
                    for (let i = 0; i < rs.rows.length; i++) {
                        dataList.push(Object.assign({}, rs.rows.item(i)));
                    }
                    resolve(dataList);
                }, (tx, e) => {
                    console.error(e);
                    resolve("");
                });
            });
        });

    }

    /**
     * 根据条件查询表中的数据并以数组的格式返回(数组中保存的是json对象)
     * @param tableName 表名
     * @param field 字段
     * @param value 字段值
     * @returns {*}
     */
    static async queryDataByFieldAndValue(tableName, field, value) {
        return await new Promise((resolve, reject) => {
            let dataList = [];
            WebSqlUtil.db.transaction((tx) => {
                tx.executeSql('select * from ' + tableName + ' where ' + field + '=?', [value], (tx, rs) => {
                    for (let i = 0; i < rs.rows.length; i++) {
                        dataList.push(Object.assign({}, rs.rows.item(i)));
                    }
                    resolve(dataList);
                }, (tx, e) => {
                    console.error(e);
                    resolve("");
                });
            });
        });

    }
    /**
     * 查询数据信息(添加过滤条件)
     * @param tableName
     * @param conditionSql
     */
    static async  queryDataByConditionSql(tableName, conditionSql) {
        return await new Promise((resolve, reject) => {
            let dataList = [];
            WebSqlUtil.db && WebSqlUtil.db.transaction((tx) => {
                tx.executeSql('select * from ' + tableName + ' where ' + conditionSql , [], (tx, rs) => {
                    for (let i = 0; i < rs.rows.length; i++) {
                        dataList.push(Object.assign({}, rs.rows.item(i)));
                    }
                    resolve(dataList);
                }, (tx, e) => {
                    console.error(e);
                    resolve("");
                });
            });
        });

    }

    /**
     * 查询数据信息(通过id)
     * @param tableName
     * @param id
     */
    static async queryDataById(tableName, id) {
        return await new Promise((resolve, reject) => {
            let dataList = [];
            WebSqlUtil.db.transaction((tx) => {
                tx.executeSql('select * from ' + tableName + ' where id=' + id , [], (tx, rs) => {
                    for (let i = 0; i < rs.rows.length; i++) {
                        dataList.push(Object.assign({}, rs.rows.item(i)));
                    }
                    resolve(dataList);
                }, (tx, e) => {
                    console.error(e);
                    resolve("");
                });
            });
        });

    }


    /**
     * 查询表中的所有数据
     * @param tableName
     * @returns {*}
     */
    static async queryAllDataFromTable(tableName) {
        return await new Promise((resolve, reject) => {
            let dataList = [];
            WebSqlUtil.db.transaction((tx) => {
                tx.executeSql('select * from ' + tableName , [], (tx, rs) => {
                    for (let i = 0; i < rs.rows.length; i++) {
                        dataList.push(Object.assign({}, rs.rows.item(i)));
                    }
                    resolve(dataList);
                }, (tx, e) => {
                    console.error(e);
                    resolve("");
                });
            });
        });

    }

    /**
     * 查询表中的所有数据,并排序
     * @param tableName
     * @param field 字段名
     * @param value 排序的方式
     * @returns {*}
     */
    static async queryAllDataOrderByFromTable(tableName, field, value) {
        let fieldValue = value ? "ASC":"value";
        return await new Promise((resolve, reject) => {
            let dataList = [];
            WebSqlUtil.db.transaction((tx) => {
                let dataList = [];
                tx.executeSql('select *from ' + tableName + ' order by ' + field + ' ' + fieldValue, [], (tx, rs) => {
                    for (let i = 0; i < rs.rows.length; i++) {
                        dataList.push(Object.assign({}, rs.rows.item(i)));
                    }
                    resolve(dataList);
                }, (tx, e) => {
                    console.error(e);
                    resolve("");
                });
            });
        });

    }

    /**
     * 分页查询数据
     * @param tableName
     * @param conditionSql
     * @param orderBySql
     * @param pageNum
     * @param pageSize
     * @returns {Promise}
     */
    static async pagingQuery(tableName, conditionSql,orderBySql,pageNum,pageSize) {
         let sql = 'select * from ' + tableName;
         if(conditionSql !== "" &&  conditionSql !== null){
             sql += " WHERE "+ conditionSql;
         }
         if(orderBySql !== "" &&  orderBySql !== null){
             sql += " ORDER BY "+ orderBySql;
         }
         if(pageNum !== "" &&  pageNum !== null){
             if(!pageSize || pageSize === "" || pageSize === null){
                 pageSize = 10;
             }
             let startPage = parseInt(pageNum-1) * pageSize;
             sql += " limit "+ startPage+","+pageSize;
         }
        return await new Promise((resolve, reject) => {
            let dataList = [];
            WebSqlUtil.db.transaction((tx) => {
                tx.executeSql(sql , [], (tx, rs) => {
                    for (let i = 0; i < rs.rows.length; i++) {
                        dataList.push(Object.assign({}, rs.rows.item(i)));
                    }
                    resolve(dataList);
                }, (tx, e) => {
                    console.error(e);
                    resolve("");
                });
            });
        });

     }

    /**
     * 分页查询数据2
     * @param tableName
     * @param conditionSql
     * @param orderBySql
     * @param strartIndex
     * @param pageSize
     * @returns {Promise}
     */
    static async pagingQuery2(tableName, conditionSql,orderBySql,strartIndex,pageSize) {
        let sql = 'select * from ' + tableName;
        if(conditionSql !== "" &&  conditionSql !== null){
            sql += " WHERE "+ conditionSql;
        }
        if(orderBySql !== "" &&  orderBySql !== null){
            sql += " ORDER BY "+ orderBySql;
        }
        // let startPage = int.parse(pageNum-1) * pageSize;
        sql += " limit "+ strartIndex+","+pageSize;
        // console.log("SQL : " + sql);
        return await new Promise((resolve, reject) => {
            let dataList = [];
            WebSqlUtil.db.transaction((tx) => {
                tx.executeSql(sql , [], (tx, rs) => {
                    for (let i = 0; i < rs.rows.length; i++) {
                        dataList.push(Object.assign({}, rs.rows.item(i)));
                    }
                    resolve(dataList);
                }, (tx, e) => {
                    console.error(e);
                    resolve("");
                });
            });
        });

    }



    /**
     * 分页查询数据（通过开始页数和结束数）
     * @param tableName
     * @param conditionSql
     * @param orderBySql
     * @param startNum
     * @param endNum
     * @returns {Promise}
     */
    static async pagingQuery3(tableName, conditionSql,orderBySql,startNum,endNum) {
        let sql = 'select * from ' + tableName;
        if(conditionSql !== "" &&  conditionSql !== null){
            sql += " WHERE "+ conditionSql;
        }
        if(orderBySql !== "" &&  orderBySql !== null){
            sql += " ORDER BY "+ orderBySql;
        }
        let pageSize = parseInt(endNum, 10) - parseInt(startNum, 10)+1;
        sql += " limit "+ startNum+","+pageSize;
        // console.log("SQL : " + sql);
        return await new Promise((resolve, reject) => {
            let dataList = [];
            WebSqlUtil.db.transaction((tx) => {
                tx.executeSql(sql , [], (tx, rs) => {
                    for (let i = 0; i < rs.rows.length; i++) {
                        dataList.push(Object.assign({}, rs.rows.item(i)));
                    }
                    resolve(dataList);
                }, (tx, e) => {
                    console.error(e);
                    resolve("");
                });
            });
        });

    }


    /**
     * 获取查询的总数
     * @param tableName
     * @param conditionSql
     * @returns {Promise}
     */
    static async getDataAcount(tableName, conditionSql) {
        let sql = 'select count(1) as acount from ' + tableName;
        if(conditionSql !== "" &&  conditionSql !== null){
            sql += " WHERE "+ conditionSql;
        }
        return await new Promise((resolve, reject) => {
            WebSqlUtil.db.transaction((tx) => {
                tx.executeSql(sql , [], (tx, rs) => {
                    resolve(rs.rows[0].acount);
                }, (tx, e) => {
                    console.error(e);
                    resolve("");
                });
            });
        });
    }
}