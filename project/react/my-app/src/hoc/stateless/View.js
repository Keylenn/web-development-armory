import React,{Component} from 'react'
import {EnhanceWrapper, EnhanceWrapper1, EnhanceWrapper2, EnhanceWrapper3, EnhanceWrapper4, EnhanceWrapper5}  from './HoC'

//功能1：原组件是被包裹的
let Demo = (props) => <div>Demo_content--->原组件是被包裹的</div>
Demo = EnhanceWrapper(Demo)

//功能2:取到或操作原组件的props
let Demo1 = (props) => {
  console.log(props)
  const {name, age, sex} = props
  return <div>Demo1_content_props---> {`name: ${name},age: ${age},sex: ${sex}`}</div>
}
Demo1 = EnhanceWrapper1(Demo1)

//功能3：高阶组件取到或操作原组件的state
class Demo2 extends Component{
  constructor() {
    super()
    this.state = {name: 'demo2'}
  }
  handleClickOnButton() {
    const newName = this.props.changeChildState(this.state.name)
    this.setState({name: newName})
  }
  render() {
    return (
      <div>
        <div>Demo2_content---> {`changeSelfStateName: ${this.state.name}`}</div>
        <button onClick = {this.handleClickOnButton.bind(this)} >点击我通过高阶组件改变原组件state的值</button>
      </div>
  )
  }
}
Demo2 = EnhanceWrapper2(Demo2)

//功能4：通过ref访问到原组件中的dom元素
class Demo3 extends Component {
  handleClickOnButton() {
    this.props.getChildRef(this.input)
  }
  render() {
    return (
      <div>
        Demo3_content--->
        <input ref = {(input) => this.input = input} style= {{marginRight: '20px'}}/>
        <button onClick = {this.handleClickOnButton.bind(this)} >点击我通过高阶组件让input聚焦</button>
      </div>
    )
  }
}
Demo3 = EnhanceWrapper3(Demo3)

//功能6：取到原组件static方法
class Demo4 extends Component {
  static sayHi = () => 'Hi! Demo'
  render() {
    return (
      <div> Demo4_content_static---> EnhanceWrapper4(Demo4).sayHi</div>
    )
  }
}
console.log(Demo4.sayHi());
Demo4 = EnhanceWrapper4(Demo4)
console.log(Demo4.sayHi());

//功能8：渲染劫持
let Demo5 = (props) => {
  return <div style={props.childStyle}>Demo5_content_render--->changeStyle</div>
}
Demo5 = EnhanceWrapper5(Demo5)

export {Demo, Demo1, Demo2, Demo3, Demo4, Demo5};

