import React, { Component } from 'react'
import '../../assets/sass/styles.scss'

export default class Notification extends Component {
    
    render() {
        return (
            <div>
               <div className="notification" >
                  <p>You are notified {this.props.counting} times</p>
               </div>
            </div>
        )
    }
}
