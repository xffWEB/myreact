import React, { Component } from 'react';
import Index from './router';
import './App.css';
import {Provider} from 'react-redux';
import store from './store/index';
class App extends Component {
  render() {
    return <Provider store={store}><Index/></Provider>
  }
}

export default App;
