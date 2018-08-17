/**
 * Created by xiechunming on 2017/06/19.
 */

import React from 'react';
import M6Core from 'm6-core'; // eslint-disable-line

const { Root, Body, Header, NavBtn, Form, Lake, Buttons, Button, Img, DateTime, Signature, Div} = M6Core.Components;

@M6Core.Connect
export default class MyPopup extends M6Core.View {

    constructor(props) {
        super(props);
        this.toBind('toast', 'dialogDefault', 'alert', 'goMyBack','Signature','getSign', 'popover');
        this.toastIndex = 0;
    }

    planToDidMount() {
        super.planToDidMount();
        // 获取路由跳转带来的参数集
        console.log(this.getBundle());
    }

    toast() {
        this.toastIndex += 1;
        M6Core.Popup.show(this, 'toast', '我是一只小毛驴'+this.toastIndex, 2000);
    }
    dialogDefault() {
        M6Core.Popup.show(this, 'child', <Div>
            <Form name="abc" >
                <Img src="https://images.apple.com/v/iphone-x/e/images/overview/modal/dual_cameras_photos_taken_large.jpg" />
                <Lake name="sex" title="性别" />
                <DateTime name="lrsj" title="流入时间" now />
            </Form>
            <Button title="弹出Alert" onClick={this.alert} />
        </Div>, {
            nightCall: data => console.log(data)
        });
    }
    alert() {
        console.log(this.getViewData());
        M6Core.Popup.show(
            this, 'alert',
            <div>234234</div>
        );
    }

    Signature() {
        M6Core.Popup.show(
            this, 'alert',
            <Signature callback={this.getSign}/>,
            {
                showClose: true,
                style:{width:"90%"}
            }
        );
    }

    getSign(src){
        this.defRefs.img.addImage(src);
    }

    goMyBack() {
        // 这里可以收集或者处理好回退页面的时候，传递的参数，当然也可以进行上个页面路由参数的修改或者移除
        let xData = {sfzh: '440102199304056789'};
        this.goBack(xData);
    }

    popover(e) {
        //console.log(e.clientX, e.clientY);
        M6Core.Popup.show(e, 'popover', <ul style={{lineHeight: '1.8rem', color: '#666'}} >
            <li style={{borderBottom: '1px solid #ddd'}} >人人网</li>
            <li style={{borderBottom: '1px solid #ddd'}} >QQ</li>
            <li style={{borderBottom: '1px solid #ddd'}} >谷歌</li>
            <li style={{borderBottom: '1px solid #ddd'}} >魔笛丝</li>
            <li style={{borderBottom: '1px solid #ddd'}} >微博</li>
            <li>自定义模式</li>
        </ul>);
        // 触发关闭的话，请使用 M6Core.Popup.dismiss(this, 'popover');
    }

    render() {
        return (<Root host={this} >
            <Header title="Popup演示" >
                <NavBtn left title="返回" icon="arrow-left-f" onClick={this.goMyBack} />
                <NavBtn right title="保存" onClick={this.popover} />
            </Header>
            <Body>
                <Buttons>
                    <Button title="Toast" onClick={this.toast} />
                    <Button title="Dialog" onClick={this.dialogDefault} />
                    <Button title="Signature" onClick={this.Signature} />
                </Buttons>
                <Buttons>
                    <Button title="Alert" onClick={this.alert} />
                    <Button title="Popover" onClick={this.popover} />
                </Buttons>

                <span style={{position: 'absolute', zIndex: '1', top: '150px', left: '50px', background: 'gray'}} onClick={this.popover} >顶部左侧</span>
                <span style={{position: 'absolute', zIndex: '1', top: '150px', right: '50px', background: 'gray'}} onClick={this.popover} >顶部右侧</span>
                <span style={{position: 'absolute', zIndex: '1', bottom: '20px', left: '50px', background: 'gray'}} onClick={this.popover} >底部左侧</span>
                <span style={{position: 'absolute', zIndex: '1', bottom: '20px', right: '50px', background: 'gray'}} onClick={this.popover} >底部右侧</span>
            </Body>
            <Img ref={this.regDef('img')} />
        </Root>);
    }
}