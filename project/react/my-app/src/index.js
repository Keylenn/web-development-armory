import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Demo, Demo1, Demo2, Demo3, Demo4, Demo5} from './hoc/realizationMode/returnStateless/View'
import {Demo6, Demo7, Demo8, Demo9, Demo10, Demo11, Demo12} from './hoc/realizationMode/returnClass/View'
import {Demo13, Demo14, Demo15, Demo16, Demo17, Demo18, Demo19, Demo20} from "./hoc/realizationMode/returnClassAfterExtends/View";

import registerServiceWorker from './registerServiceWorker';

const Index = () => {
  return (
    <div>
      <article style={{marginBottom: '50px'}}>
        <h3>方式1:直接返回一个stateless component</h3>
        <Demo />
        <Demo1 />
        <Demo2 />
        <Demo3 />
        <Demo4 />
        <Demo5 />
      </article>
      <article style={{marginBottom: '50px'}}>
        <h3>方式2:在新组件的render函数中返回一个新的class component</h3>
        <Demo6 />
        <Demo7 />
        <Demo8 />
        <Demo9 />
        <Demo10 />
        <Demo11 />
        <Demo12 />
      </article>
      <article style={{marginBottom: '50px'}}>
        <h3>方式3:继承（extends）原组件后返回一个新的class component</h3>
        <Demo13 />
        <Demo14 name = 'demo14' age={18} sex = '男'/>
        <Demo15 />
        <Demo16 />
        <Demo17 />
        <Demo18 />
        <Demo19 />
        <Demo20 />
      </article>
    </div>
  );
}

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
