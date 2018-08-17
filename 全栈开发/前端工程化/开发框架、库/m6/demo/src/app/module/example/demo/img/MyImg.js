/**
 * Created by xiechunming on 2017/08/29.
 */

import React from 'react';
import M6Core from 'm6-core'; // eslint-disable-line
const { Root, Body, Header, NavBtn, Button, Quote, Img, Progress, Div } = M6Core.Components;
import MyImgCtrl from "./MyImgCtrl";

@M6Core.Connect
export default class MyImg extends M6Core.View {

    constructor(props) {
        super(props, MyImgCtrl);
        this.toBind('selectImg', 'getImgs', 'onImgClick', 'onClick1');
    }

    selectImg() {
        this.defRefs.myImg.selectImg();
    }

    getImgs() {
        let base64es = this.defRefs.myImg.getData();
        console.log('当前照片数目', base64es.length);
    }

    onImgClick(index, src) {
        console.log('当前点击的图片下标', index);
        if(index === -1){
            console.log('当前点击的是默认图片');
        }
        //console.log('当前点击的图片src', src);
        return true; // 返回false的时候，不触发zoom放大方法
    }

    onClick1() {
        if(this.x) {
            this.setViewData({
                pl1: 0.68,
                pl2: 0.80,
                pl3: 0.20,
                pl4: 0.5,
                pc1: 0.68,
                pc2: 0.2,
                pc3: 0.9,
            });
        }else{
            this.setViewData({
                pl1: 0.18,
                pl2: 0.8,
                pl3: 0.80,
                pl4: 0.5,
                pc1: 0.15,
                pc2: 0.9,
                pc3: 0.2,
            });
        }
        this.x = !this.x;
    }

    render() {
        //src="http://scimg.jb51.net/allimg/170617/2-1F61G2163cD.gif"
        return (<Root host={this}>
            <Header title="Img演示">
                <NavBtn left title="返回" icon="arrow-left-f" onClick={this.goBack}/>
            </Header>
            <Body>
                <Div style={{minHeight: '4rem'}}/>


                    <Progress name="pl1" value={0.68} />
                    <Progress name="pl2" value={0.80} colors={['#7cb305', '#eeeeee']} />
                    <Progress name="pl3" value={0.20} colors={['#ff4d4f', '#eeeeee']} />
                    <Progress name="pl4" value={0.5} width="120px" height="24px" />
                    <Progress name="pl5" value={0.25} width="80px" height="24px" showNum="in" />

                    <Progress name="pc1" value={0.68} width="80px" type="circle" />
                    <Progress name="pc2" value={0.2} width="100px" type="circle" colors={['#7cb305', '#eeeeee']} />
                    <Progress name="pc3" value={0.9} width="120px" type="circle" colors={['#ff4d4f', '#eeeeee']} />




                <div style={{minHeight: '4rem'}}/>
                <Button title="设置" onClick={this.onClick1} />
                <Quote title="模式1" >
                    <Img ref={this.regDef('myImg')} selectable onItemClick={this.onImgClick} />
                </Quote>
                <Quote title="模式2" >
                    <Img mode={2} selectable src={[
                        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2450994032,3525797548&fm=27&gp=0.jpg',
                        'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1018364764,1223529536&fm=27&gp=0.jpg',
                        'http://as.ss.com'
                    ]} colSize={6} errorSrc="./image/image_no.png" />
                </Quote>
            </Body>
        </Root>);
    }
}