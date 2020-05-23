import React, { Component } from 'react'; 
import SlotMachine from './components/SlotMachine';
import './SlotApp.css';
import title from './img/slotstitle.png';
// import {Helmet} from 'react-helmet';


class SlotApp extends Component {
  state = {text: 'SpACe sL0tS'}

  printPrize =
      (text) => {
        this.setState({text: text})
      }

  render() {
    return (
      <div className="container">
        {/* <Helmet>
          <style>{'body { backgroundImage: "url(https://i.ibb.co/mSmPxtC/slotpagebg.jpg)" }'}</style>
        </Helmet> */}
        <div className="slotstitle"><center><img className="slotstitle" src={title} /></center></div>
        <div className="Space"> 
          <h1>{this.state.text}</h1>
          <SlotMachine prize={this.printPrize} />
        </div>
      </div>
    );
  }
}

export default SlotApp;
