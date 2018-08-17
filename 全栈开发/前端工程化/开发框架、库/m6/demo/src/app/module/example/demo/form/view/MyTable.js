/**
 * Created by xiechunming on 2017/07/18.
 */

import React from 'react';
import M6Core from 'm6-core'; // eslint-disable-line

const { Root, Body, Header, NavBtn, Form, Lake, Table, Buttons, Button, Dictionary, DateTime, Icon } = M6Core.Components;

@M6Core.Connect
export default class MyTable extends M6Core.View {

    constructor(props) {
        super(props);
        this.toBind('onAddRow', 'onAddRows', 'onDeleteRow', 'onDeleteRowByTd', 'onGetRowData', 'onSetRowData',
            'onAddRowByPopup', 'onUpdateRowsByPopup', 'onSaveRowByPopup', 'csrqOnChange');
        this.addCount = -1;
        this.Json01 = require('../../../asset/json/01.json');
    }

    onAddRow(e) {
        this.addCount += 1;
        // 添加单行
        this.defRefs.myTable.addRow([
            {name: 'xm', title: '张三' + this.addCount},
            {name: 'sfzh', title: '4401021319940506789X'},
            {name: 'sex', title: '男', value: '1'},
            {name: 'nation', title: '汉族', value: '3'},
            {title: <Icon key={4} className="table-func-icon" id6="edit" onClick={this.onDeleteRowByTd} />}
        ]);
    }

    onAddRows(e) {
        this.addCount += 1;
        // 添加多行
        this.defRefs.myTable.addRow(
            [
                {name: 'xm', title: '范冰冰' + this.addCount},
                {name: 'sfzh', title: '123456789012345678'},
                {name: 'sex', title: '女', value: '0'},
                {name: 'nation', title: '苗族', value: '9'},
            ],
            [
                {name: 'xm', title: '李晨' + this.addCount},
                {name: 'sfzh', title: '100122197809221234'},
                {name: 'sex', title: '男', value: '1'},
                {name: 'nation', title: '蒙古族', value: '11'},
            ],
        );
    }

    onDeleteRow(e) {
        // 这里删除第0行数据，当然自己可以指定删除第几行
        let flag = this.defRefs.myTable.deleteRow(0);
        M6Core.Popup.show(this, 'toast', '删除:' + flag);
    }

    /** tr行内执行当前删除操作（也可以为获取行数据操作、或者修改操作，自行发散思维） */
    onDeleteRowByTd(e) {
        let tr = e.target.parentNode.parentNode.parentNode;
        console.log(tr);
        let key = tr.getAttribute('id');
        console.log(key);
        let flag = this.defRefs.myTable.deleteRow(key, true); // true 代表通过key，而非通过数组下标
        M6Core.Popup.show(this, 'toast', '删除:' + flag);
    }

    onGetRowData(e) {
        // 这里是获取当前表格内所有的数据
        console.log('表格内所有的数据', this.defRefs.myTable.getData());
        // 这里是获取当前表格内指定行的数据
        console.log('当前表格内指定行0数据', this.defRefs.myTable.getRowData(0));
    }

    onSetRowData(e) {
        // 这里是设置第0行的数据
        this.defRefs.myTable.setRowData(0, [
            {name: 'xm', title: '刘德华'},
            {name: 'sfzh', title: '440823196106064433'},
            {}, //{name: 'sex', title: '男', value: '1'}, // 不修改性别
            {}, // 不修改民族
        ]);
    }

    onAddRowByPopup(e) {
        M6Core.Popup.show(this, 'child', <Form name="backToFuture">
            <Lake name="xm" title="姓名" value="张三" />
            <Dictionary name="sex" title="性别" provider="JsonProvider" providerEntity={{url: this.Json01}} autoHidden value="2" />
            <Lake name="sfzh" title="身份证号" value="111111111111111" />
            <Dictionary name="nation" title="民族" provider="P4SimpleProvider" providerEntity={{
                url: 'http://192.168.18.36:10110/base/mobile_proxy',
                params: {
                    queryEntityId: 'DYNAMIC_DICTIONARY20170317151200_forMobile',
                    tableName: 'DICTIONARY',
                    X_CODE: 'CODE',
                    X_DETAIL: 'DETAIL',
                    X_SPELL: 'SPELL',
                    filterSql: "KIND='ZYKBZZD_003'",
                    USERID: 'manager', // 单点伪登录
                }
            }} searchable />
            <DateTime name="csrq" title="出生日期" onChange={this.csrqOnChange} />
            <Button title="保存" onClick={this.onSaveRowByPopup} />
        </Form>, {nightCall: () => {}});
    }

    onUpdateRowsByPopup(e) {
        // 跟onAddRowByPopup应用，只不过在弹出窗之前，先获取当前行的data内容，然后通过初始化值value=?的方式设置到弹出体中
    }

    onSaveRowByPopup(e) {
        console.log('当前页面所有数据集',this.getViewData(false));
        // 第二种(注意，前提是PopView并非dismiss的情况下)，建议使用第二种方式，这种模式为当前表单数据，不会收到第一种模式的污染
        M6Core.Popup.getData(this, 'child', data => {
            console.log('第二种模式', data.backToFuture);
            M6Core.Popup.dismiss(this, 'child');
        });
        // 取出后，自行通过onAddRows或者onSetRowData方式进行新增/修改表格数据
    }

    csrqOnChange(e, data) {
        console.log(e, data);
    }

    render() {
        return (<Root host={this}>
            <Header title="表格演示" >
                <NavBtn left title="返回" icon="arrow-left-f" onClick={this.goBack} />
            </Header>
            <Body>
                <Table ref={this.regDef('myTable')} name="myTable"
                       titles={[
                           '姓名',
                           {title:'身份证号', style: {width:'45%'}},
                           '性别', '民族',
                           {title: <Icon key={4} className="table-func-icon" id6="edit" />}
                       ]}
                       tfoot={(<Buttons>
                           <Button title="新增行" onClick={this.onAddRow} />
                           <Button title="新增多行" onClick={this.onAddRows} />
                           <Button title="删除行" onClick={this.onDeleteRow} />
                           <Button title="获取行数据" onClick={this.onGetRowData} />
                           <Button title="设置行数据" onClick={this.onSetRowData} />
                       </Buttons>)}
                />
                <Buttons>
                    <Button title="新增行" onClick={this.onAddRowByPopup} />
                    <Button title="编辑行" onClick={this.onUpdateRowsByPopup} />
                </Buttons>
            </Body>
        </Root>);
    }
}