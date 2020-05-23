import React, { Component } from 'react';
import Wheel from './Wheel';
import StartButton from './StartButton';
import StopButton from './StopButton';

class SlotMachine extends Component {

  state = {
    isGameOn: false,
    timeout: null
  }

  constructor(props) {
    super(props);
    
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.getActive = this.getActive.bind(this);
    this.checkPrize = this.checkPrize.bind(this);
    this.results = [];
  }
  componentDidMount() {
    this.handleTimeout(this.handleStart, 5000);
    document.body.classList.add("background");
    // document.body.style.backgroundImage = "url('https://i.ibb.co/mSmPxtC/slotpagebg.jpg')";
  }
  componentWillUnmount() {
    document.body.classList.remove("background");
}
  handleStart = () => {
    clearTimeout(this.state.timeout);
    this.setState({
      isGameOn: true,
      timeout: null
    });
    this.props.prize("cLiCK St0p");
     this.handleTimeout(this.handleStop, 10000000);
  }
  handleStop = () => {
    clearTimeout(this.state.timeout);
    this.setState({
      isGameOn: false,
      timeout: null
    });
    this.handleTimeout(this.handleStart, 5000);
  }
  handleTimeout(fn, time) {
    
    let timeout = setTimeout(() =>  { 
      fn();
    },time); 
    this.setState({
      timeout: timeout
    });
  }
  getActive = (num, symbol) => {
    let prize;
    this.results.push(symbol);
    if(this.results.length === 3) {
      
      prize = this.checkPrize()
      this.results = [];
    } 
    this.props.prize("Y0u w0n $" + prize);
  }
  
  checkPrize = () => {
    
    if(this.results[0] === this.results[1] && this.results[1] === this.results[2]) {
      return 100;
    }else if(this.results[0] === this.results[1] || this.results[1] === this.results[2]) {
      return 20; 
    }else if(this.results[0] === this.results[2]) {
      return 10;
    }else {
      return 0; 
    }
  }
  render() {
    return(
      <div className="SlotMachine">
        <div className="WheelWrapper">
          <Wheel name="Wheel1" isSpinning={this.state.isGameOn} active={this.getActive} />
          <Wheel name="Wheel2" isSpinning={this.state.isGameOn} active={this.getActive} />
          <Wheel name="Wheel3" isSpinning={this.state.isGameOn} active={this.getActive} />
        </div>
        <div className="StartButtonHandler">
        <StartButton clicked={this.handleStart} />
        </div>
        <StopButton clicked={this.handleStop} />
      </div>
    )
  }

}

export default SlotMachine;