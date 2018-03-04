import './Button.css'

import React, { Component } from 'react'

class Button extends Component {

  render() {

    const { text, onClick, muted } = this.props
    const btnClass = `button${muted ? ' muted' : ''}${text.length === 1 ? ' squared' : ''}`;
    return (
      <div className={btnClass} onClick={onClick}>
        {text}
      </div>
    )
  }
}
export default Button;