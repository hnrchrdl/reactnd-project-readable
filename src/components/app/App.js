import './App.css';

import {
  CategorySwitcher,
  Header,
  PostDetails,
  PostList
} from '../../components';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

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
