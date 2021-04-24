import React, { Component } from 'react'
import axios from 'axios'
import '../../assets/sass/styles.scss'
import 'bootstrap/dist/css/bootstrap.min.css';


export default class Logins extends Component {
        constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            fireErrors: '',
            userDetails:"",
            emailError:'',
            passwordError:'',
        };
            this.baseState = {emailError:'',passwordError:'' }
        }
    
     reset = () => {
        this.setState(this.baseState)
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
            window.location.replace("/dashboard"); 
            
        })
        .catch(err => {
            console.log(err.response.data.status);
            const msg = err.response.data.message;
            err.response.data.status === 400 ?
                //1.true
                msg.search("email") !==-1 ?
                    //1.1.true
                    this.setState({emailError:err.response.data.message})
                    //1.1. false
                    :this.setState({passwordError:err.response.data.message})
                //1.false 
                : this.setState({fireErrors:err.response.data.message}); console.log(msg)
                
            });
  }

    render() {
        return (
            <div className="login" >
                <div className='loginCont'>
                   	<form action="" method="get" onSubmit={this.login} className="login100-form validate-form" >
                        <span className="login100-form-logo">
                            <i className="zmdi zmdi-landscape"></i>
                        </span>

                        <span className="login100-form-title">
                            Login
                        </span>
                            <span className="focus-input100 " data-placeholder="&#xf191;">{this.state.fireErrors}</span>
                        <div className="wrap-input100 validate-input" data-validate = "Enter username">
                            <label htmlFor="email">Email:</label>
                            <input className="input100" type="email" name="email" onChange={this.handleChange} />
                            <span className="focus-input100" data-placeholder="&#xf207;">{this.state.emailError}</span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate="Enter password">
                            <label htmlFor="Password">password:</label>
                            <input className="input100" type="password" name="password"  onChange={this.handleChange} />
                            <span className="focus-input100" data-placeholder="&#xf191;">{this.state.passwordError}</span>
                        </div>

                        <div className="container-login100-form-btn">
                            <button className="login100-form-btn" onClick={this.reset}>
                                Login
                            </button>
                        </div>

                    </form>

                </div>
            </div>
        )
    }
}
