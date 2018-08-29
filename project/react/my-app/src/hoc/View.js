import React from 'react'
import {withHeader, withDynamicTitleHeader, withPropertyAgency}  from './HoC'


const Demo01 = () => <div>content-Demo01</div>
const Demo01withHeader = withHeader(Demo01);

const Demo02 = () => <div>content-Demo02</div>
const Demo02withDynamicTitleHeader = withDynamicTitleHeader('动态标题')(Demo02);

const Demo03 = () => <div>content-Demo03</div>
const Demo03withPropertyAgency = withPropertyAgency(Demo03)




export {Demo01withHeader, Demo02withDynamicTitleHeader, Demo03withPropertyAgency};

