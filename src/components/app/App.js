import './App.css';

import React, { Component } from 'react';

import { CategorySwitcher } from '../'
import { Header } from '../'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header></Header>
        <CategorySwitcher></CategorySwitcher>
      </div>
    );
  }
}

export default App;
