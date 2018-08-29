import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Demo01withHeader,
        Demo02withDynamicTitleHeader,
        Demo03withPropertyAgency} from './hoc/View'

import registerServiceWorker from './registerServiceWorker';

const Index = () => {
  return (
    <div>
      <Demo01withHeader />
      <Demo02withDynamicTitleHeader />
      <Demo03withPropertyAgency />
    </div>
  );
}

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
