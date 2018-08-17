import React from 'react';
import M6Core from 'm6-core'; // eslint-disable-line

const { ListItem, Div, Img, Lake, Icon } = M6Core.Components;

export default class DynamicViewCtrl extends M6Core.Controller {
    constructor(props) {
        super(props);
        this.toBind('onDown', 'onUp', 'onListClick', 'getMeCount');
    }

    didMount() {
        if(this.getContext().getViewData().myList === undefined || this.getContext().getViewData().myList.length === 0){
            this.query();
        }
        this.getMeCount();
    }

    query() {
        M6Core.Fetch({
            url: 'http://192.168.18.52:9996/base/sqjw/dynamic/list',
            params: {},
            networkOpt: {processable: true, mock: 'SQJW_TEST_DYNAMIC_LIST'},
            callback: entity => {
                if(entity.flag !== 1 || !entity.result) return false;
                let list = [], curLength = this.getContext().defRefs['myList'].getData().length;
                console.log(curLength);
                entity.result.list.forEach((item, i) => {
                    let content;
                    if(item.publishContent && (item.publishContent.hasOwnProperty('type1') || item.publishContent.hasOwnProperty('type2'))){
                        if(item.publishContent.hasOwnProperty('type1')){
                            content = (<Img src={item.publishContent.type1.images} mode={item.publishContent.type1.type} rateH={0.25} />);
                        }else{
                            content = (<blockquote className="dynamic-list-item-margin">{item.publishContent.type2.pre}</blockquote>);
                        }
                    }
                    list.push(<ListItem key={curLength + i} itemID={item.systemId} itemData={item} style={{borderTop: '0.5rem solid #f3f3f3'}} onSlide={{
                        left: <div className="dynamic-list-item-more">
                            <div className="dynamic-list-item-more-i m6-center-vertical m6-center-horizontal"
                                 style={{background: '#cccccc'}}>关注</div>
                            <div className="dynamic-list-item-more-i m6-center-vertical m6-center-horizontal"
                                 style={{background: '#ff4d4f'}}>屏蔽</div>
                        </div>
                    }} >
                        <Div className="dynamic-list-item">
                            <Div className="dynamic-list-item-title" >
                                <Img src={item.user.headIcon} mode={2} zoomable={false} colSize={0} fit="circle"
                                     className="dynamic-list-item-title-head" />
                                <span className="dynamic-list-item-title-name" >
                                    <span className="dynamic-list-item-title-name-t">{item.user.name}</span>
                                    <span className="dynamic-list-item-title-name-c">{item.publishFrom}</span>
                                </span>
                                <span className="dynamic-list-item-title-tips" >{item.publishTime}</span>
                            </Div>
                            <Div vesselValidation className="dynamic-list-item-content" >
                                {item.publishText ? <Lake value={item.publishText} style={{borderBottom: 'none'}} disabled /> : undefined}
                                {content}
                            </Div>
                            <Div className="dynamic-list-item-func">
                                <Div className="dynamic-list-item-func-i m6-center-horizontal">
                                    <span><Icon id6="share" size={18}/>{` ${item.count.share}`}</span>
                                </Div>
                                <Div className="dynamic-list-item-func-i m6-center-horizontal">
                                    <span><Icon id6="chat" size={18}/>{` ${item.count.chat}`}</span>
                                </Div>
                                <Div className="dynamic-list-item-func-i m6-center-horizontal">
                                    <span><Icon id6="good" size={18}/>{` ${item.count.good}`}</span>
                                </Div>
                            </Div>
                        </Div>
                    </ListItem>);
                });
                this.getContext().defRefs['myList'].add(list);
            }
        });
    }

    getMeCount() {
        M6Core.Fetch({
            url: 'http://192.168.18.52:9996/base/sqjw/dynamic/list',
            params: {},
            networkOpt: {processable: false, mock: 'SQJW_TEST_DYNAMIC_ME'},
            callback: entity => {
                if(entity.flag !== 1 || !entity.result) return false;
                this.getContext().defRefs['post'].innerText = entity.result.post;
                this.getContext().defRefs['fans'].innerText = entity.result.fans;
                this.getContext().defRefs['follow'].innerText = entity.result.follow;
            }
        });
    }

    onListClick(itemData, component, checked, itemID) {
        this.go('/dynamic/detail/info', {
            systemId: itemID, user: itemData.user, publishTime: itemData.publishTime, publishFrom: itemData.publishFrom
        });
    }

    onDown(e) {
        this.getContext().defRefs['myList'].reset([], () => {
            this.query();
        });
    }

    onUp(e) {
        this.query();
    }
}