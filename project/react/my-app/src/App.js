import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button>按钮</button>
      </div>
    );
  }
}
const HoC = (WrappedComponent) => {
  const WrappingComponent = (props) => (
    <div className="foo">
      <WrappedComponent {...props} />
    </div>
);
  return WrappingComponent;
};
App = HoC(App);
export default App;
