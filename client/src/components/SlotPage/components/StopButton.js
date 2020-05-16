import React, { Component } from 'react';

class StopButton extends Component {
  render() {
    return (
      <button className="StopButton" onClick={this.props.clicked}>St0p</button>
    )
  }
}

export default StopButton;