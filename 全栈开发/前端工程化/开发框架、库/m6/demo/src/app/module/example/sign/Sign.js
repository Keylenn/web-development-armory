/**
 * Created by xiechunming on 2018/01/18.
 */

import React from 'react';
import M6Core from 'm6-core'; // eslint-disable-line

const { Root, Body, Header, NavBtn, Form, Lake, Button, Exit, SecurityCode, Icon } = M6Core.Components;
import "./css/sign.scss";

@M6Core.Connect
export default class Sign extends M6Core.View {

    constructor(props) {
        super(props);
        this.toBind('signIn', 'vfCode');
    }

    signIn() {
        let userInfo = this.getViewData().mySign || {};
        /*if(!userInfo.code || userInfo.code !== userInfo._code){
            console.log(userInfo.code, userInfo._code);
            Popup.show(this, 'toast', '验证码错误!');
            return false;
        }*/
        M6Core.Fetch({
            url: 'http://192.168.18.52:9996/base/sqjw/sign/get',
            params: userInfo,
            networkOpt: {processable: true, mock: 'SQJW_TEST_SIGN'},
            callback: entity => {
                if(entity.flag === 1){
                    console.log('登陆验证通过', entity.result);
                    this.go('/main');
                }
            }
        });
    }

    vfCode() {
        this.__vfCode = this.__vfCode || {
            tip: '验证码错误',
            rule: v => {
                if(this.getViewData().mySign && v == this.getViewData().mySign._code)
                    return true;
                else return false;
            }
        };
        return this.__vfCode;
    }

    render() {
        return (<Root host={this} >
            <Header title={<span style={{color: '#555555'}} >登录</span>} fixed style={{background: 'transparent'}} >
                <NavBtn  title={<Exit title={<Icon id6="arrow-left"/>} />} />
            </Header>
            <Body className="m6-an-dialog-in">
                <Form name="mySign" className="sign-form">
                    <Lake name="userId" title="|" type="number" placeholder="请输入手机或邮箱" />
                    <Lake name="pwd" title="|" type="password" placeholder="密码" />
                    <Lake name="code" title="|" rule={[this.vfCode()]} placeholder="验证码"
                          rIcon={<SecurityCode name="_code" style={{borderLeft: '2px solid #eee', paddingLeft: '0.5rem'}} />}
                          inputStyle={{marginRight: '5rem'}} />
                </Form>
                <Button className="sign-btn" title="登录" onClick={this.signIn} />
            </Body>
            <div className="sign-color-bar" style={{background: "url(./image/color_bar.png) no-repeat 0 80px / cover"}}/>
        </Root>);
    }
}