import React, {Component} from 'react'
import {EnhanceWrapper, EnhanceWrapper1,EnhanceWrapper2, EnhanceWrapper3, EnhanceWrapper4, EnhanceWrapper5,
        EnhanceWrapper6, EnhanceWrapper7}  from './HoC'


//功能1：原组件是包裹高阶组件的
class Demo13 extends Component {
  render() {
    return (
      <div>Demo13_content--->原组件是包裹高阶组件的</div>
    )
  }
}
Demo13 = EnhanceWrapper(Demo13)

//功能2:取到或操作原组件的props
class Demo14 extends Component {
  render() {
    console.log(this)//WrappingComponent {props: {…}, context: undefined, refs: {…}, updater: {…}}
    console.log(this.props);
    const {name, age, sex} = this.props
    return <div>Demo14_content_props---> {`name: ${name},age: ${age},sex: ${sex}`}</div>
  }
}
Demo14 = EnhanceWrapper1(Demo14)

//功能3:高阶组件取到或操作原组件的state
class Demo15 extends Component{
  constructor() {
    super()
    this.state = {name: 'demo15'}

  }
  render() {
    return (
      <div>
        <div>Demo15_content---> {`高阶组件直接改变state--->${this.state.name}`}</div>
      </div>
    )
  }
}
Demo15 = EnhanceWrapper2(Demo15)

//功能4：通过ref访问到原组件中的dom元素
class Demo16 extends Component {
  handleClickOnButton() {
    this.props.getWrappedComponentRef(this.input)
  }
  render() {
    return (
      <div>
         Demo16_content--->高阶组件直接让input聚焦 &nbsp;&nbsp;
        <input ref = {(input) => this.input = input} style= {{marginRight: '20px'}}/>
      </div>
    )
  }
}
Demo16 = EnhanceWrapper3(Demo16)

//功能5：影响原组件生命周期等方法
class Demo17 extends Component {
  constructor(props){
    super(props)
    console.log('Demo17_constructor');
  }
  componentDidMount(){
    console.log('Demo17_componentDidMount');
  }
  render(){
    return (
      <div>
        <div>Demo17_content--->高阶组件直接覆盖原组件的生命周期</div>
      </div>
    )
  }
}
Demo17 = EnhanceWrapper4(Demo17)

//功能6：取到原组件static方法
class Demo18 extends Component {
  static sayHi = () => 'Hi! Demo18'
  render() {
    return (
      <div> Demo18_content_static---> 高阶组件自动继承原组件的static属性和方法</div>
    )
  }
}
console.log(Demo18.sayHi());
Demo18 = EnhanceWrapper5(Demo18)
console.log(Demo18.sayHi());

//功能7：劫持原组件生命周期
class Demo19 extends Component {
  componentDidMount(){
    console.log('Demo19_componentDidMount');
  }
  render(){
    return (
      <div>
      <div>Demo19_content--->高阶组件劫持原组件生命周期</div>
    </div>
  )
  }
}
Demo19 = EnhanceWrapper6(Demo19)

//功能7：渲染劫持
class Demo20 extends Component {
  render(){
    return <div style={{color: 'blue'}}> Demo20_content--->高阶组件渲染劫持</div>
  }
}
Demo20 = EnhanceWrapper7(Demo20)
export {Demo13, Demo14, Demo15, Demo16, Demo17, Demo18, Demo19, Demo20}