import React from 'react';
import M6Core from 'm6-core'; // eslint-disable-line

const { Root, Body, Icon, List, Div, Img, Lake } = M6Core.Components;
import Controller from "./ctrl/MessageCtrl";

@M6Core.Connect
export default class MessageView extends M6Core.View {
    constructor(props) {
        super(props, Controller);
    }

    planToDidMount() {
        super.planToDidMount();
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
                <List ref={this.regDef('content')} name="content" className="dynamic-list" />
                <p style={{minHeight:'4rem'}}/>
            </Body>
            <Div className="dynamic-detail-to-msg">
                <Lake style={{marginTop: '1rem'}} placeholder="应该说点什么呢？" />
            </Div>
        </Root>);
    }
}