import React from 'react';
import M6Core from 'm6-core'; // eslint-disable-line

const { Root, Body, Header, NavBtn, Form, Icon, Img, Div, List } = M6Core.Components;
import Controller from "./ctrl/DetailCtrl";
import "./css/detail.scss";

@M6Core.Connect
export default class DetailView extends M6Core.View {
    constructor(props) {
        super(props, Controller);
    }

    planToDidMount() {
        super.planToDidMount();
        if(!this.props.tabState.systemId){
            Object.assign(this.props.tabState, this.getBundle().state);
            this.refresh();
        }
        this.defRefs['headIcon'].addImage(this.props.tabState.user.headIcon);
    }

    render() {
        let userName, publishFrom = '', publishTime = '';
        if(this.props.tabState && this.props.tabState.user){
            userName =  this.props.tabState.user.name;
            publishFrom =  this.props.tabState.publishFrom;
            publishTime =  this.props.tabState.publishTime;
        }
        return (<Root className="dynamic-detail" host={this}>
            <div className="dynamic-list-item dynamic-detail-title">
                <Icon className="dynamic-detail-title-back" id6="arrow-left" onClick={this.goBack} />
                <div className="dynamic-list-item-title" >
                    <Img ref={this.regDef('headIcon')} mode={2} zoomable={false} colSize={0} fit="circle"
                         className="dynamic-list-item-title-head" />
                    <span className="dynamic-list-item-title-name" >
                        <span className="dynamic-list-item-title-name-t">{userName}</span>
                        <span className="dynamic-list-item-title-name-c">{publishFrom}</span>
                    </span>
                    <span className="dynamic-list-item-title-tips" >{publishTime}</span>
                </div>
            </div>
            {this.props.tabTop}
            <Body>
            <List ref={this.regDef('content')} name="content" className="dynamic-list dynamic-detail-list" />
            </Body>
        </Root>);
    }
}