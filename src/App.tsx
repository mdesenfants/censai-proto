import * as React from 'react';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">CENSAI</h1>
        </header>
        <div className="App-steps">
          <div className="Step Complete">
            <h2>Submit your track</h2>
          </div>
          <div className="Step Active">
            <h2>Submit Track</h2>
            <p>Waveform goes here</p>
          </div>
          <div className="Step Waiting">
            <h2>Preview</h2>
          </div>
          <div className="Step Waiting">
            <h2>Confirm email</h2>
            <p>Make sure we can reach you when procesing is done.</p>
          </div>
          <div className="Step Waiting">
            <h2>Billing</h2>
          </div>
          <div className="Step Waiting">
            <h2>Download</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
