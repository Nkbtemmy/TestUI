import React, { Component } from 'react'
import axios from 'axios'
//import { Redirect } from 'react-router-dom';
//import PropTypes from 'prop-types'
//import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import '../../assets/sass/styles.scss'
import 'bootstrap/dist/css/bootstrap.min.css';


export default class Logins extends Component {
        
        constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            fireErrors: '',
            userDetails:""
        }
        }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }
     
    login = async (event) =>{
    event.preventDefault();
    const { email, password } = this.state;

   await axios
      .post(
        "https://cite-plus-ba-before-mer-imkeud.herokuapp.com/api/v1/user/login",
        {
          email: email,
          password: password
        }
      )
      .then(res => {
		const user = res.data.user;
        window.localStorage.setItem("authToken", res.data.Token);
        window.localStorage.setItem("userData", JSON.stringify(user));
        console.log("data:",user);
        axios.defaults.headers.common['Authorization'] = res.data.Token;
        //redirecting
        //this.props.history.push("/dashboard");
        //Router.push("/dashboard")
        window.location.replace("/dashboard"); 
      })
      .catch(err => {
        console.log(err);
      });
  }

    render() {
        return (
            <div className="login" >
                <div className='loginCont'>
                   	<form action="" className="login100-form validate-form" onSubmit={this.login}>
                        <span className="login100-form-logo">
                            <i className="zmdi zmdi-landscape"></i>
                        </span>

                        <span className="login100-form-title">
                            Login
                        </span>

                        <div className="wrap-input100 validate-input" data-validate = "Enter username">
                            <label htmlFor="Password">Email:</label>
                            <input className="input100" type="email" name="email" onChange={this.handleChange} />
                            <span className="focus-input100" data-placeholder="&#xf207;"></span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate="Enter password">
                            <label htmlFor="Password">password:</label>
                            <input className="input100" type="password" name="password"  onChange={this.handleChange} />
                            <span className="focus-input100" data-placeholder="&#xf191;"></span>
                        </div>

                        <div className="container-login100-form-btn">
                            <button className="login100-form-btn">
                                Login
                            </button>
                        </div>

                    </form>

                </div>
            </div>
        )
    }
}
