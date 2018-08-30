// 学习资源：React高阶组件实践-知乎-美团点评点餐
import React,{Component} from 'react';

// 方式2：在新组件的render函数中返回一个新的class component
/**
const EnhanceWrapper = WrappedComponent => class WrappingComponent extends Component {
  render() {
    return <WrappedComponent {...this.props} />;
  }
}
*/
// 改进1：利用displayName属性命名高阶组件方便调试
const getDisplayName= component => { //获取传入组件的名字
  return component.displayName || component.name || 'Component';
};

const EnhanceWrapper = WrappedComponent => class WrappingComponent extends Component {
  static displayName = `HOC_class(${getDisplayName(WrappedComponent)})`;
  render() {
    return <WrappedComponent {...this.props} />;
  }
}

const EnhanceWrapper1 = WrappedComponent => class WrappingComponent extends Component {
  static displayName = `HOC_class(${getDisplayName(WrappedComponent)})`;
  render() {
    const newProps = {
      name: getDisplayName(WrappedComponent),
      age:18
    }
    return <WrappedComponent {...this.props} {...newProps} sex = "男"/>;
  }
}

const EnhanceWrapper2 = WrappedComponent => class WrappingComponent extends Component {
  static displayName = `HOC_class(${getDisplayName(WrappedComponent)})`;
  constructor(props) {
    super(props)
    this.state = {
      name: "demo8"
    }
  }
  changeChildState(ChildState) {
    this.setState({ name: ChildState })
    return `${ChildState}_changeName`
  }
  render() {
    return (
      <div>
        <div>HoC_Demo8_content---> {`childStateName_beforeChange: ${this.state.name}`}</div>
        <WrappedComponent {...this.props} changeChildState = {this.changeChildState.bind(this)}/>
      </div>

    )
  }
}

const EnhanceWrapper3 = WrappedComponent => class WrappingComponent extends Component {
  static displayName = `HOC_class(${getDisplayName(WrappedComponent)})`;

  getChildRef(ChildRef) {
    ChildRef.focus()
  }
  render() {
    return <WrappedComponent {...this.props} getChildRef = {this.getChildRef.bind(this)}/>
  }
}

export {EnhanceWrapper, EnhanceWrapper1, EnhanceWrapper2, EnhanceWrapper3}
/** 功能说明
1.√ 原组件所在位置（是被包裹或包裹其他组件）

2.√ 能否取到或操作原组件的props
        设置某个组件props，在使用组件时作为组件的属性（<WrappedComponent sex = "男" />）;
                           在使用组件时利用展开运算符...（<WrappedComponent {...props}/>）
        获取某个组件的props，在stateless组件中可通过在该组件传参props获取，注意没有this，直接props
                             在class 组件中可通过this.props 获取

3.乄 高阶组件能否取到或操作原组件的state
        高阶组件通过props给原组件传递一个回调函数，若修改原组件的state，可将修改后的state作为返回值（return `${ChildState}_changeName` ）
                                                   若修改高阶组件的state，可通过触发setState修改（this.setState({ name: ChildState })）
        原组件将state作为参数传给回调，若修改，可通过触发setState修改（ this.setState({name: this.props.changeChildState(this.state.name)}) ）

 4.乄 能否通过ref访问到原组件中的dom元素
高阶组件通过props给原组件传递一个回调函数，若修改，可直接将修改操作作为返回值（getChildRef = ChildRef => ChildRef.focus()）
        原组件通过给DOM元素设置ref属性，将其作为参数传给回调（ this.props.getChildRef(this.input) ）

 5.√ 是否影响原组件生命周期等方法（如：componentWillReceiveProps）

 6.√ 是否取到原组件static方法
可以通过手动拷贝原组件的static方法（ WrappingComponent.sayHi = WrappedComponent.sayHi ）

 7.X 能否劫持原组件生命周期

 8.乄 能否渲染劫持
高阶组件可以通过props来控制是否渲染及传入数据（newProps = {childStyle: {color: '#f00',fontSize: '25px'}}）
        原组件通过获取props来劫持渲染，但对原组件内部render的控制并不是很强
*/