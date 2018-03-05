import './Header.css';

import React, { Component } from 'react';

import { Link } from 'react-router-dom'

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="inner">
          readable
        </div>
        <Link to="/__new">
          <div className="new">+</div>
        </Link>

      </div>
    );
  }
}

export default Header;