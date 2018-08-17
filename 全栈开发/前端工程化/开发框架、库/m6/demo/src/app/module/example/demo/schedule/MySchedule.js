/**
 * Created by xiechunming on 2017/10/09.
 */

import React from 'react';
import M6Core from 'm6-core'; // eslint-disable-line

const { Root, Body, Header, NavBtn, Buttons, Button, Schedule } = M6Core.Components;

@M6Core.Connect
export default class MySchedule extends M6Core.View {

    constructor(props) {
        super(props);
        this.toBind('onClick1', 'onClick2');
    }

    planToDidMount() {
        super.planToDidMount();
        console.log(this.getBundle());
    }

    onClick1() {
        this.setViewData({
            mySchedule: [
                '已签收，签收人张三【13800138000】',
                (<div key={1}><div>派送中</div>抵达湛江市遂溪县，陈志贤正在派件</div>),
                (<div key={2}><div>运输中</div>到湛江市【湛江集散仓】，正发往【遂溪县】</div>),
                (<div key={3}><div>运输中</div>到湛江市【湛江集散仓】</div>),
                (<div key={4}><div>运输中</div>到广州市【广州夏良转运中心】，正发往【湛江集散仓】</div>),
                (<div key={5}><div>运输中</div>到韶关市【韶关集散仓】，正发往【广州夏良转运中心】</div>),
                (<div key={6}><div>已揽件</div>【韶关武江区一部】揽收成功</div>),
                '卖家已发货',
            ],
        });
    }

    onClick2() {
        this.setViewData({
            mySchedule: [
                {left: '2017-10-9', right: (<div>已签收，签收人张三<br />【 <a style={{textDecoration: 'underline', color: 'red'}}>13800138000</a> 】</div>)},
                {left: '2017-10-9', right: (<div><div>派送中</div>抵达湛江市遂溪县，陈志贤正在派件</div>)},
                {left: '2017-10-8', right: (<div><div>运输中</div>到湛江市【湛江集散仓】，正发往【遂溪县】</div>)},
                {left: '2017-10-8', right: (<div><div>运输中</div>到湛江市【湛江集散仓】</div>)},
                {left: '2017-10-7', right: (<div><div>运输中</div>到广州市【广州夏良转运中心】，正发往【湛江集散仓】</div>)},
                {left: '2017-10-6', right: (<div><div>运输中</div>到韶关市【韶关集散仓】，正发往【广州夏良转运中心】</div>)},
                {left: '2017-10-5', right: (<div><div>已揽件</div>【韶关武江区一部】揽收成功</div>)},
                {left: '2017-10-5', right: '卖家已发货'},
            ],
        });
    }

    render() {
        return (<Root host={this} >
            <Header title="预览进度条演示" >
                <NavBtn left title="返回" icon="arrow-left-f" onClick={this.goBack} />
            </Header>
            <Body>
                <Schedule name="mySchedule"
                          style={{paddingBottom: '3rem'}}
                          title="[收货地址] 广州市天园街道建中路20号3楼华资软件"
                          value={[
                              (<div key={5}><div>运输中</div>到韶关市【韶关集散仓】，正发往【广州夏良转运中心】</div>),
                              (<div key={6}><div>已揽件</div>【韶关武江区一部】揽收成功</div>),
                              '卖家已发货',
                          ]} />
                <Buttons style={{position: 'fixed', bottom: '0', width: '100%', background: '#ffffff'}}>
                    <Button title="简约模式" onClick={this.onClick1} />
                    <Button title="普通模式" onClick={this.onClick2} />
                </Buttons>
            </Body>
        </Root>);
    }
}