// 学习资源：React高阶组件实践-知乎-美团点评点餐
import React from 'react';

// 方式1：直接返回一个stateless component
// 通过{...props} 把传递给当前组件的属性继续传递给被包装的组件WrappedComponent
// const EnhanceWrapper = WrappedComponent => props => <WrappedComponent {...props} />

// 改进1：利用displayName属性命名高阶组件方便调试
const getDisplayName= component => { //获取传入组件的名字
  return component.displayName || component.name || 'Component';
};

const EnhanceWrapper = WrappedComponent =>{
  const WrappingComponent = props => <WrappedComponent {...props} />;
  WrappingComponent.displayName = `HOC_stateless(${getDisplayName(WrappedComponent)})`;
  return WrappingComponent;
}

const EnhanceWrapper1 = WrappedComponent =>{
  const newProps = {
    name: getDisplayName(WrappedComponent),
    age:18
  }
  const WrappingComponent = props => <WrappedComponent {...props} {...newProps} sex = "男"/>;
  WrappingComponent.displayName = `HOC_stateless(${getDisplayName(WrappedComponent)})`;
  return WrappingComponent;
}

const EnhanceWrapper2 = WrappedComponent =>{
  const changeChildState = ChildState => `${ChildState}_changeName`
  const newProps = {changeChildState}
  const WrappingComponent = props => <WrappedComponent {...props} {...newProps}/>;
  WrappingComponent.displayName = `HOC_stateless(${getDisplayName(WrappedComponent)})`;
  return WrappingComponent;
}

const EnhanceWrapper3 = WrappedComponent =>{
  const getChildRef = ChildRef => ChildRef.focus()
  const newProps = {getChildRef}
  const WrappingComponent = props => <WrappedComponent {...props} {...newProps}/>
  WrappingComponent.displayName = `HOC_stateless(${getDisplayName(WrappedComponent)})`
  return WrappingComponent
}

const EnhanceWrapper4 = WrappedComponent =>{
  const WrappingComponent = props => <WrappedComponent {...props} />
  WrappingComponent.displayName = `HOC_stateless(${getDisplayName(WrappedComponent)})`
  WrappingComponent.sayHi = WrappedComponent.sayHi
  return WrappingComponent
}

const EnhanceWrapper5 = WrappedComponent =>{
  const newProps = {
    childStyle: {color: '#f00',fontSize: '25px'}
  }
  const WrappingComponent = props => <WrappedComponent {...props} {...newProps}/>
  WrappingComponent.displayName = `HOC_stateless(${getDisplayName(WrappedComponent)})`
  return WrappingComponent
}


export {EnhanceWrapper, EnhanceWrapper1, EnhanceWrapper2, EnhanceWrapper3, EnhanceWrapper4, EnhanceWrapper5};
/** 功能说明
 1.√ 原组件所在位置（是被包裹或包裹其他组件）

 2.√ 能否取到或操作原组件的props
        设置某个组件props，在使用组件时作为组件的属性（<WrappedComponent sex = "男" />）;
                           在使用组件时利用展开运算符...（<WrappedComponent {...props}/>）
        获取某个组件的props，在stateless组件中可通过在该组件传参props获取，注意没有this，直接props
                             在class 组件中可通过this.props 获取

 3.乄 高阶组件能否取到或操作原组件的state
        高阶组件通过props给原组件传递一个回调函数，若修改，可将修改后的state作为返回值（changeChildState = ChildState => `${ChildState}_changeName`）
        原组件将state作为参数传给回调，若修改，可通过触发setState修改（ this.setState({name: this.props.changeChildState(this.state.name)}) ）

 4.乄 能否通过ref访问到原组件中的dom元素
        高阶组件通过props给原组件传递一个回调函数，若修改，可直接将修改操作作为返回值（getChildRef = ChildRef => ChildRef.focus()）
        原组件通过给DOM元素设置ref属性，将其作为参数传给回调（ this.props.getChildRef(this.input) ）

 5.X 是否影响原组件生命周期等方法：props无法更改，所以也不会影响到componentWillReceiveProps方法。

 6.√ 是否取到原组件static方法
        可以通过手动拷贝原组件的static方法（ WrappingComponent.sayHi = WrappedComponent.sayHi ）

 7.X 能否劫持原组件生命周期：同5。

 8.乄 能否渲染劫持
        高阶组件可以通过props来控制是否渲染及传入数据（newProps = {childStyle: {color: '#f00',fontSize: '25px'}}）
        原组件通过获取props来劫持渲染，但对原组件内部render的控制并不是很强
 */

