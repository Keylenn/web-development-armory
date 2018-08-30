import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Demo, Demo1, Demo2, Demo3, Demo4, Demo5} from './hoc/stateless/View'
import {Demo6, Demo7, Demo8, Demo9} from './hoc/class/View'

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
      </article>
    </div>
  );
}

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
