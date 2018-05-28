import * as React from 'react';

export interface WaveformProps {
    source: string | undefined;
}

interface WaveformState {
    source: string | undefined;
}

export class Waveform extends React.Component<WaveformProps, WaveformState> {
    constructor(props: WaveformProps) {
        super(props);
        this.state = {
            source: this.props.source,
        };
    }

    render() {
        return (
            <div className="Audio-input">
                <div id="peaks-input" />
                <audio id="waveform" src="./1-21-draft.ogg" />
            </div>
        );
    }
}