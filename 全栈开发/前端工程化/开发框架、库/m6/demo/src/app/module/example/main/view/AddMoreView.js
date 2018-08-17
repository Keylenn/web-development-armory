/**
 * Created by xiechunming on 2017/12/19.
 */

import React from 'react';
import M6Core from 'm6-core'; // eslint-disable-line

const { Root, Body, Header, NavBtn, Div, Search, Icon, Img, List, ListItem } = M6Core.Components;

@M6Core.Connect
export default class AddMoreView extends M6Core.View {
    constructor(props) {
        super(props);
        this.toBind('onSearch');
    }

    planToDidMount() {
        super.planToDidMount();
        console.log(this.getBundle());
    }

    onSearch(v) {
        console.log('查找内容:' + v);
    }

    render() {
        return (<Root host={this} >
            <Header title={<span style={{color: '#555555'}} >应用商城</span>} style={{background: '#fff'}} >
                <NavBtn left style={{color: '#555555'}} title="返回" onClick={this.goBack} />
            </Header>
            <Body style={{background: '#fff'}} >
                <Search placeholder="工具 / 游戏 / 聊天" onSearch={this.onSearch} />
                <div>
                    <p style={{lineHeight: '2rem', padding: '0 1rem'}} >
                        <Icon id6="search" style={{marginRight: '1rem'}} />
                        <span style={{fontSize: '0.95rem'}} >大家都在搜</span>
                    </p>
                    <div style={{fontSize: '0.9rem', padding: '0 1rem'}} >
                        <span style={{border: '1px solid #eee', margin: '0.2em 0.5em', padding: '0.2em 0.5em', color: '#999'}} >综合查询</span>
                        <span style={{border: '1px solid #eee', margin: '0.2em 0.5em', padding: '0.2em 0.5em', color: '#999'}} >移动办案</span>
                        <span style={{border: '1px solid #eee', margin: '0.2em 0.5em', padding: '0.2em 0.5em', color: '#999'}} >即时通讯</span>
                        <span style={{border: '1px solid #eee', margin: '0.2em 0.5em', padding: '0.2em 0.5em', color: '#999'}} >社区</span>
                    </div>
                </div>
                <p style={{minHeight: '0.5em', marginTop: '0.5em', background: '#f8f8f8'}} />
                <List name="appList" >
                    <ListItem key={0} itemData={{mode: 2, uri: 'http://sqjw.gdga.gov.cn:4080'}} >
                        <Div style={{display: 'flex', background: '#fff', padding: '0.5rem'}}>
                            <Div vesselValidation style={{width: '4rem', marginLeft: '0.5em'}} >
                                <Img src="http://img1.gtimg.com/www/pics/hv1/125/64/1857/120767870.png"
                                     mode={2} zoomable={false} colSize={7} />
                            </Div>
                            <Div vesselValidation style={{position: 'relative', flex: 1, padding: '0 0.5rem', overflow: 'hidden'}} >
                                <p style={{padding: '0 0.5em', fontWeight: 'bold'}} >广东社区警务</p>
                                <div style={{fontSize: 'smaller', marginTop: '0.2rem', color: '#888'}}>
                                    <span style={{margin: '0 0.5rem', fontSize: 'smaller'}}>服务</span>
                                </div>
                                <Icon id6="cloud-d" size={32} className="m6-center-vertical"
                                      style={{position: 'absolute', right: '0.7rem', bottom: '0.5rem'}} />
                            </Div>
                        </Div>
                    </ListItem>
                    <ListItem key={1} itemData={{mode: 2, uri: 'https://m.baidu.com/'}} >
                        <Div style={{display: 'flex', background: '#fff', padding: '0.5rem'}}>
                            <Div vesselValidation style={{width: '4rem', marginLeft: '0.5em'}} >
                                <Img src="http://mat1.gtimg.com/www/webapp/appimg/shoujibaidu.png"
                                     mode={2} zoomable={false} colSize={7} />
                            </Div>
                            <Div vesselValidation style={{position: 'relative', flex: 1, padding: '0 0.5rem', overflow: 'hidden'}} >
                                <p style={{padding: '0 0.5em', fontWeight: 'bold'}} >手机百度</p>
                                <div style={{fontSize: 'smaller', marginTop: '0.2rem', color: '#888'}}>
                                    <span style={{margin: '0 0.5rem', fontSize: 'smaller'}}>服务</span>
                                </div>
                                <Icon id6="cloud-d" size={32} className="m6-center-vertical"
                                      style={{position: 'absolute', right: '0.7rem', bottom: '0.5rem'}} />
                            </Div>
                        </Div>
                    </ListItem>
                    <ListItem key={2} itemData={{mode: 1, uri: 'https://m.y.qq.com/'}} >
                        <Div style={{display: 'flex', background: '#fff', padding: '0.5rem'}}>
                            <Div vesselValidation style={{width: '4rem', marginLeft: '0.5em'}} >
                                <Img src="http://img1.gtimg.com/www/pics/hv1/30/140/1482/96402780.png"
                                     mode={2} zoomable={false} colSize={7} />
                            </Div>
                            <Div vesselValidation style={{position: 'relative', flex: 1, padding: '0 0.5rem', overflow: 'hidden'}} >
                                <p style={{padding: '0 0.5em', fontWeight: 'bold'}} >QQ浏览器</p>
                                <div style={{fontSize: 'smaller', marginTop: '0.2rem', color: '#888'}}>
                                    <span style={{margin: '0 0.5rem', fontSize: 'smaller'}}>本地应用</span>
                                    <span style={{margin: '0 0.5rem', fontSize: 'smaller', color: '#3D90F6'}}>14.2M</span>
                                </div>
                                <Icon id6="download-d" size={32} className="m6-center-vertical"
                                      style={{position: 'absolute', right: '0.7rem', bottom: '0.5rem'}} />
                            </Div>
                        </Div>
                    </ListItem>
                    <ListItem key={3} itemData={{mode: 2, uri: 'https://m.y.qq.com/'}} >
                        <Div style={{display: 'flex', background: '#fff', padding: '0.5rem'}}>
                            <Div vesselValidation style={{width: '4rem', marginLeft: '0.5em'}} >
                                <Img src="http://img1.gtimg.com/www/pics/hv1/144/227/1857/120809454.png"
                                     mode={2} zoomable={false} colSize={7} />
                            </Div>
                            <Div vesselValidation style={{position: 'relative', flex: 1, padding: '0 0.5rem', overflow: 'hidden'}} >
                                <p style={{padding: '0 0.5em', fontWeight: 'bold'}} >QQ音乐</p>
                                <div style={{fontSize: 'smaller', marginTop: '0.2rem', color: '#888'}}>
                                    <span style={{margin: '0 0.5rem', fontSize: 'smaller'}}>服务</span>
                                </div>
                                <Icon id6="cloud-d" size={32} className="m6-center-vertical"
                                      style={{position: 'absolute', right: '0.7rem', bottom: '0.5rem'}} />
                            </Div>
                        </Div>
                    </ListItem>
                    <ListItem key={4} itemData={{mode: 1, uri: 'https://m.y.qq.com/'}} >
                        <Div style={{display: 'flex', background: '#fff', padding: '0.5rem'}}>
                            <Div vesselValidation style={{width: '4rem', marginLeft: '0.5em'}} >
                                <Img src="http://mat1.gtimg.com/joke/webapp/img/0009.gif"
                                     mode={2} zoomable={false} colSize={7} />
                            </Div>
                            <Div vesselValidation style={{position: 'relative', flex: 1, padding: '0 0.5rem', overflow: 'hidden'}} >
                                <p style={{padding: '0 0.5em', fontWeight: 'bold'}} >电影票</p>
                                <div style={{fontSize: 'smaller', marginTop: '0.2rem', color: '#888'}}>
                                    <span style={{margin: '0 0.5rem', fontSize: 'smaller'}}>本地应用</span>
                                    <span style={{margin: '0 0.5rem', fontSize: 'smaller', color: '#3D90F6'}}>6.3M</span>
                                </div>
                                <Icon id6="download-d" size={32} className="m6-center-vertical"
                                      style={{position: 'absolute', right: '0.7rem', bottom: '0.5rem'}} />
                            </Div>
                        </Div>
                    </ListItem>
                    <ListItem key={5} itemData={{mode: 1, uri: 'https://m.y.qq.com/'}} >
                        <Div style={{display: 'flex', background: '#fff', padding: '0.5rem'}}>
                            <Div vesselValidation style={{width: '4rem', marginLeft: '0.5em'}} >
                                <Img src="http://softfile.3g.qq.com:8080/msoft/appstore/logo/327703_100x100.jpg"
                                     mode={2} zoomable={false} colSize={7} />
                            </Div>
                            <Div vesselValidation style={{position: 'relative', flex: 1, padding: '0 0.5rem', overflow: 'hidden'}} >
                                <p style={{padding: '0 0.5em', fontWeight: 'bold'}} >三国来了</p>
                                <div style={{fontSize: 'smaller', marginTop: '0.2rem', color: '#888'}}>
                                    <span style={{margin: '0 0.5rem', fontSize: 'smaller'}}>本地应用</span>
                                    <span style={{margin: '0 0.5rem', fontSize: 'smaller', color: '#3D90F6'}}>37.7M</span>
                                </div>
                                <Icon id6="download-d" size={32} className="m6-center-vertical"
                                      style={{position: 'absolute', right: '0.7rem', bottom: '0.5rem'}} />
                            </Div>
                        </Div>
                    </ListItem>
                </List>
            </Body>
        </Root>);
    }
}