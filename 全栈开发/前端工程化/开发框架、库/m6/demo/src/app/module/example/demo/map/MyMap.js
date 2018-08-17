/**
 * Created by xiechunming on 2018/03/02.
 */

import React from 'react';
import M6Core from 'm6-core'; // eslint-disable-line

const { Root, Body, Header, Button, Div, Map, Search, List, ListItem, Img, Visible, Icon} = M6Core.Components;

@M6Core.Connect
export default class MyMap extends M6Core.View {
    constructor(props) {
        super(props);
        this.toBind('toggleCondition', 'onLocationResult', 'onItemClick');
    }

    planToDidMount() {
        super.planToDidMount();
        this.defRefs['openLayers'].getMap(() => {
            let longitude = this.getBundle().longitude || 113.36725833333334, latitude = this.getBundle().latitude || 23.128685000000004;
            new window.ol.Map({
                // 设置地图图层
                layers: [
                    // 创建一个使用Open Street Map地图源的瓦片图层
                    new window.ol.layer.Tile({source: new window.ol.source.OSM()})
                ],
                // 设置显示地图的视图
                view: new window.ol.View({
                    center: window.ol.proj.transform([longitude, latitude], 'EPSG:4326', 'EPSG:3857'),
                    zoom: 14
                }),
                target: 'myMap'
            });
        });
    }

    toggleCondition() {
        let flag = this.getViewStyle().condition === undefined ? true : this.getViewStyle().condition;
        this.setViewStyle({condition: !flag});
    }

    onLocationResult() {
        this.goBack();
    }

    onItemClick(listData) {
        this.goBack(listData);
    }

    render() {
        return (<Root host={this}>
            <Header title="地图演示" float transparent />
            <Body>
                <Map id="myMap" ref={this.regDef('openLayers')} height={`${Math.floor(window.M6.getViewPort().height * 0.95)}px`}
                     srcKey={{
                         src: 'https://cdn.bootcss.com/openlayers/4.6.5/ol.js',
                         css: 'https://cdn.bootcss.com/openlayers/4.6.5/ol.css',
                         test: 'window.ol && window.ol.Map',
                     }}
                />
                <Div style={{position: 'absolute', bottom: 0, left: 0, right: 0, background: '#fefefe', borderTopLeftRadius: '1.5rem', borderTopRightRadius: '1.5rem'}}>
                    <Div className="m6-center-horizontal">
                        <Icon id6="arrow-up" size={24} onClick={this.toggleCondition} />
                    </Div>
                    <Search placeholder="搜索地点或者地址" />
                    <Visible visible={this.getViewStyle().condition}>
                        <List onItemClick={this.onItemClick}>
                            <ListItem key={0} itemData={{longitude: 113.36725833333334, latitude: 23.128685000000004, location: '天河区科韵路12号'}} >
                                <Div style={{display: 'flex', background: '#fff', padding: '0.5rem'}}>
                                    <Div vesselValidation style={{width: '3rem'}} >
                                        <Img src="http://i5.esfimg.com/imp/50a63ab3f8454ff30afa314422af2e27_s400X250_os88b9ec.jpg"
                                             mode={2} zoomable={false} colSize={8} />
                                    </Div>
                                    <Div vesselValidation style={{flex: 1, padding: '0 1rem'}} >
                                        <div style={{fontWeight: 'bold', color: '#454545'}} >方圆E时光</div>
                                        <div style={{color: '#777777'}} >天河区科韵路12号</div>
                                    </Div>
                                </Div>
                            </ListItem>
                            <ListItem key={1} itemData={{longitude: 113.36725833333334, latitude: 23.128685000000004, location: '天河区建中路24号2层'}} >
                                <Div style={{display: 'flex', background: '#fff', padding: '0.5rem'}}>
                                    <Div vesselValidation style={{width: '3rem'}} >
                                        <Img src="https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/lbsugc/w%3D586%3Bc%3Dmap%2C85%2C85/sign=7c2f047ab28f8c54e3d3c5270c124ec8/9345d688d43f879477bc8abad41b0ef41ad53ae7.jpg"
                                             mode={2} zoomable={false} colSize={8} />
                                    </Div>
                                    <Div vesselValidation style={{flex: 1, padding: '0 1rem'}} >
                                        <div style={{fontWeight: 'bold', color: '#454545'}} >贝塔咖啡</div>
                                        <div style={{color: '#777777'}} >天河区建中路24号2层</div>
                                    </Div>
                                </Div>
                            </ListItem>
                            <ListItem key={2} itemData={{longitude: 113.36725833333334, latitude: 23.128685000000004, location: '天河区建中路12号'}}>
                                <Div style={{display: 'flex', background: '#fff', padding: '0.5rem'}}>
                                    <Div vesselValidation style={{width: '3rem'}} >
                                        <Img src="https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/map/pic/item/3ac79f3df8dcd1004059732b798b4710b8122ff7.jpg"
                                             mode={2} zoomable={false} colSize={8} />
                                    </Div>
                                    <Div vesselValidation style={{flex: 1, padding: '0 1rem'}} >
                                        <div style={{fontWeight: 'bold', color: '#454545'}} >广州华资软件技术有限公司</div>
                                        <div style={{color: '#777777'}} >天河区建中路12号</div>
                                    </Div>
                                </Div>
                            </ListItem>
                            <ListItem key={3} itemData={{longitude: 113.36725833333334, latitude: 23.128685000000004, location: '科韵路16号广州信息港D座1层'}}>
                                <Div style={{display: 'flex', background: '#fff', padding: '0.5rem'}}>
                                    <Div vesselValidation style={{width: '3rem'}} >
                                        <Img src="https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/map/pic/item/342ac65c10385343d4d783c39113b07eca808833.jpg"
                                             mode={2} zoomable={false} colSize={8} />
                                    </Div>
                                    <Div vesselValidation style={{flex: 1, padding: '0 1rem'}} >
                                        <div style={{fontWeight: 'bold', color: '#454545'}} >广州市天河区国家税务局</div>
                                        <div style={{color: '#777777'}} >科韵路16号广州信息港D座1层</div>
                                    </Div>
                                </Div>
                            </ListItem>
                        </List>
                    </Visible>
                    <Button title="返回" onClick={this.onLocationResult} />
                </Div>
            </Body>
        </Root>);
    }
}