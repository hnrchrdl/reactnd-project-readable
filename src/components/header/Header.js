import './Header.css';

import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="inner">
          readable
        </div>
        <div className="new">+</div>
        
      </div>
    );
  }
}

export default Header;