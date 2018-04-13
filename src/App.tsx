import * as React from 'react';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">CENS|AI</h1>
        </header>
        <div className="App-steps">
          <div className="Step Complete">
            <h2>Submit your track<small>Provide a sharing link to Dropbox, OneDrive, or Google Drive.</small></h2>
            <input type="url" className="" placeholder="https://onedropdrivebox.cloud/kd903209c90mwdcmiomscm" />
          </div>
          <div className="Step Active">
            <h2>Preview track<small>Verify that the waveform looks right to you.</small></h2>
          </div>
          <div className="Step Waiting">
            <h2>Confirm email<small>Make sure we can reach you when procesing is done.</small></h2>
            <input type="email" className="" placeholder="george@jungle.ook" />
          </div>
          <div className="Step Waiting">
            <h2>Billing<small>Now for the hard part.</small></h2>
          </div>
          <div className="Step Waiting">
            <h2>Done<small>Download your marker track here.</small></h2>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
