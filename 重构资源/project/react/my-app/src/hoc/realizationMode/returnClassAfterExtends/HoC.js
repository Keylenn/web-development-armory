/**
 * 学习资源：
      React高阶组件实践-知乎-美团点评点餐
      深入理解 React 高阶组件（Higher Order Component，简称：HOC）---http://www.css88.com/archives/9462
*/
import React from 'react';

//方式3:继承（extends）原组件后返回一个新的class component
/*const EnhanceWrapper = WrappedComponent => class WrappingComponent extends WrappedComponent {
  render() {
    return super.render();
  }
}*/

// 改进1：利用displayName属性命名高阶组件方便调试
const getDisplayName= component => { //获取传入组件的名字
  return component.displayName || component.name || 'Component';
};

const EnhanceWrapper = WrappedComponent => class WrappingComponent extends WrappedComponent {
  static displayName = `HOC_classExtends(${getDisplayName(WrappedComponent)})`;
  render() {
    return super.render();
  }
}

const EnhanceWrapper1 = WrappedComponent => class WrappingComponent extends WrappedComponent {
  static displayName = `HOC_classExtends(${getDisplayName(WrappedComponent)})`;
  render() {
    // console.log(this);//WrappingComponent {props: {…}, context: undefined, refs: {…}, updater: {…}}
    return super.render();//将当前组件的this绑定到WrappedComponent中
  }
}

const EnhanceWrapper2 = WrappedComponent => class WrappingComponent extends WrappedComponent {
  static displayName = `HOC_classExtends(${getDisplayName(WrappedComponent)})`;
  componentDidMount() {
    this.setState({name: 'Demo15_change'})
  }
  render() {
    return super.render();//将当前组件的this绑定到WrappedComponent中
  }
}

const EnhanceWrapper3 = WrappedComponent => class WrappingComponent extends WrappedComponent {
  static displayName = `HOC_classExtends(${getDisplayName(WrappedComponent)})`;
  componentDidMount() {
    this.input.focus()
  }
  render() {
    return super.render();//将当前组件的this绑定到WrappedComponent中
  }
}
const EnhanceWrapper4 = WrappedComponent => class WrappingComponent extends WrappedComponent {
  static displayName = `HOC_classExtends(${getDisplayName(WrappedComponent)})`;
  constructor(props){
    super(props)
    console.log('WrappingComponentExtends(Demo17)_constructor');
  }
  componentDidMount() {
    console.log('WrappingComponentExtends(Demo17)_componentDidMount');
  }
  render() {
    return super.render();//将当前组件的this绑定到WrappedComponent中
  }
}

const EnhanceWrapper5 = WrappedComponent => class WrappingComponent extends WrappedComponent {
  static displayName = `HOC_classExtends(${getDisplayName(WrappedComponent)})`
  render() {
    return super.render();//将当前组件的this绑定到WrappedComponent中
  }
}
const EnhanceWrapper6 = WrappedComponent => {
  const didMount = WrappedComponent.prototype.componentDidMount
  return class WrappingComponent extends WrappedComponent {
    static displayName = `HOC_classExtends(${getDisplayName(WrappedComponent)})`
    componentDidMount(...argus) {
      console.log('WrappingComponentExtends(Demo19)_constructor');
      if(didMount) {
        didMount.apply(this, argus)
      }
    }
    render() {
      return super.render();//将当前组件的this绑定到WrappedComponent中
    }
  }
}

const EnhanceWrapper7 = WrappedComponent => class WrappingComponent extends WrappedComponent {
  static displayName = `HOC_classExtends(${getDisplayName(WrappedComponent)})`
  render() {
    const elementsTree = super.render()
    console.log(elementsTree);
    let newProps = {
      style: {
        color: 'red',
        fontSize: '25px'
      }
    }
    const props = Object.assign({}, elementsTree.props, newProps)//覆盖color属性
    const newElementsTree = React.cloneElement(elementsTree, props, elementsTree.props.children)
    console.log(newElementsTree);
    return newElementsTree//将当前组件的this绑定到WrappedComponent中
  }
}

export {EnhanceWrapper, EnhanceWrapper1, EnhanceWrapper2, EnhanceWrapper3, EnhanceWrapper4, EnhanceWrapper5,
        EnhanceWrapper6, EnhanceWrapper7}
/** 功能说明
 1.√ 原组件所在位置（是被包裹或包裹其他组件）

 2.√ 能否取到或操作原组件的props
        由于原组件绑定了高阶组件的this，可以通过在使用高阶组件时传入props，间接传给原组件
          设置某个组件props，在使用组件时作为组件的属性（<Demo14 name = 'demo14' age={18} sex = '男'/>）
          获取某个组件的props，在class 组件中可通过this.props 获取

 3.√ 高阶组件能否取到或操作原组件的state
        由于原组件绑定了高阶组件的this，高阶组件直接通过this.state获取原组件的state，this.state设置原组件的state

 4.√ 能否通过ref访问到原组件中的dom元素
        由于原组件绑定了高阶组件的this，高阶组件直接通过this.input访问到原组件中的dom元素

 5.√ 是否影响原组件生命周期等方法
        由于高阶组件继承了原组件，会直接覆盖原组件的生命周期等方法,但constructor不会被覆盖，且原组件的constructor方法先于高阶组件执行（因为class继承时会先生成父类的示例）

 6.√ 是否取到原组件static方法
        由于高阶组件继承了原组件,直接继承了静态属性和方法

 7.√ 能否劫持原组件生命周期
        由于高阶组件会直接覆盖原组件的生命周期,可通过重命名原组件的生命周期来劫持，在高阶组件对应的生命周期调用（const didMount = WrappedComponent.prototype.componentDidMount）
 8.√ 能否渲染劫持
        条件渲染（ if (this.props.loggedIn) {return super.render()} else {return null} ）
        通过取得WrappedComponent 实例的render结果（const elementsTree = super.render()），通过React.cloneElement等方法修改由 render 方法输出的 React 组件树（const newElementsTree = React.cloneElement(elementsTree, props, elementsTree.props.children)）
 */