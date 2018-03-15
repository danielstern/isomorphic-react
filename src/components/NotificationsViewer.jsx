import React from 'react';

export default class extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            count: 3
        }
    }
    componentDidMount() {
        console.log("This component mounted!");
    }
    getInitialState() {

    }
    render() {
        console.log(this.state);
        return <div>
            You have {this.state ? this.state.count : -2} notifications!!
        </div>
    }
}