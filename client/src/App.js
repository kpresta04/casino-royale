import React from 'react';
import Main from './components/Main';
import { makeStyles, Button } from '@material-ui/core';
import './App.css';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Main className="logo"></Main>
        <div className="mb-2">
        <Button className="mainbtn" size="large" variant="outlined" color="secondary" href="/signin">
          Sign In
        </Button>
        <Button className="mainbtn" size="large" variant="outlined" color="secondary" href="/signup">
          Sign Up
        </Button>
        
      </div>
      </header>
      <a href="/blackjack">
      <div className="Blackjack">
        blackjack pic place holder
      </div>
      </a>
      <a href="https://johnfranke.github.io/slot-machine-rough-draft/">
      <div className="Slots">
        slots pic place holder
      </div>
      </a>
    </div>
 
  );
}

export default App;
