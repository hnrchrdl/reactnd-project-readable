import './App.css';

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import CategorySwitcher from '../category-switcher/CategorySwitcher';
import Header from '../header/Header'
import PostDetails from '../post-details/PostDetails'
import PostList from '../post-list/PostList'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <CategorySwitcher />
        <Switch>
          <Route exact path="/" component={PostList} />
          <Route exact path="/:category" component={PostList} />
          <Route exact path="/:category/:postid" component={PostDetails} />
        </Switch>
      </div>
    );
  }
}

export default App;
