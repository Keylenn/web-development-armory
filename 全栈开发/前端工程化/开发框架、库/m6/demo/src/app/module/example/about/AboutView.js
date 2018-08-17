/**
 * Created by xiechunming on 2017/09/15.
 */

import React from 'react';
import M6Core from 'm6-core'; // eslint-disable-line
const { Root, Body, Header, Div, NavBtn, Form, Lake, Exit } = M6Core.Components;

@M6Core.Connect
export default class AboutView extends M6Core.View {

    constructor(props) {
        super(props);
        this.toBind('goToSys');
    }

    goToSys() {
        this.go('/setting');
    }

    render() {
        return (<Root host={this} >
            <Header transparent >
                <NavBtn title={<Exit title="注销" />} />
                <NavBtn right icon="setting-f" onClick={this.goToSys} />
            </Header>
            <Body>
                <div style={{position: 'fixed', top: 0, left: 0, right: 0,
                    height: '40%', background: 'url(./image/Playing.jpg) 0 0 no-repeat / cover'}} >
                    <div style={{height: '100%',
                        background:'linear-gradient(to top, rgba(254,254,254,1.0),rgba(254,254,254,0.5),rgba(254,254,254,0))'}}/>
                </div>
                <Div style={{padding: '0.5rem', marginTop: '35%'}} >
                    <Form name="about1" style={{borderRadius: '0.5rem 0.5rem 0 0'}} ignoreDataLevel >
                        <Lake name="myMsg" title="我的消息" placeholder="批量 / 跟帖" rIcon="arrow-right" disabled />
                        <Lake name="myFocus" title="我的关注" rIcon="arrow-right" disabled />
                        <Lake name="myTask" title="我的任务" rIcon="arrow-right" disabled />
                        <Lake name="myTrajectory " title="我的轨迹" placeholder="定位历史" rIcon="arrow-right" disabled style={{borderBottom: 'none'}} />
                    </Form>
                    <p style={{minHeight: '1em'}} />
                    <Form name="settingOther" style={{borderRadius: '0 0 0.5rem 0.5rem'}} ignoreDataLevel >
                        <Lake title="更新" className="lake-readOnly-normal" disabled
                              inputStyle={{textAlign: 'right', marginRight: '1.5rem'}} value={`v${window.M6.BCFG.version}`} />
                        <Lake title="关于" className="lake-readOnly-normal" rIcon="arrow-right" disabled style={{borderBottom: 'none'}} />
                    </Form>
                </Div>
            </Body>
        </Root>);
    }
}