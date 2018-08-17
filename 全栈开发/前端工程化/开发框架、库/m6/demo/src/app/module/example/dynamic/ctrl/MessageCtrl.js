import React from 'react';
import M6Core from 'm6-core'; // eslint-disable-line

const { ListItem } = M6Core.Components;

export default class MessageCtrl extends M6Core.Controller {
    constructor(props) {
        super(props, 'toSaySomething');
    }

    didMount() {
        if(this.getContext().getViewData().content !== undefined && this.getContext().getViewData().content.length > 0)
            return;
        M6Core.Fetch({
            url: 'http://192.168.18.52:9996/base/sqjw/dynamic/list',
            params: {},
            networkOpt: {processable: true, mock: 'SQJW_TEST_DYNAMIC_MSG'},
            callback: entity => {
                if(entity.flag !== 1 || !entity.result) return false;
                let content = [], curLength = this.getContext().defRefs['content'].getData().length;
                entity.result['list'].forEach((item, i) => {
                    content.push(<ListItem key={curLength + i} itemID={item.systemId} itemData={item} style={{borderTop: '0.5rem solid #f3f3f3'}}>
                        <div className="dynamic-list-item">
                            <div style={{position:'relative',minHeight: '2rem',borderBottom:'1px solid #f3f3f3'}} >
                                <span style={{position:'absolute',top:0, left:'1rem',display:'inline-block',lineHeight:'2rem',color:'#d46b08'}} >
                                    {item.user.name}
                                </span>
                                <span style={{position:'absolute',top:0, right:'1rem',display:'inline-block',lineHeight:'2rem',color:'#888',fontSize:'small'}} >
                                    {`${item.publishFrom} · ${item.publishTime}`}
                                </span>
                            </div>
                            <p style={{margin: '0.5rem 1rem'}}>{item.msg}</p>
                        </div>
                    </ListItem>);
                });
                this.getContext().defRefs['content'].add(content);
            }
        });
    }

    toSaySomething() {
        // 发布言论
    }
}