import React, { Component } from 'react'
import Notification from './Notification'
import '../../assets/sass/styles.scss'

export default class Wallpaper extends Component {
    constructor(){
        super();
        this.state = {
            count: 0
        };
    }
    counts = ()=>{
       return this.setState({ count: this.state.count + 1 })

     }

    render() {
        return (
            <div className="wallpaper">
                <Notification counting={this.state.count} />
                <h1>Click notify me <br/>You have clicked: <span>{this.state.count}</span> times</h1>
                <button type="submit" onClick={this.counts}>Notify Me </button>
            </div>
        )
    }
}
