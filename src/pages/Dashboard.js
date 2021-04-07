import React, { Component } from 'react'
import Navigation from '../components/public/Navigation'
import Footer from '../components/public/Footer'
import Wallpaper from '../components/public/Wallpaper'
export default class Dashboard extends Component {
    render() {
        return (
            <div>
              <Navigation />
              <Wallpaper />
              <Footer />
            </div>
        )
    }
}
