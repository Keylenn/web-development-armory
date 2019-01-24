import React,{Component} from 'react'
import {EnhanceWrapper, EnhanceWrapper1, EnhanceWrapper2,
        EnhanceWrapper3, EnhanceWrapper4, EnhanceWrapper5,
        EnhanceWrapper6}  from './HoC'

//功能1：原组件是被包裹的
let Demo6 = (props) => <div>Demo6_content--->原组件是被包裹的</div>
Demo6 = EnhanceWrapper(Demo6)

//功能2:取到或操作原组件的props
let Demo7 = (props) => {
  console.log(props)
  const {name, age, sex} = props
  return <div>Demo7_content_props---> {`name: ${name},age: ${age},sex: ${sex}`}</div>
}
Demo7 = EnhanceWrapper1(Demo7)

//功能3：高阶组件取到或操作原组件的state
class Demo8 extends Component{
  constructor() {
    super()
    this.state = {name: 'demo8'}
  }
  handleClickOnButton() {
    const newName = this.props.changeWrappedComponentState(this.state.name)
    this.setState({name: newName})
  }
  render() {
    return (
      <div>
        <div>Demo8_content---> {`changeSelfStateName: ${this.state.name}`}</div>
        <button onClick = {this.handleClickOnButton.bind(this)} >点击我通过高阶组件改变原组件state的值</button>
    </div>
    )
  }
}
Demo8 = EnhanceWrapper2(Demo8)

//功能4：通过ref访问到原组件中的dom元素
class Demo9 extends Component {
  handleClickOnButton() {
    this.props.getWrappedComponentRef(this.input)
  }
  render() {
    return (
      <div>
        Demo9_content--->
        <input ref = {(input) => this.input = input} style= {{marginRight: '20px'}}/>
        <button onClick = {this.handleClickOnButton.bind(this)} >点击我通过高阶组件让input聚焦</button>
      </div>
    )
  }
}
Demo9 = EnhanceWrapper3(Demo9)

//功能5：影响原组件生命周期等方法
class Demo10 extends Component {
  componentWillReceiveProps(newProps) {
    if(this.props.effect !== newProps.effect){
      console.log(`oldProps: ${this.props.effect} ----- newProps.effect: ${newProps.effect}`)
    }
  }
  handleClickOnButton() {
    this.props.changeProps(this.props.effect)
  }
  render(){
    return (
      <div>
        <div>Demo10_content--->高阶组件影响原组件的生命周期</div>
        <button onClick = {this.handleClickOnButton.bind(this)} >点击我改变高阶组件传入的props</button>
      </div>
    )

  }
}
Demo10 = EnhanceWrapper4(Demo10)

//功能6：取到原组件static方法
class Demo11 extends Component {
  static sayHi = () => 'Hi! Demo11'
  render() {
    return (
      <div> Demo11_content_static---> EnhanceWrapper5(Demo11).sayHi</div>
    )
  }
}
console.log(Demo11.sayHi());
Demo11 = EnhanceWrapper5(Demo11)
console.log(Demo11.sayHi());

//功能8：渲染劫持
let Demo12 = (props) => {
  return <div style={props.WrappedComponentStyle}>Demo12_content_render--->changeStyle</div>
}
Demo12 = EnhanceWrapper6(Demo12)

export {Demo6, Demo7, Demo8, Demo9, Demo10, Demo11, Demo12}