import React, { Component } from 'react'; 
import SlotMachine from './components/SlotMachine';
import './SlotApp.css';
import bg from './img/bg.jpg'

class SlotApp extends Component {
  state = {text: 'SpACe sL0tS'}

  printPrize =
      (text) => {
        this.setState({text: text})
      }

  render() {
    return (
      <div className="container">
        <div className="Space"> 
          <h1>{this.state.text}</h1>
          <SlotMachine prize={this.printPrize} />
        </div>
      </div>
    );
  }
}

export default SlotApp;
