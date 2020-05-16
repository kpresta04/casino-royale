import React, { Component } from 'react';

class Symbol extends Component {  
  render() {
    return(
      <img className={"Symbol " + this.props.name} src={this.props.src} alt={this.props.name} style={{'top': this.props.positionY}} />
    )
  }  
}

export default Symbol;