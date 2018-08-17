import React from 'react';
import M6Core from 'm6-core'; // eslint-disable-line

const { ListItem, Img } = M6Core.Components;

export default class DetailCtrl extends M6Core.Controller {
    constructor(props) {
        super(props);
    }

    didMount() {
        if(this.getContext().getViewData().content !== undefined && this.getContext().getViewData().content.length > 0)
            return;
        M6Core.Fetch({
            url: 'http://192.168.18.52:9996/base/sqjw/dynamic/list',
            params: {},
            networkOpt: {processable: true, mock: 'SQJW_TEST_DYNAMIC_DETAIL'},
            callback: entity => {
                if(entity.flag !== 1 || !entity.result) return false;
                let content = [], imagesLength = entity.result['images'].length, presLength = entity.result['pres'].length;
                entity.result['texts'].forEach((text, i) => {
                    content.push(<ListItem key={i} style={{borderTop: 'none'}}>
                        {i < imagesLength ? <Img key={`img-${i}`} src={entity.result['images'][i]}/> : undefined}
                        <p key={`p-${i}`} className="dynamic-detail-margin">{text}</p>
                        {i < presLength ? <blockquote key={`pre-${i}`} className="dynamic-detail-margin">{entity.result['pres'][i]}</blockquote> : undefined}
                    </ListItem>);
                });
                this.getContext().defRefs['content'].add(content);
            }
        });
    }
}