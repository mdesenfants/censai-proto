import * as React from 'react';
import './App.css';

let logo = (
  <span>
    <span className="light">CENS[</span><span className="heavy">AI</span><span className="light">]</span>
  </span>
);

interface AppState {
  validUrl: boolean;
  validEmail: boolean;
}

function inputIsValid(id: string): boolean {
  let el = document.getElementById(id) as HTMLInputElement;
  return el.checkValidity() && el.value.trim() !== '';
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = { validUrl: false, validEmail: false };
  }

  checkValidUrl = () => {
    this.setState({
      validUrl: inputIsValid('url')
    });
  }

  checkValidEmail = () => {
    this.setState({
      validEmail: inputIsValid('email')
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{logo}</h1>
        </header>
        <div className="App-steps">
          <div className="Step Info">
            <p>
              {logo} will comb through your podcast looking for
              verbal fillers, profanities, and editing words.
              </p>
            <p>
              Once it's done processing, you will get audio track that marks each point
              of interest with a loud, <i>visible</i> click.
            </p>
          </div>
          <div className="Step Complete">
            <h2>Submit your track<small>Paste a share link from Drive, Dropbox, or OneDrive.</small></h2>
            <div className="Input-block">
              <input
                id="url"
                type="url"
                className=""
                placeholder="https://onedropdrivebox.cloud/5up3rc4l1fr461l1571c3xp14l1d0c10u5"
                pattern="https://.+/.+"
                onChange={this.checkValidUrl}
              />
              <input type="button" value="Go" disabled={!this.state.validUrl} />
            </div>
          </div>
          <div className="Step Active">
            <h2>Confirm email<small>Make sure we can reach you when procesing is done.</small></h2>
            <div className="Input-block">
              <input
                id="email"
                type="email"
                className=""
                placeholder="george@jungle.ook"
                pattern=".+@.+\..+"
                onChange={this.checkValidEmail}
              />
              <input type="button" value="Go" disabled={!this.state.validEmail} />
            </div>
          </div>
          <div className="Step Waiting">
            <h2>Preview track<small>Check that the file we grabbed is what you expected.</small></h2>
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
