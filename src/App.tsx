import * as React from 'react';
import './App.css';

let logo = (
  <span>
    <span className="light">CENS[</span><span className="heavy">AI</span><span className="light">]</span>
  </span>
);

interface AppState {
  validTrack: boolean;
  emailReady: boolean;
  validEmail: boolean;
  previewReady: boolean;
  billingReady: boolean;
  downloadReady: boolean;
}

function inputIsValid(id: string): boolean {
  let el = document.getElementById(id) as HTMLInputElement;
  return el.checkValidity() && el.value.trim() !== '';
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      validTrack: false,
      emailReady: false,
      validEmail: false,
      previewReady: false,
      billingReady: false,
      downloadReady: false
    };
  }

  checkValidTrack = () => {
    this.setState({
      validTrack: inputIsValid('track')
    });
  }

  checkValidEmail = () => {
    this.setState({
      validEmail: inputIsValid('email')
    });
  }

  startEmail = () => {
    this.setState({
      emailReady: inputIsValid('track')
    });
  }

  // shims
  fileShim = () => {
    (document.getElementById('track') as HTMLInputElement).value = 'https://mycloud.co/magicfiles';
    this.checkValidTrack();
  }

  emailShim = () => {
    (document.getElementById('email') as HTMLInputElement).value = 'sam@pod.agency';
    this.checkValidEmail();
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
              Once it's done processing, you will get an audio track that marks each point
              of interest with a loud, <i>visible</i> click.
            </p>
          </div>
          <div className={'Step' + (this.state.emailReady ? ' Complete' : ' Active')}>
            <h2>Submit your track<small>Paste a share link from Drive, Dropbox, or OneDrive.</small></h2>
            <div className="Input-block">
              <input
                id="track"
                type="url"
                className=""
                placeholder="https://onedropdrivebox.cloud/5up3rc4l1fr461l1571c3xp14l1d0c10u5"
                pattern="https://.+/.+"
                onClick={this.fileShim}
                onChange={this.checkValidTrack}
              />
              <input type="button" value="Go" disabled={!this.state.validTrack} onClick={this.startEmail} />
            </div>
          </div>
          <div className="Step {Active}">
            <h2>Confirm email<small>Make sure we can reach you when procesing is done.</small></h2>
            <div className="Input-block">
              <input
                id="email"
                type="email"
                className=""
                placeholder="george@jungle.ook"
                pattern=".+@.+\..+"
                onClick={this.emailShim}
                onChange={this.checkValidEmail}
                disabled={!this.state.emailReady}
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
