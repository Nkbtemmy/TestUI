/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from 'react'
import axios from 'axios'
import '../../assets/sass/styles.scss'


export default class Navigation extends Component {
       constructor(props){
        super(props);
        this.state = {
            user:{} ,
            password: '',
            fireErrors: '',
            person: {
                user_name: "Username"
            }
         }
     }

    logOut = async() =>{
            await axios.post("https://cite-plus-ba-before-mer-imkeud.herokuapp.com/api/v1/user/logout")
          .then(res => {
            console.log(res.status)
            localStorage.removeItem("authToken")
            //this.props.history.push('/login')
            window.location.replace("/"); 
          })
          .catch(err => {
            console.log(err);
          });
    } 
    

  componentDidMount() {
      if (!window.localStorage.getItem("authToken")) {
        //redirect to Login
       window.location.replace("/"); 
      //  history.push("/");
      //router.push("/")
     }

    if (window.localStorage.getItem("authToken")) {
      axios.defaults.headers.common[
        "Authorization"
      ] = window.localStorage.getItem("authToken");
       
      const userData = JSON.parse(window.localStorage.getItem("userData"));
      this.setState(() => ({
        person: {
            ...this.state.person,
            ...userData
        }
       }));
    }
  }
 
    render() {
        return (
            <div className="navigation">
                <div className="menu-icon">
                  <i className="fa fa-bars fa-2x"></i>
               </div>
               <div className="profile">
                   	<span className="login100-form-logo">
						<img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbstars.eu%2Fmedia%2Fdjcatalog2%2Fimages%2Fitem%2F6%2Fakon-rnb_f.jpg&f=1&nofb=1" alt="User image" srcSet=""/>
                        <span>{this.state.person.user_name}</span>
					</span>
                    <div className="logout">
                        <button onClick={this.logOut} >LogOut</button>
                    </div>
               </div>
            </div>
        )
    }
}

