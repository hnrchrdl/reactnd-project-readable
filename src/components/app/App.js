import './App.css'

import {
  CategorySwitcher,
  Header,
  PostList,
} from '../'
import React, { Component } from 'react'

import { Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <CategorySwitcher />
        <Route exact path="/" component={PostList} />
        <Route path="/:category" component={PostList} />
      </div>
    );
  }
}

export default App;
