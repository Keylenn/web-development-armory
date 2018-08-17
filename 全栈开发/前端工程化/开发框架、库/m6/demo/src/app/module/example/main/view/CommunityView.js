/**
 * Created by xiechunming on 2017/09/15.
 */

import React from 'react';
import M6Core from 'm6-core'; // eslint-disable-line

const { Root, Body, Header, NavBtn, Div, Img, Quote, Select, Icon } = M6Core.Components;
import CommunityCtrl from "../ctrl/CommunityCtrl";
import "../css/main.scss";

@M6Core.Connect
export default class CommunityView extends M6Core.View {

    constructor(props) {
        super(props, CommunityCtrl);
    }

    planToDidMount() {
        super.planToDidMount();
        // 模拟网络请求获取到动态未读信息
        /*this.setBundle('#/dynamic', {notifyCount: 18});
        this.setBundle('#/main/inspect', {notifyCount: 2});
        this.setBundle('#/about', {notifyDot: true});
        // 模拟后台接收到推送消息，具体业务可以通过订阅广播事件进行更新未读消息
        this.notifyInterval = setInterval(() => {
            let dyBundle = this.getBundle('#/dynamic');
            dyBundle.notifyCount = parseInt(dyBundle.notifyCount || 0) + 1;
            dyBundle.notifyCount = dyBundle.notifyCount > 99 ? '99+' : dyBundle.notifyCount;
            this.setBundle('#/dynamic', dyBundle);
        }, 1500);*/
    }

    planToWillUnmount() {
        super.planToWillUnmount();
        clearInterval(this.notifyInterval);
    }

    render() {
        let _tjStyle = {
            true: {flex: 1, textAlign: 'center', borderRadius: '1rem', color: '#3b75ad', background: '#e5f2ff'},
            false: {flex: 1, textAlign: 'center', borderRadius: '1rem', color: '#bbbbbb'},
        };
        return (<Root host={this} >
            <Body>
                <div className="main-top">
                    <div className="main-top-1">
                        <Select name="zoneSelect" title="广州市" style={{fontSize: 'small'}} conditions={[[
                            {title:'广州市', code:'4401'}, {title:'深圳市', code:'4402'},
                            {title:'东莞市', code:'4403'}, {title:'湛江市', code:'4408'},
                        ]]} autoTitle />
                        <span className="main-top-1-dept"><Icon id6="location"/> 天河分局 天园街道</span>
                    </div>
                    <div className="main-top-2">
                        <Img className="main-top-2-head" src="./image/dog-6.jpg" mode={2} zoomable={false} colSize={0} fit="circle"/>
                        <span className="main-top-2-name" >
                            <span className="main-top-2-name-t">谢春明</span>
                            <span className="main-top-2-name-c">天河区 建中路20号</span>
                        </span>
                        <span className="main-top-2-tips" onClick={this.goBack} >我的代办(8) <Icon id6="arrow-right"/></span>
                    </div>
                    <div className="m6-an-apollo-20">
                        <div className="m6-an-apollo-20-left m6-an-apollo-20-left-an"/>
                        <div className="m6-an-apollo-20-right m6-an-apollo-20-right-an"/>
                    </div>
                </div>
                {/*<Img ref={this.regDef('banner')} rateH={0.25} zoomable={false} />*/}
                <Quote title="热门服务" fixed className="m6-an-dialog-in" >
                    <Div className="m6-box-cells">{this.state.entrance}</Div>
                </Quote>
                {this.getViewStyle().entrances}
            </Body>
        </Root>);
    }
}