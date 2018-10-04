/**
 *  const hello = require('./hello.js');
    document.querySelector("#root").appendChild(hello());
 */
import React from 'react';
import {render} from 'react-dom';
import Hello from './hello';
import './main.css';

render(<Hello />, document.getElementById('root'));

