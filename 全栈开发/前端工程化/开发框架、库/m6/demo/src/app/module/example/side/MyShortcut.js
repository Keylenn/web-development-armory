/**
 * Created by xiechunming on 2017/10/25.
 */

import React from 'react';
import M6Core from 'm6-core'; // eslint-disable-line

const { Div, Body, BoxCell, BoxCellLabel, BoxCellIcon, Button } = M6Core.Components;

export default class MyShortcut extends M6Core.View {

    constructor(props) {
        super(props);
        this.toBind('login', 'fuckTheBitch');
    }

    render() {
        return (<Div>
            <Body>
                <BoxCell width={1} >
                    <BoxCellIcon src="http://dwz.sh/My4sb" />
                    <BoxCellLabel title="消息" />
                </BoxCell>
                <BoxCell width={1} >
                    <BoxCellIcon src="http://dwz.sh/uaq6" />
                    <BoxCellLabel title="日程" />
                </BoxCell>
                <BoxCell width={1} >
                    <BoxCellIcon src="http://dwz.sh/Wljrl" />
                    <BoxCellLabel title="收藏" />
                </BoxCell>
                <BoxCell width={1} >
                    <BoxCellIcon src="http://dwz.sh/6tZN" />
                    <BoxCellLabel title="设置" />
                </BoxCell>
                <Button title="登录" onClick={this.login} style={{position: 'absolute', left: 0, right: 0, bottom: '1rem'}} />
            </Body>
        </Div>);
    }
}