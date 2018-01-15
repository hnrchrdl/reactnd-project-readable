import './Button.css'

import React, { Component } from 'react'

class Button extends Component {

  render() {

    const { text, onClick } = this.props

    return (
      <div className="button" onClick={ onClick }>
        { text }
      </div>
    )
  }
}
export default Button;