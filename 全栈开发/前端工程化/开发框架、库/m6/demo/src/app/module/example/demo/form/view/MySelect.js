/**
 * Created by xiechunming on 2017/09/14.
 */

import React from 'react';
import M6Core from 'm6-core'; // eslint-disable-line

const { Root, Body, Header, NavBtn, Form, Div, Select, Toggle, Checkbox, Button, Quote } = M6Core.Components;

@M6Core.Connect
export default class MySelect extends M6Core.View {

    constructor(props) {
        super(props);
        this.toBind('dateOnChange', 'zoneOnChange', 'toggleOnChange', 'typeOnChange', 'dyncSJSMCondition', 'goOther', 'goValue');
    }

    planToDidMount() {
        super.planToDidMount();
        // 模拟网络请求返回数据
        setTimeout(() => {
            !this.getViewStyle().cb1 && this.setViewStyle({cb1: [
                {title:'中国', code:'CN', default: true}, {title:'日韩', code:'RH'},
                {title:'欧美', code:'OM'}, {title:'其他', code:'QT'},
            ]});
        }, 1000);
    }

    dateOnChange(code) {
        console.log('选择的值[' + code + ']');
    }

    zoneOnChange(code) {
        console.log('选择的值[' + code + ']');
    }

    checkOnChange(code) {
        console.log('选择的值[' + code + ']');
    }

    toggleOnChange(code) {
        console.log('选择的值[' + code + ']');
    }

    typeOnChange(codes) {
        console.log('选择的值', codes);
    }

    dyncSJSMCondition(callback) {
        // 动态模式获取数据，比如本地或者网络请求获取，然后通过callback塞回去告知select2
        // 获取到的数据
        let sJSMCondition = [
            {title:'对讲机', code:'DJJ'},
            {title:'BB机', code:'BBJ'},
            {title:'摄像机', code:'SXJ'},
        ];
        callback && callback(sJSMCondition);
    }

    goOther() {
        this.go('/popup');
    }

    goValue() {
        console.log(this.getViewData());
        console.log(this.getViewData().dateSelect);
    }

    render() {
        return (<Root host={this} >
            <Header title="选择器演示" >
                <NavBtn left title="返回" icon="arrow-left-f" onClick={this.goBack} />
            </Header>
            <Body>
                <Quote title="单选模式" fixed >
                    <Form name="select1" style={{position: 'static', border: '1px solid #eee'}} >
                        <Select name="dateSelect" title="日期" conditions={[[
                            {title:'全部', code:'0'}, {title:'当天', code:'1'}, {title:'当周', code:'2'},
                            {title:'当月', code:'3'}, {title:'当年', code:'4'}, {title:'超长条测试，看看会不会自动隐藏', code:'5'},
                        ]]} autoTitle onChange={this.dateOnChange} maxTitleLength={3} />
                        <Select name="zoneSelect" title="地域" conditions={[[
                            {title:'中国', code:'CN'}, {title:'日韩', code:'RH'},
                            {title:'欧美', code:'OM'}, {title:'其他', code:'QT'},
                        ]]} onChange={this.zoneOnChange} autoTitle />
                        <Select name="typeSelect" title="分类" conditions={[
                            [
                                {title:'服装', code:'FZ'}, {title:'鞋子', code:'XZ'},
                                {title:'美妆个护', code:'MZGH'}, {title:'手机数码', code:'SJSM'},
                            ],
                            {
                                FZ: [
                                    {title:'夹克', code:'JK'}, {title:'卫衣', code:'WY'},
                                    {title:'休闲裤', code:'XXK'}, {title:'西服', code:'XF'}, {title:'其他', code:'FZQT'},
                                ],
                                XZ: [{title:'运动鞋', code:'YDX'}, {title:'皮鞋', code:'PX'}, {title:'拖鞋', code:'TX'}, {title:'其他', code:'XZQT'},],
                                MZGH: [{title:'洁面乳', code:'JMR'},],
                                SJSM: this.dyncSJSMCondition,
                            },
                        ]} onChange={this.typeOnChange}/>
                        <Toggle name="myToggle" conditions={{false: 1, true: 2}} onChange={this.toggleOnChange} style={{marginLeft: '24px'}} />
                    </Form>
                </Quote>
                <Quote title="多选模式" fixed >
                    <Form name="select2" style={{position: 'static', border: '1px solid #eee'}} >
                        <Select name="dateSelect" title="日期" conditions={[[
                            {title:'全部', code:'0'}, {title:'当天', code:'1'}, {title:'当周', code:'2'},
                            {title:'当月', code:'3'}, {title:'当年', code:'4'},
                        ]]} autoTitle multiple onChange={this.dateOnChange} />
                        <Select name="typeSelect" title="分类" conditions={[
                            [
                                {title:'服装', code:'FZ'}, {title:'鞋子', code:'XZ'},
                                {title:'美妆个护', code:'MZGH'}, {title:'手机数码', code:'SJSM'},
                            ],
                            {
                                FZ: [
                                    {title:'夹克', code:'JK'}, {title:'卫衣', code:'WY'},
                                    {title:'休闲裤', code:'XXK'}, {title:'西服', code:'XF'}, {title:'其他', code:'FZQT'},
                                ],
                                XZ: [{title:'运动鞋', code:'YDX'}, {title:'皮鞋', code:'PX'}, {title:'拖鞋', code:'TX'}, {title:'其他', code:'XZQT'},],
                                MZGH: [{title:'洁面乳', code:'JMR'},],
                                SJSM: this.dyncSJSMCondition,
                            },
                        ]} multiple onChange={this.typeOnChange} />
                    </Form>
                </Quote>
                <Quote title="Checkbox组件" fixed >
                    <Checkbox name="checkbox1" title="单选项" conditions={this.getViewStyle().cb1} onChange={this.checkOnChange} />
                    <Checkbox name="checkbox2"
                              title="这是一个很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的标题，你喜欢哪个国家？"
                              vertical multiple required conditions={[
                        {title:'中国', code:'CN', default: true}, {title:'日韩', code:'RH'},
                        {title:'欧美', code:'OM', default: true}, {title:'其他', code:'QT'},
                    ]} onChange={this.checkOnChange} />
                    <Checkbox name="checkbox3" title="单行2个" vertical multiple colSize={2} conditions={[
                        {title:'中国', code:'CN', default: true}, {title:'日韩', code:'RH'},
                        {title:'欧美', code:'OM', default: true}, {title:'其他', code:'QT'},
                    ]} />
                    <Checkbox name="checkbox4" title="单行3个" vertical multiple colSize={3} conditions={[
                        {title:'中国特别特别特别的长啊啊啊啊啊啊啊啊', code:'CN', default: true}, {title:'日韩', code:'RH'},
                        {title:'欧美', code:'OM', default: true}, {title:'其他', code:'QT'},
                    ]} />
                </Quote>
                <p style={{minHeight: '2em'}} />
                <Button title="跳转" onClick={this.goOther} />
                <Button title="获取当前页面数据" onClick={this.goValue} />
            </Body>
        </Root>);
    }
}