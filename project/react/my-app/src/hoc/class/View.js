import React,{Component} from 'react'
import {EnhanceWrapper, EnhanceWrapper1, EnhanceWrapper2, EnhanceWrapper3}  from './HoC'

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
    const newName = this.props.changeChildState(this.state.name)
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
    this.props.getChildRef(this.input)
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

export {Demo6, Demo7, Demo8, Demo9}