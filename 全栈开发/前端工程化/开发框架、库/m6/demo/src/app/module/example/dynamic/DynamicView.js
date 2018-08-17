/**
 * Created by xiechunming on 2017/09/15.
 */

import React from 'react';
import M6Core from 'm6-core'; // eslint-disable-line

const { Root, Body, Header, NavBtn, List, Div, Img, Button } = M6Core.Components;
import Controller from "./ctrl/DynamicViewCtrl";
import "./css/dynamic.scss";

@M6Core.Connect
export default class DynamicView extends M6Core.View {

    constructor(props) {
        super(props, Controller);
        this.toBind('goShortcut', 'publishMsg');
    }

    planToDidMount() {
        super.planToDidMount();
        this.setBundle(this.getUrl(), {notifyCount: 0}); // 模拟阅读清空
    }

    goShortcut() {
        M6Core.Popup.show(this, 'shortcut');
    }

    publishMsg() {
        this._toPublishMsgCode = -1;
        this._toPublishMsgView = this._toPublishMsgView || (() => {
            this._toPublishMsgCode = 1;
            M6Core.Popup.dismiss(this);
        });
        M6Core.Popup.show(this, 'dialog', <div>
            <Button title="拍摄" />
            <Button title="新增内容" lIcon="edit" onClick={this._toPublishMsgView} />
            <div style={{minHeight: '0.75rem', background: '#f3f3f3'}} />
            <Button title="取消" style={{border: 'none'}} onClick={M6Core.Popup.dismiss} />
        </div>, {
            nightCall: data => {
                if(this._toPublishMsgCode === 1) {
                    this.go('/dynamic/publish', {a: 1});
                }
            },
        });
    }

    render() {
        // <Search rootClassName="search-dark header-extend-bg" onSearch={this.addItem} placeholder="动态 / 发布信息 / 公告" />
        return (<Root host={this} >
            <Header title="动态" style={{background: '#fafafa', color: '#444'}} >
                <NavBtn left icon="more" onClick={this.goShortcut} />
                <NavBtn right icon="camera" onClick={this.publishMsg} />
            </Header>
            <Body>
                <Div className="dynamic-head">
                    <Img src="./image/dog-3.jpg" mode={2} zoomable={false} colSize={0} className="dynamic-head-left" />
                    <Div className="dynamic-head-right m6-center-vertical">
                        <div className="dynamic-head-right-item">
                            <div ref={this.regDef('post')} className="dynamic-head-right-item-num"/>
                            <div className="dynamic-head-right-item-title">帖子</div>
                        </div>
                        <div className="dynamic-head-right-item">
                            <div ref={this.regDef('fans')} className="dynamic-head-right-item-num"/>
                            <div className="dynamic-head-right-item-title">粉丝</div>
                        </div>
                        <div className="dynamic-head-right-item">
                            <div ref={this.regDef('follow')} className="dynamic-head-right-item-num"/>
                            <div className="dynamic-head-right-item-title">关注</div>
                        </div>
                    </Div>
                </Div>
                <List ref={this.regDef('myList')} name="myList" className="dynamic-list" onItemClick={this.getController().onListClick}
                      onSlide={{down: this.getController().onDown, up: this.getController().onUp}} />
            </Body>
        </Root>);
    }
}