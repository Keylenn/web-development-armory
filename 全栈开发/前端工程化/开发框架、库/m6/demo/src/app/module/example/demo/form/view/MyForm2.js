/**
 * Created by xiechunming on 2017/11/28.
 */

import React from 'react';
import M6Core from 'm6-core'; // eslint-disable-line

const { Root, Header, NavBtn, Body, Quote, Img, Form, Lake, Div, Dictionary, Toggle, Checkbox, DateTime, Buttons, Button } = M6Core.Components;

@M6Core.Connect
export default class MyForm2 extends M6Core.View {

    constructor(props) {
        super(props);
        this.toBind('toSave', 'toModify', 'setInfo', 'validateForm', 'ruleZJHM', 'goOther');
        this.Json_01 = require('../../../asset/json/01.json');
    }

    planToDidMount() {
        super.planToDidMount();
        let bundle = this.getBundle();
        if(bundle && bundle.modified){
            this.toModify(); // 执行修改
        }else{
            this.historyAction() === 'PUSH' && this.setInfo(); // 执行查看
        }
    }

    goOther() {
        this.go('/demo/popup', {systemId: '123456'}); // 携带参数模式跳转
    }

    toModify(modified = true) {
        this.setViewStyle({modified: modified});
    }

    toSave() {
        // 保存当前表单
        console.log(this.getViewData());
        this.toModify(false);
    }

    setInfo() {
        M6Core.Fetch({
            url: 'http://192.168.18.52:9996/base/sqjw/test/getMyForm',
            params: {},
            networkOpt: {processable: true, mock: 'SQJW_TEST_GETFORM'},
            callback: entity => {
                if(entity.flag === 1 && entity.result){
                    this.defRefs['personImgs'].addImage(...entity.result.personImgs);
                    delete entity.result.personImgs;
                    this.setViewData(entity.result);
                }
            }
        });
    }

    validateForm(e, callback, component) {
        let errorList = this.defRefs.basicInfo.validate();
        console.info('表单basicInfo校验结果', errorList);
        setTimeout(() => {
            callback(false); // false解锁按钮, true不解锁按钮
        }, 3000); // 延时方式模拟网络请求过程
    }

    /** 业务自定义校验 */
    ruleZJHM() {
        return {
            rule: zjhm => {
                let zjlx = this.getViewData();
                zjlx = zjlx.basicInfo && zjlx.basicInfo.zjhm_type;
                if(zjlx === 'SFZ'){
                    if(zjhm.length === 15 || zjhm.length === 18)
                        return true;
                    else return false;
                }else return true;
            },
            tip: '证件格式错误'
        };
    }

    render() {
        let modified = !!this.getViewStyle().modified;
        return (<Root host={this} >
            <Header title="表单演示" float={!modified} transparent style={{background: 'rgba(0,0,0, 0.2)'}} >
                <NavBtn left title="返回" icon="arrow-left-f" onClick={this.goBack} />
                <NavBtn right title={modified ? '保存' : '修改'} onClick={modified ? this.toSave : this.toModify} />
            </Header>
            <Body>
                <Img ref={this.regDef('personImgs')} selectable={modified} mode={modified ? 2 : 1} />
                <Quote title="基本信息" fixed >
                    <Form ref={this.regDef('basicInfo')} name="basicInfo" >
                        <Div vesselValidation style={{display: 'flex'}} >
                            <Div vesselValidation style={{flex: 1}} >
                                <Lake name="name" title="姓名" required placeholder="..." readOnly={!modified} />
                            </Div>
                            <Div vesselValidation style={{flex: 1}} >
                                <Dictionary name="sex" title="性别" required provider="JsonProvider" providerEntity={{url: this.Json_01}} autoHidden readOnly={!modified} />
                            </Div>
                        </Div>
                        <Lake name="_zjhm_type" title="证件类型"
                              rIcon={<Checkbox name="zjhm_type" style={{color: '#555'}} conditions={[
                                  {title:'身份证', code:'SFZ', default: true}, {title:'护照', code:'HZ'}, {title:'外籍', code:'WJ'}
                              ]} readOnly={!modified} />}
                              inputStyle={{visibility: 'hidden'}} readOnly={!modified} />
                        <Lake name="zjhm" title="证件号码" required rule={[this.ruleZJHM()]} placeholder="身份证 / 护照"
                              readOnly={!modified} inputStyle={{textAlign: 'right', marginRight: '2rem'}} rIcon="location" />
                        <Div style={{display: 'flex'}} >
                            <Div style={{flex: 1}} >
                                <DateTime name="csrq" title="出生" readOnly={!modified} />
                            </Div>
                            <Div style={{flex: 1}} >
                                <Dictionary name="mz" title="民族" readOnly={!modified} provider="JsonProvider" providerEntity={{url: '../mson/05.mson'}} autoHidden />
                            </Div>
                        </Div>
                        <Dictionary name="jg" title="籍贯" provider="JsonProvider" providerEntity={{url: '../mson/07.mson'}} readOnly={!modified} />
                        <Lake name="sjhm" title="手机号码" placeholder="手机号码 / 固定电话"
                              readOnly={!modified} inputStyle={{textAlign: 'right', marginRight: '2rem'}}
                              rIcon="phone" type="number" />
                    </Form>
                </Quote>
                <Quote name="lrxxQuote" title="流入信息" >
                    <Form name="comeInfo" >
                        <Lake name="cjd" title="曾居地址" placeholder="曾经居住详细地址" value="大清帝国 紫禁城西城区醇亲王府" readOnly />
                        <Lake name="xjd" title="现居地址(固定)" placeholder="现在居住详细地址" >
                            <Checkbox name="xjd_type" title=" " conditions={[
                                {title:'单人', code:'DR', default: true}, {title:'合租', code:'HZ'},
                                {title:'家庭', code:'JT'}, {title:'单位', code:'DW'}, {title:'其他', code:'QT'}
                            ]} />
                        </Lake>
                        <DateTime name="lrsj" title="流入时间" now />
                        <Lake name="gzlx" title="工作类型" placeholder="工作类型种类" />
                        <DateTime name="bynf" title="毕业日期" type="110000" />
                        <Lake name="_lrqr" className="lake-readOnly-normal"
                              title="流入确认" rIcon={<Toggle name="lrqr" conditions={{false: 0, true: 1}} />}
                              inputStyle={{visibility: 'hidden'}} />
                        <Checkbox name="fw" title="范围"
                                  conditions={[
                                      {title:'数据库', code:'SJK', default: true},
                                      {title:'请求服务', code:'QQFW', default: true},
                                      {title:'网络服务', code:'WS'}]}
                                  multiple >
                            <Div>
                                <Div style={{float: 'left', margin: '3px 1rem'}} >
                                    <span style={{position: 'absolute'}} >关联查询</span>
                                    <Toggle style={{marginLeft: '4.5em'}} conditions={{false: 0, true: 1}} />
                                </Div>
                                <Div style={{float: 'right', margin: '3px 1rem'}} >
                                    <span style={{position: 'absolute', right: '3.5em'}} >推送告知</span>
                                    <Toggle conditions={{false: 0, true: 1}} checked />
                                </Div>
                            </Div>
                        </Checkbox>
                    </Form>
                </Quote>
                <Quote name="fzQuote" title="附注" visible={false} >
                    {modified ? <Img selectable mode={2} /> : undefined}
                    <Form name="fzInfo" >
                        <Checkbox name="fz_type" title="登记人意见" conditions={[
                            {title:'正常', code:'ZC', default: true}, {title:'待议', code:'DY'}, {title:'待核实', code:'DHS'}
                        ]} />
                        <Lake name="fz_sm" title="说明" placeholder="备注说明" />
                    </Form>
                </Quote>
                <Buttons>
                    <Button title="设值" onClick={this.setInfo} />
                    <Button title="跳转" onClick={this.goOther} />
                    <Button title="校验" process onClick={this.validateForm} />
                </Buttons>
            </Body>
        </Root>);
    }
}