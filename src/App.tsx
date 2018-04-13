import * as React from 'react';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"><span className="light">CENS|</span>AI</h1>
        </header>
        <div className="App-steps">
          <div className="Step Info">
            <p>
              <span className="light">CENS|</span>AI will comb through your podcast looking for
              verbal fillers, profanities,
              awkward pauses, and editing words.
              </p>
            <p>
              Once it's done processing, you will get audio track that marks each point
              of interest with a loud, visible click.
            </p>
          </div>
          <div className="Step Complete">
            <h2>Submit your track<small>Paste a share link from Drive, Dropbox, or OneDrive.</small></h2>
            <input
              type="url"
              className=""
              placeholder="https://onedropdrivebox.cloud/5up3rc4l1fr461l1571c3xp14l1d0c10u5"
            />
          </div>
          <div className="Step Active">
            <h2>Confirm email<small>Make sure we can reach you when procesing is done.</small></h2>
            <input type="email" className="" placeholder="george@jungle.ook" />
          </div>
          <div className="Step Waiting">
            <h2>Preview track<small>Verify that the waveform looks right to you.</small></h2>
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
