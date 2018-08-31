// 学习资源：React高阶组件实践-知乎-美团点评点餐
import React,{Component} from 'react';

// 方式2：在新组件的render函数中返回一个新的class component
/**
const EnhanceWrapper = WrappedComponent => returnClass WrappingComponent extends Component {
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
  changeWrappedComponentState(WrappedComponentState) {
    this.setState({ name: WrappedComponentState })
    return `${WrappedComponentState}_changeName`
  }
  render() {
    return (
      <div>
        <div>HoC_Demo8_content---> {`WrappedComponentStateName_beforeChange: ${this.state.name}`}</div>
        <WrappedComponent {...this.props} changeWrappedComponentState = {this.changeWrappedComponentState.bind(this)}/>
      </div>

    )
  }
}

const EnhanceWrapper3 = WrappedComponent => class WrappingComponent extends Component {
  static displayName = `HOC_class(${getDisplayName(WrappedComponent)})`

  getWrappedComponentRef(WrappedComponentRef) {
    WrappedComponentRef.focus()
  }
  render() {
    return <WrappedComponent {...this.props} getWrappedComponentRef = {this.getWrappedComponentRef.bind(this)}/>
  }
}

const EnhanceWrapper4 = WrappedComponent => class WrppingComponent extends Component {
  static displayName = `HOC_class(${getDisplayName(WrappedComponent)})`
  constructor(props) {
    super(props);
    this.state = {
      effect: false
    }
  }

  render() {
    let newPorps = {
      effect: this.state.effect,
      changeProps: (props) => {
        this.setState({effect: !props})
      }
    }
    return <WrappedComponent {...this.props} {...newPorps} />
  }
}

const EnhanceWrapper5 = WrappedComponent => class WrappingComponent extends Component {
  static displayName = `HOC_class(${getDisplayName(WrappedComponent)})`
  static sayHi = () => 'Hi! Demo' // sayHi = WrappedComponent.sayHi
  render() {
    return <WrappedComponent {...this.props} />
  }
}

const EnhanceWrapper6 = WrappedComponent => class WrappingComponent extends Component {
  static displayName = `HOC_class(${getDisplayName(WrappedComponent)})`
  render() {
    const newProps = {
      WrappedComponentStyle: {color: '#f00',fontSize: '25px'}
    }
    return <WrappedComponent {...this.props} {...newProps}/>
  }
}

export {EnhanceWrapper, EnhanceWrapper1, EnhanceWrapper2, EnhanceWrapper3, EnhanceWrapper4, EnhanceWrapper5, EnhanceWrapper6}
/** 功能说明
1.√ 原组件所在位置（是被包裹或包裹其他组件）

2.√ 能否取到或操作原组件的props
        设置某个组件props，在使用组件时作为组件的属性（<WrappedComponent sex = "男" />）;
                           在使用组件时利用展开运算符...（<WrappedComponent {...props}/>）
        获取某个组件的props，在stateless组件中可通过在该组件传参props获取，注意没有this，直接props
                             在class 组件中可通过this.props 获取

3.乄 高阶组件能否取到或操作原组件的state
        高阶组件通过props给原组件传递一个回调函数，若修改原组件的state，可将修改后的state作为返回值（return `${WrappedComponentState}_changeName` ）
                                                   若修改高阶组件的state，可通过触发setState修改（this.setState({ name: WrappedComponentState })）
        原组件将state作为参数传给回调，若修改，可通过触发setState修改（ this.setState({name: this.props.changeWrappedComponentState(this.state.name)}) ）

 4.乄 能否通过ref访问到原组件中的dom元素
        高阶组件通过props给原组件传递一个回调函数，若修改，可直接将修改操作作为返回值getWrappedComponentRef(WrappedComponentRef) {WrappedComponentRef.focus()}
        原组件通过给DOM元素设置ref属性，将其作为参数传给回调（ this.props.getWrappedComponentRef(this.input) ）

 5.√ 是否影响原组件生命周期等方法（如：componentWillReceiveProps）
        高阶组件通过props给原组件传递自己的state和一个回调函数，原组件触发回调函数后高阶组件通过setState修改的state，从而给原组件传入新的props
        原组件通过触发回调函数，接收了两次props，触发了生命周期函数componentWillReceiveProps

 6.√ 是否取到原组件static方法
        可以通过手动拷贝原组件的static方法（ static sayHi = () => 'Hi! Demo' // sayHi = WrappedComponent.sayHi）

 7.X 能否劫持原组件生命周期

 8.乄 能否渲染劫持
        高阶组件可以通过props来控制是否渲染及传入数据（newProps = {WrappedComponentStyle: {color: '#f00',fontSize: '25px'}}）
        原组件通过获取props来劫持渲染，但对原组件内部render的控制并不是很强
*/