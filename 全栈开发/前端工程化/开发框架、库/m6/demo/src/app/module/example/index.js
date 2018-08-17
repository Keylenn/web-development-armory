/**
 * Created by xiechunming on 2017/09/15.
 */

import React from 'react';
import M6Core from 'm6-core'; // eslint-disable-line
const { Ro, Re } = M6Core.Router;

require('../../Environment')();

require.context('./asset/image');
require.context('./asset/mson');
require.context('./mock');

import SignView from "./sign/Sign";
import CommunityView from "./main/view/CommunityView";
import AddMoreView from "./main/view/AddMoreView";
import DynamicView from "./dynamic/DynamicView";
import DetailView from "./dynamic/DetailView";
import MessageView from "./dynamic/MessageView";
import PublishMsgView from "./dynamic/PublishMsgView";
import AboutView from "./about/AboutView";
import SysSetting from "../../SysSetting";
import MyShortcut from "./side/MyShortcut";

import Demo_Form from "./demo/form/view/MyForm2";
import Demo_Dictionary from "./demo/form/view/MyDictionary";
import Demo_Select from "./demo/form/view/MySelect";
import Demo_Table from "./demo/form/view/MyTable";
import Demo_Popup from "./demo/popup/MyPopup";
import Demo_Image from "./demo/img/MyImg";
import Demo_Schedule from "./demo/schedule/MySchedule";
import MyMap from "./demo/map/MyMap";

M6Core.Dom.render(<Ro index={SignView} tabBottom >
    <Ro path="/dynamic" title="动态" src="./image/dynamic.png" >
        <Re component={DynamicView} shortcut={{component: MyShortcut, width: 0.35, hidden: true, direction: "left"}} />
        <Re path="/publish" component={PublishMsgView} inheritTab={false} />
        <Ro path="/detail" tabTop inheritTab={false} tabState={{}} >
            <Re path="/info" title="内容" customTab component={DetailView} />
            <Re path="/message" title="评论 [62]" customTab component={MessageView} />
        </Ro>
    </Ro>
    <Ro path="/main" tabTop title="主页" src="./image/work.png" >
        <Re component={CommunityView} />
        <Re path="/addMore" component={AddMoreView} inheritTab={false} />
    </Ro>
    <Re path="/about" component={AboutView} title="我" src="./image/me.png" />
    <Re path="/setting" component={SysSetting} mProps={{theme: {css:'example.css', title: '业务主题'}}} />
    <Ro path="/demo" >
        <Re path="/form" component={Demo_Form} />
        <Re path="/dictionary" component={Demo_Dictionary} />
        <Re path="/select" component={Demo_Select} />
        <Re path="/table" component={Demo_Table} />
        <Re path="/popup" component={Demo_Popup} />
        <Re path="/image" component={Demo_Image} />
        <Re path="/schedule" component={Demo_Schedule} />
        <Re path="/map" component={MyMap} />
    </Ro>
</Ro>, document.getElementById('root'));