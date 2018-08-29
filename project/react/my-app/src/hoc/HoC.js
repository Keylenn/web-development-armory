import React, {Component} from 'react';

//简单使用
const getDisplayName= component => {
  return component.displayName || component.name || 'Component';
};

const withHeader = WrappedComponent => class HoC extends Component {
  static displayName = `HoC(${getDisplayName(WrappedComponent)})`;
  render() {
    return (
      <div>
        <header>标题</header>
        <WrappedComponent {...this.props} />
      </div>
    );
  }
};

//组件参数
const withDynamicTitleHeader = title => WrappedComponent => class HoC extends Component{
  static displayName = `HoC(${getDisplayName(WrappedComponent)})`;
  render() {
    return (
      <div>
      <header>{title ? title : '标题'}</header>
      <WrappedComponent {...this.props} />
    </div>
    );
  }
};

//属性代理
const withPropertyAgency = WrappedComponent => class HoC extends Component{
  static displayName = `HoC(${getDisplayName(WrappedComponent)})`;
  render() {
    const newProps = {
      test: 'hoc'
    };
    return (
      <div>
        <WrappedComponent {...this.props} {...newProps}/>
      </div>
    );
  }
};

// 反向继承



export {withHeader, withDynamicTitleHeader,withPropertyAgency}