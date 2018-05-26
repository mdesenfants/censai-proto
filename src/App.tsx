import * as React from 'react';
import 'waveform-data';
import 'peaks.js';
import './App.css';
import { Waveform } from './Waveform';

let logo = (
  <span>
    <span className="light">POD</span><span className="heavy">&gt;ROCKET&gt;</span>
  </span>
);

interface AppState {
  validTrack: boolean;
  validEmail: boolean;
  validWaveform: boolean;
  trackState: string;
  emailState: string;
  previewState: string;
  billingState: string;
  downloadState: string;
  upload: string;
  source: string | undefined;
}

function inputIsValid(id: string): boolean {
  let el = document.getElementById(id) as HTMLInputElement;
  return el.checkValidity() && el.value.trim() !== '';
}

class App extends React.Component<{}, AppState> {
  audioContext = new AudioContext();

  default: AppState = {
    validTrack: false,
    validEmail: false,
    validWaveform: false,
    trackState: 'Active',
    emailState: 'Waiting',
    previewState: 'Waiting',
    billingState: 'Waiting',
    downloadState: 'Waiting',
    upload: '',
    source: undefined,
  };

  constructor(props: {}) {
    super(props);
    this.state = this.default;
  }

  checkValidTrack = () => {
    this.state = this.default;
    this.setState({
      validTrack: inputIsValid('track')
    });
  }

  checkValidEmail = () => {
    this.setState({
      validEmail: inputIsValid('email')
    });
  }

  checkValidWaveform = () => {
    this.setState({
      validWaveform: true
    });
  }

  startUpload = () => {
    this.state = this.default;
  }

  startEmail = () => {
    if (inputIsValid('track')) {
      this.setState({
        trackState: 'Complete',
        emailState: 'Active'
      });
    }
  }

  confirmWaveform = () => {
    this.setState({
      previewState: 'Complete',
      billingState: 'Active',
    });
  }

  pay = () => {
    this.setState({
      billingState: 'Complete',
      downloadState: 'Active'
    });
  }

  startAudio = (upload: string, actx: AudioContext) => {
    if (inputIsValid('email')) {
      this.setState({
        emailState: 'Complete',
        previewState: 'Active'
      });

      fetch(upload)
        .then(response => response.arrayBuffer())
        .then(buffer => {
          const webAudioBuilder = require('waveform-data/webaudio');
          // tslint:disable-next-line:no-any
          webAudioBuilder(actx, buffer, (error: any, waveform: any) => {
            if (error) {
              return;
            }

            const peaks = require('peaks.js/peaks');
            peaks.init({
              container: document.getElementById('peaks-input'),
              mediaElement: document.getElementById('waveform') as HTMLMediaElement,
              audioContext: actx,
              height: 100
            });
          });

          this.setState({ validWaveform: true });
        });
    }
  }

  // shims
  fileShim = () => {
    (document.getElementById('track') as HTMLInputElement).value = 'https://mycloud.co/watergatetapes';
    this.checkValidTrack();
  }

  emailShim = () => {
    (document.getElementById('email') as HTMLInputElement).value = 'woodward@wapo.com';
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
          <div className={'Step ' + this.state.trackState}>
            <h2>Submit your track<small>Paste a share link from Drive, Dropbox, or OneDrive.</small></h2>
            <div className="Input-block">
              <input
                id="track"
                type="url"
                className=""
                placeholder="https://onedropdrivebox.cloud/5up3rc4l1fr461l1571c3xp14l1d0c10u5"
                pattern="https://.+/.+"
                onFocus={this.fileShim}
                onChange={this.checkValidTrack}
              />
              <input
                type="button"
                value="go"
                disabled={!this.state.validTrack}
                onClick={this.startEmail}
              />
            </div>
          </div>
          <div className={'Step ' + this.state.emailState}>
            <h2>Confirm email<small>Make sure we can reach you when procesing is done.</small></h2>
            <div className="Input-block">
              <input
                id="email"
                type="email"
                className=""
                placeholder="george@jungle.ook"
                pattern=".+@.+\..+"
                onFocus={this.emailShim}
                onChange={this.checkValidEmail}
                disabled={this.state.emailState !== 'Active'}
              />
              <input
                type="button"
                value="go"
                disabled={!this.state.validEmail}
                onClick={() => this.startAudio('./1-21-draft.ogg', this.audioContext)}
              />
            </div>
          </div>
          <div className={'Step ' + this.state.previewState}>
            <h2>Preview track<small>Check that the file we grabbed is what you expected.</small></h2>
            <Waveform
              source={this.state.upload}
            />
            <input
              type="button"
              value="go"
              disabled={!this.state.validWaveform}
              onClick={() => this.confirmWaveform()}
            />
          </div>
          <div className={'Step ' + this.state.billingState}>
            <h2>Billing<small>Now for the hard part.</small></h2>
            <input
              type="button"
              value="Pay"
              disabled={!this.state.validWaveform}
              onClick={() => this.pay()}
            />
          </div>
          <div className={'Step ' + this.state.downloadState}>
            <h2>Done<small>Download your marker track here.</small></h2>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
