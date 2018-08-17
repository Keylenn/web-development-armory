/**
 * Created by xiechunming on 2017/10/09.
 */

import React from 'react';
import PropTypes from 'prop-types';
import M6Core from 'm6-core'; // eslint-disable-line
const { Root, Body, Header, NavBtn, Quote, Form, Lake, List, ListItem, Buttons, Button, Toggle, Checkbox } = M6Core.Components;

@M6Core.Connect
export default class SysSetting extends M6Core.View {

    constructor(props) {
        super(props);
        this.toBind('reset', 'submit', '_themeModeClick', 'onListItemClick', 'openConsole');

        this.themes = [
            {css:'basic.css', title: '默认'},
            {css:'basic-dark.css', title: '深色系列'},
        ].concat(this.props.theme || []);
    }

    planToDidMount() {
        super.planToDidMount();
        let sysCfg = window.M6.getSysConfig();
        sysCfg = Object.assign(this.getDefConfig(), sysCfg);
        this.setViewData(sysCfg);
    }

    getDefConfig() {
        return {
            themeMode: '默认',
            _themeMode: 'basic.css',
            fontSize: 16,
            toastDisappeared: 2000,

            sessionLimit: 30,

            networkTimeout: 10000,
            networkThread: 5,
        };
    }

    reset() {
        this.setViewData(this.getDefConfig());
        this.submit();
    }

    submit(e, callback, component) {
        setTimeout(() => {
            let sysCfg = window.M6.getSysConfig();
            let viewData = this.getViewData();
            // 设置字体大小
            window.M6.setFontSize(viewData.fontSize);
            if(sysCfg._themeMode !== viewData._themeMode){
                window.M6.setSysConfig(viewData);
                let linkCss = document.getElementsByTagName('head').item(0).getElementsByTagName('link');
                linkCss.length > 0 && linkCss.item(linkCss.length - 1).setAttribute('href', './css/' + (viewData._themeMode || 'basic.css'));
                //window.location.reload(true); // 硬刷新
            }else window.M6.setSysConfig(viewData);
            callback(false);
        }, 2000);
    }

    _themeModeClick() {
        this.lastChecked = {};
        let _checkedData = this.getViewData()._themeMode;
        let _itemDefined = [<p key={-2} style={{lineHeight: '2em', background: '#f8f8f8', paddingLeft: '1em'}} >
            <span style={{fontSize: 'small', color: '#999'}} >主题主色系</span>
        </p>];
        this.themes.forEach((tm, i) => _itemDefined.push(
            <ListItem key={i} rIcon={['selected-1-d', 'selected-1']} rIconStyle={{padding: '0.3em 0.5rem'}}
                      itemData={tm} checked={_checkedData === tm.css} >
                <div className="word-break" style={{padding: '0.3em 0 0.3em 1rem'}} >{tm.title}</div>
            </ListItem>));
        _itemDefined.push(<p key={-1} style={{minHeight: '1em', background: '#f8f8f8'}} />);
        M6Core.Popup.show(this, 'child', <List name="themeModeList" host={this} onItemClick={this.onListItemClick} >
            {_itemDefined}
        </List>);
    }

    onListItemClick(data, listItem, checked) {
        if(this.classType(listItem) !== 2) return;
        if(listItem.props.listName === 'themeModeList'){
            M6Core.Popup.dismiss(this, 'child');
            if(checked){
                let vD = this.getViewData();
                vD.themeMode = data.title;
                vD._themeMode = data.css;
                this.setViewData(vD);
            }
        }
    }

    /** 开启软调试窗口 */
    openConsole() {
        this.setMyState({openConsole: 'loading'}, () => {
            window.M6.loadJS({
                url: './lib/vconsole.min.js',
                test: 'window.vConsole && window.vConsole.version',
                success: () => this.setMyState({openConsole: undefined})
            });
        });
    }

    render() {
        let openConsoleView;
        if(window.vConsole && window.vConsole.version){
            openConsoleView = (<span style={{color: '#dddddd'}}>已开启</span>);
        }else if(this.getMyState().openConsole){
            openConsoleView = 'loading';
        }else{
            openConsoleView = (<span style={{color: 'blue'}} onClick={this.openConsole}>开启</span>);
        }

        return (<Root host={this} >
            <Header title="参数设置" >
                <NavBtn left title="返回" icon="arrow-left" onClick={this.goBack} />
            </Header>
            <Body>
                <Quote title="主题" fixed >
                    <Form name="setting1" ignoreDataLevel >
                        <Lake name="themeMode" className="lake-readOnly-normal" title="样式" rIcon="arrow-right"
                              inputStyle={{textAlign: 'right', marginRight: '1.5rem'}} disabled onClick={this._themeModeClick} />
                        <Lake name="_fontSizeType" title="默认字号" inputStyle={{visibility: 'hidden'}}
                              rIcon={<Checkbox name="fontSize" style={{color: '#333333'}} conditions={[{title:'标准',code:16,default:true}, {title:'大',code:18}, {title:'加大',code:20}]} />} />
                        <Lake name="toastDisappeared" title="Toast自动消失" rIcon={<span style={{color: '#aaaaaa'}}>毫秒</span>}
                              inputStyle={{textAlign: 'right', marginRight: '2.5rem'}} />
                    </Form>
                </Quote>
                <Quote title="过程" fixed >
                    <Form name="setting2" ignoreDataLevel >
                        <Lake name="sessionLimit" title="Session有效期" rIcon={<span style={{color: '#aaaaaa'}}>分</span>}
                              inputStyle={{textAlign: 'right', marginRight: '1.5rem'}} />
                        <Lake name="_errorAlert" className="lake-readOnly-normal"
                              title="显示错误警告框" rIcon={<Toggle name="errorAlert" conditions={{false: false, true: true}} />}
                              inputStyle={{visibility: 'hidden'}} />
                        <Lake name="_openConsole" className="lake-readOnly-normal"
                              title="调试软控制台" rIcon={openConsoleView}
                              inputStyle={{visibility: 'hidden', marginRight: '3.5rem'}} />
                    </Form>
                </Quote>
                <Quote title="网络（生效需重启应用）" fixed >
                    <Form name="setting3" ignoreDataLevel >
                        <Lake name="_forceMock" className="lake-readOnly-normal"
                              title="强制Mock" rIcon={<Toggle name="forceMock" conditions={{false: false, true: true}} />}
                              inputStyle={{visibility: 'hidden'}} />
                        <Lake name="networkTimeout"
                              title="超时时间" rIcon={<span style={{color: '#aaaaaa'}}>毫秒</span>}
                              inputStyle={{textAlign: 'right', marginRight: '2.5rem'}} />
                        <Lake name="networkThread"
                              title="并发线程数" rIcon={<span style={{color: '#aaaaaa'}}>个</span>}
                              inputStyle={{textAlign: 'right', marginRight: '1.5rem'}} />
                    </Form>
                </Quote>
                <p style={{minHeight: '1em'}} />
                <Form name="settingOther" ignoreDataLevel >
                    <Lake name="aboutVersion" title="M6 内核版本" className="lake-readOnly-normal" disabled style={{borderBottom: 'none'}}
                          inputStyle={{textAlign: 'right', marginRight: '1.5rem'}} value={'v ' + window.M6.BCFG.env.version} />
                </Form>
                <Buttons>
                    <Button title="恢复重置" onClick={this.reset} />
                    <Button title="确认设置" process onClick={this.submit} />
                </Buttons>
            </Body>
        </Root>);
    }
}


SysSetting.propTypes = {
    ...SysSetting.propTypes,
    theme: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]), // 主题配置
};