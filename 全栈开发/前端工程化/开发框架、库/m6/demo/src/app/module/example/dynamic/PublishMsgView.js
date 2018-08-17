/**
 * Created by xiechunming on 2017/12/18.
 */

import React from 'react';
import M6Core from 'm6-core'; // eslint-disable-line

const { Root, Body, Header, NavBtn, Form, Icon, Img, Lake, Toggle, Div } = M6Core.Components;

@M6Core.Connect
export default class PublishMsgView extends M6Core.View {

    constructor(props) {
        super(props);
        this.toBind('textContentInput', 'textContentBlur', 'publishMsg', 'getLocation');
    }

    planToDidMount() {
        super.planToDidMount();
        console.log(this.getBundle());
    }

    textContentInput(e, v = '') {
        this.defRefs.limitFontSize.innerText = 150 - v.length;
    }

    textContentBlur(e, v = '') {
        this.defRefs.limitFontSize.innerText = 150 - v.length;
    }

    publishMsg() {
        this.go('http://192.168.18.52:9997/dist#/main', undefined, true);
    }

    getLocation() {
        this.go('/demo/map', {longitude: 113.36725833333334, latitude: 23.128685000000004});
    }

    render() {
        let _location = this.getBundle().state && this.getBundle().state.location ? this.getBundle().state.location : '所在位置';
        return (<Root host={this} >
            <Header style={{background: '#fafafa', color: '#444'}}>
                <NavBtn title="取消" left onClick={this.goBack} style={{color: '#666'}} />
                <NavBtn title="发表" right onClick={this.publishMsg} style={{color: '#666'}} />
            </Header>
            <Body>
                <span style={{display: 'block', minHeight: '10px'}} />
                <Form name="base" >
                    <Lake name="textContent" placeholder="这一刻的想法..." inputStyle={{minHeight: '4rem'}}
                          onInput={this.textContentInput} onBlur={this.textContentBlur} >
                        <Div style={{borderTop: '1px solid #f5f5f5'}} >
                            <Div style={{float: 'left', margin: '3px 1rem', color: '#bbb'}} >
                                剩余字数:
                                <span ref={this.regDef('limitFontSize')} style={{position: 'absolute', color: '#3D90F6', marginLeft: '0.5em'}} >150</span>
                            </Div>
                            <Div style={{float: 'right', margin: '3px 1rem'}} >
                                <span style={{position: 'absolute', right: '3.5em'}} >匿名</span>
                                <Toggle conditions={{false: 0, true: 1}} checked={false} />
                            </Div>
                        </Div>
                    </Lake>
                    <span style={{display: 'block', minHeight: '8px'}} />
                    <Img mode={2} selectable colSize={6} />
                    <span style={{display: 'block', minHeight: '8px'}} />
                    <Lake name="location" onClick={this.getLocation}
                          title={<span><Icon id6="location" style={{marginRight:'1em'}} />{_location}</span>}
                          rIcon="arrow-right" disabled />
                </Form>
                <span style={{display: 'block', minHeight: '10px'}} />
                <Form name="supplement" >
                    <Lake name="remind" className="lake-readOnly-normal" rIcon="arrow-right"
                          title={<span><Icon id6="dict" style={{marginRight:'1em'}} />谁可以看</span>}
                          inputStyle={{textAlign: 'right'}} disabled />
                    <Lake name="who" className="lake-readOnly-normal" rIcon="arrow-right"
                          title={<span><Icon id6="at" style={{marginRight:'1em'}} />提醒谁看</span>}
                          inputStyle={{textAlign: 'right'}} disabled />
                </Form>
                <span style={{display: 'block', minHeight: '20px'}} />
            </Body>
        </Root>);
    }
}