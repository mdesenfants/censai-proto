import * as React from 'react';

export const WAITING: string = 'Waiting';
export const ACTIVE: string = 'Active';
export const COMPLETE: string = 'Complete';

export interface StepProps {

}

export interface StepState {
    level: string;
}

export class Step extends React.Component<StepProps, StepState> {
    next: Step;

    constructor(props: {}) {
        super(props);
        this.setState({
            level: WAITING
        });
    }

    wait() {
        this.setState({
            level: WAITING
        });

        this.next.wait();
    }

    activate() {
        this.setState({
            level: ACTIVE
        });

        this.next.wait();
    }

    complete() {
        this.setState({
            level: COMPLETE
        });

        this.next.activate();
    }

    link(next: Step) {
        if (next) {
            this.next = next;
        }
    }

    render() {
        return (
            <div className={'Step ' + this.state.level}>
                {this.props.children}
            </div>
        );
    }
}