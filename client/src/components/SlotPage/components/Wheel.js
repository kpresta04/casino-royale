import React, { Component } from 'react';

import Symbol from './Symbol';

import Alien from '../img/Alien.png'; 
import Saturn from '../img/Saturn.png';
import Rocket from '../img/Rocket.png';
import Astronaut from '../img/Astronaut.png';

class Wheel extends Component {

  state = {
      spinning: false,
      symbols: ["Rocket", "Alien", "Saturn", "Astronaut"]
    }
  
  componentWillMount() {
    this.shuffle();
  } 
  render() { 
    return(
    <div className="Wheel"> 
      <Symbol name="Rocket" src={Rocket} positionY={this.state.order[0]*275} />
      <Symbol name="Alien" src={Alien} positionY={this.state.order[1]*275} />
      <Symbol name="Saturn" src={Saturn} positionY={this.state.order[2]*275} />
      <Symbol name="Astronaut" src={Astronaut} positionY={this.state.order[3]*275} />
    </div>
      )
  }
  
  componentDidUpdate() {
    if(this.props.isSpinning) {
      if(!this.state.spinning){
      this.startSpinning();
      this.setState({
        spinning: true
      })
      }
    }else if(!this.props.isSpinning) {
      if(this.state.spinning) {
        this.stopSpinning();
        this.setState({
          spinning: false
        })
      }
    }
  }
  
  shuffle() {    
     
    let options = [0,1,2,3];
    let temp = [];
    for(let i = 0; i < 4; i++) {
      let rand = Math.floor(Math.random() * (4-i));
      temp.push(options[rand]);
      options.splice(rand, 1);
    }   
    this.setState({
      order: temp
    }) 
  }
  
  startSpinning() {
    let temp = [];
    let arr = this.state.order;
    let intervalId = setInterval(() => {  
      temp = [];
      temp[0] = arr[3];
      temp[1] = arr[0];
      temp[2] = arr[1];
      temp[3] = arr[2];
      arr = temp;
      this.setState({
        order: temp,
        interval: intervalId
      });
    },100)
  }
  
  stopSpinning() { 
    clearTimeout(this.state.interval);
    let selected = this.state.symbols[this.state.order.indexOf(0)];
    this.props.active(this.props.name, selected);
  }
}

export default Wheel;