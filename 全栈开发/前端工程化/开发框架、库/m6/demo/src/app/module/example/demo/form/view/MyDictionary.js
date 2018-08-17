/**
 * Created by xiechunming on 2017/07/01.
 */

import React from 'react';
import M6Core from 'm6-core'; // eslint-disable-line
const { Root, Body, Header, NavBtn, Form, Dictionary, Buttons, Button } = M6Core.Components;

@M6Core.Connect
export default class MyDictionary extends M6Core.View {

    constructor(props) {
        super(props);
        this.toBind('setValue', 'resetValue', 'getValue', 'goMyPopup', 'hasNext', 'dynamicParamsOfJWH','onChange');
        this.Json01 = require('../../../asset/json/01.json');
    }

    onChange(e, codes, details, nodeCodes, nodeDetails){
        console.log(codes, details);
        console.log(nodeCodes, nodeDetails); // 内联父节点的数组数据（代码code和内容detail）
        console.log(nodeDetails.join('')); // 组合输出string，当然中间可以自己加分隔符
        console.log(this.getViewData(true));
    }

    hasNext(data) {
        console.log(data);
        if(data.X_CODE.length < 8)
            return true;
        else return false;
    }

    setValue() {
        let viewData = this.getViewData();
        viewData.mydictionary = viewData.mydictionary || {};
        viewData.mydictionary.sex = '3';
        viewData.mydictionary.dzs = '440103002';
        this.setViewData(viewData);
    }

    resetValue() {
        let viewData = this.getViewData(true);
        viewData.mydictionary = viewData.mydictionary || {};
        viewData.mydictionary.sex = '';
        viewData.mydictionary.dzs = '';
        console.log(viewData);
        this.setViewData(viewData);
    }

    getValue() {
        console.log(this.getViewData(true));
        // 原型模式
        window.MSON.get('../mson/07.mson'), json => console.log(json);
    }

    goMyPopup() {
        this.go('/demo/popup', {systemid: 'bililhdfgf'});
    }

    /** 动态取值 */
    dynamicParamsOfJWH() {
        // 这里可以进行业务处理
        return {
            xx: this.xx,
            bb: this.getValue(),
            cc: '123'
        };
    }

    render() {
        this.dept81Next = function(data) {if(data.code.length < 15) return true; else return false;};
        return (<Root host={this}>
            <Header title="字典演示" >
                <NavBtn left title="返回" icon="arrow-left-f" onClick={this.goBack} />
                <NavBtn right title="跳转" onClick={this.goMyPopup} />
            </Header>
            <Body>
                <Form name="mydictionary" >
                    <Dictionary name="dzs" title="内联级:居委会" provider="P4SimpleProvider" providerEntity={{
                        url: 'http://192.168.18.45:8083/gdskdzk/mobile_proxy',
                        params: {
                            queryEntityId: 'DYNAMIC_DICTIONARY20170317151200_forMobile',
                            tableName: 'V_SYRK_XZQH',
                            X_SUPERCODE: 'SJXZQH_DM',
                            X_CODE: 'DM',
                            X_DETAIL: 'MC',
                            X_SPELL: '1',
                            filterSql: "nvl(deleteflag,'0')='0'",
                            queryCondition_X_SUPERCODE: '440000', // 预设父亲节点数据
                            USERID: 'manager', // 单点伪登录
                        }
                    }} complex onChange={this.onChange} hasNext={this.hasNext} dynamicParams={this.dynamicParamsOfJWH} />
                    <Dictionary name="dept1" title="警综3:单位" provider="P3SimpleProvider" providerEntity={{
                        url: 'http://192.168.66.155:7103/basic/simplequery/queryFromMobile',
                        params: {
                            queryEntityId: 'DYNAMIC_DICTIONARY201707041624_forMobile',
                            tableName: 'DICTIONARY',
                            X_CODE: 'CODE',
                            X_DETAIL: 'DETAIL',
                            X_SPELL: 'SPELL',
                            filterSql: "KIND='06'",
                            USERID: 'manager', // 单点伪登录
                        }
                    }} multiple />
                    <Dictionary name="dept2" title="警综4:治安业务类别" provider="P4SimpleProvider" providerEntity={{
                        url: 'http://192.168.18.45:8083/gdskdzk/mobile_proxy',
                        params: {
                            queryEntityId: 'DYNAMIC_DICTIONARY20170317151200_forMobile',
                            tableName: 'DICTIONARY',
                            X_CODE: 'CODE',
                            X_DETAIL: 'DETAIL',
                            X_SPELL: 'SPELL',
                            filterSql: "KIND='ZAGLYWLB'",
                            USERID: 'manager', // 单点伪登录
                        }
                    }} multiple searchable />
                    <Dictionary name="xzqh" title="警综4:行政区划" provider="P4SimpleProvider" providerEntity={{
                        url: 'http://192.168.18.36:10110/base/mobile_proxy',
                        params: {
                            queryEntityId: 'DYNAMIC_DICTIONARY20170317151200_forMobile',
                            tableName: 'DICTIONARY',
                            X_CODE: 'CODE',
                            X_DETAIL: 'DETAIL',
                            X_SPELL: 'SPELL',
                            filterSql: "KIND='07'",
                            USERID: 'manager', // 单点伪登录
                        }
                    }} multiple searchable value="441301,441302" />
                    <Dictionary name="sex" title="本地:性别" provider="JsonProvider" providerEntity={{
                        url: this.Json01,
                    }} autoHidden value="1" />
                    <Dictionary name="xzqh1" title="本地:行政区划" provider="JsonProvider" providerEntity={{url: '../mson/07.mson',}}
                                value="230406" searchable multiple />
                    <Dictionary name="dept7" title="静态字典:地址元素类型" provider="XJZDictProvider" providerEntity={{
                        url: 'http://192.168.18.45:8083/gdskdzk/mobile_proxy',
                        params: {
                            kind: 'DZYSLX'
                        }
                    }} multiple searchable value="40"/>
                    <Dictionary name="dept8" title="动态字典:地址元素类型" provider="XJZDictProvider" providerEntity={{
                        url: 'http://192.168.18.45:8083/gdskdzk/mobile_proxy',
                        params: {
                            dictType: 'dynamic',
                            configId:"DZ_JLX01_DZYSLXDM_DICT",
                            supercode:'40'
                        }
                    }} multiple searchable value="42"/>
                    <Dictionary name="dept81" title="动态字典:级联字典" provider="XJZDictProvider" complex providerEntity={{
                        url: 'http://192.168.18.45:8083/gdskdzk/mobile_proxy',
                        params: {
                            dictType: 'dynamic',
                            configId:"DZ_XZQH_DICT_Tree",
                            paramNames:'sjxzqh_dm',
                            sjxzqh_dm: '0'
                        }
                    }} hasNext={this.dept81Next} />
                    <Dictionary name="dept9" title="动态字典:级联字典" provider="XJZDictProvider" complex providerEntity={{
                        url: 'http://192.168.18.45:8083/gdskdzk/mobile_proxy',
                        params: {
                            dictType: 'dynamic',
                            userConfigId:"DZ_XZQH_DICT_Tree",
                            transConfigId:"DZ_XZQH_DICT_Tree_CO",
                            paramNames:'sjxzqh_dm',
                            sjxzqh_dm: '0'
                        }
                    }} value="441602001003000" hasNext={this.dept81Next} />
                </Form>
                <Buttons>
                    <Button title="setValue" onClick={this.setValue} />
                    <Button title="reset" onClick={this.resetValue} />
                    <Button title="getValue" onClick={this.getValue} />
                </Buttons>
            </Body>
        </Root>);
    }

}


{/*
 <Dictionary name="dept" title="警综3：单位" provider="P3SimpleProvider" providerEntity={{
 url: 'http://192.168.66.155:7103/basic/simplequery/queryFromMobile',
 params: {
 queryEntityId: 'DICTIONARY201706301131_forMobile',
 queryCondition_KIND: '06',
 }
 }} multiple />
<Dictionary name="dept2" title="远警综4：单位" provider="P4SimpleProvider" providerEntity={{
    url: 'http://192.168.66.36:8090/base/mobile_proxyBasic',
    params: {
        queryEntityId: 'DYNAMIC_DICTIONARY20170317151200_forMobile',
        tableName: 'DICTIONARY',
        X_CODE: 'CODE',
        X_DETAIL: 'DETAIL',
        X_SPELL: 'SPELL',
        filterSql: "KIND='06'",
        USERID: 'manager', // 单点伪登录
        SERVICENAME: 'XlpcService_44000026_ZSB',
        LICENCE: 'dzzwydjw@sinobest.com.cn'
    }
}} multiple />*/}
