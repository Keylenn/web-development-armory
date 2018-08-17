/**
 * Created by xiechunming on 2017/09/15.
 */

import React from 'react';
import M6Core from 'm6-core'; // eslint-disable-line

const { BoxCell, BoxCellLabel, BoxCellIcon, Quote, Div } = M6Core.Components;

export default class CommunityCtrl extends M6Core.Controller {

    constructor(context, config) {
        super(context, config);
        this.entrance = require('../json/entrance.json');
    }

    didMount() {
        this.links = [];
        this.entrance.forEach((demo, i) => {
            let fnc = () => this.go(demo.route, {a: i});
            this.links.push(<BoxCell key={i} onClick={fnc} width={0.2} >
                <BoxCellIcon src={demo.src} />
                <BoxCellLabel title={demo.title} />
            </BoxCell>);
        });
        this.getContext().setMyState({entrance: this.links});
        this.getFuncModule();

        // 获取首页图片
        // M6Core.Fetch({
        //     url: 'http://192.168.18.52:9996/base/sqjw/main/banner',
        //     networkOpt: {mock: 'SQJW_TEST_WELCOME_BANNER', mockDelay: 500},
        //     callback: entity => {
        //         if(entity.flag === 1 && entity.result){
        //             this.getContext().defRefs['banner'].addImage(...entity.result['banners']);
        //         }
        //     }
        // });

    }

    /**
     * 通过区域动态过滤权限载入该区域功能入口
     * @param dept
     */
    getFuncModule(dept = '4401') {
        M6Core.Fetch({
            url: 'http://192.168.18.52:9996/base/sqjw/main/authority',
            networkOpt: {
                mock: 'SQJW_TEST_MAIN_AUTHORITY',
                mockDelay: 500
            },
            callback: entity => {
                if(entity.flag !== 1 || !entity.result) return;
                if(!entity.result.allow) return;
                let entrances = [];
                entity.result.entrance.forEach((e, k0) => {
                    if(e.type === 1){
                        entrances.push(<Quote key={k0} title={e.title} fixed className="m6-an-dialog-in" >
                            <Div className="main-content-1">
                                {e.items.map((i, k1) => {
                                    return (<div key={k1} className="main-content-1-i">
                                        <div className="main-content-1-t">{i.title}</div>
                                        <div className="main-content-1-n">{i.total}</div>
                                    </div>);
                                })}
                            </Div>
                            <div className="main-content-tips">{e.tips}</div>
                        </Quote>);
                    }else if(e.type === 2){
                        entrances.push(<Quote key={k0} title={e.title} fixed className="m6-an-dialog-in" >
                            <Div className="main-content-2">
                                {e.items.map((i, k1) => {
                                    return (<div key={k1} className="main-content-2-i">{i.title}</div>);
                                })}
                            </Div>
                            <div className="main-content-tips">{e.tips}</div>
                        </Quote>);
                    }
                });
                this.getContext().setViewStyle({entrances});
            }
        });
    }

    getChart() {
        window.M6.loadJS({
            url: 'https://gw.alipayobjects.com/os/antv/assets/f2/3.1.2/f2.js',
            success: () => {
                const data = [
                    { genre: '人员', sold: 13 },
                    { genre: '单位', sold: 32 },
                    { genre: '巡逻', sold: 8 },
                    { genre: '地址', sold: 46 },
                    { genre: '抓捕', sold: 29 },
                ];
                const chart = new window.F2.Chart({
                    id: 'f2Container', // 指定图表容器 ID
                    pixelRatio: window.devicePixelRatio,
                });
                chart.source(data);
                chart.interval().position('genre*sold').color('genre');
                chart.render();
            },
            test: 'window.F2 && window.F2.Chart'
        });
    }

}