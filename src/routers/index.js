import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
//import  history from '../history'
import Login from '../pages/Login'
import dashboard from '../pages/Dashboard'
export default class Routers extends Component {
    render() {
        return (
            <div>
                 <Router >
                     <Switch>
                        <Route path="/" exact component={Login} />
                        <Route path="/dashboard" exact component={dashboard} />  
                        <Route path="*" component={Login} />  
                     </Switch>
                 </Router>                
            </div>
        )
    }
}