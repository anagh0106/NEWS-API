// import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

//rce
export class App extends Component {

  render() { // render is used to render the html on the screen
    return (
      <>
        <Navbar />
        <News />
      </>
    )
  }
}

export default App