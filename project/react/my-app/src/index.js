import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Demo, Demo1, Demo2, Demo3, Demo4, Demo5} from './hoc/stateless/View'

import registerServiceWorker from './registerServiceWorker';

const Index = () => {
  return (
    <div>
      <Demo />
      <Demo1 />
      <Demo2 />
      <Demo3 />
      <Demo4 />
      <Demo5 />
    </div>
  );
}

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
