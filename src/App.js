import React, { Component } from 'react';
import './App.css';
import router from './router.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <div className='space'></div> */}
        {router}
      </div>
    );
  }
}

export default App;
