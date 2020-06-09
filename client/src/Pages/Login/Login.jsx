import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import logo from './Images/logo.jpg';
import './Login.css';

class Login extends Component{
    constructor(){
        super();
        this.toSignup=this.toSignup.bind(this);
    }

    toSignup(){
        this.props.history.push('/signup');
    }

    render(){
        return(
            <div className='login text-center'>
                <form className='form-signin mb-5'>
                    <img src={logo} className='mb-4 ml-3' width='100' height='100' alt='logo'/>

                    <h1 className='mb-4 ml-4'>Music Hub</h1>

                    <input type='email' placeholder='Email address'/>
                    <input type='password' placeholder='Password' className='mb-4'/>

                    <button className='btn-lg btn-danger ml-2 mb-5'>Login</button>

                    <p className='mt-5 ml-3' onClick={this.toSignup}>Don't have an account? Sign up here</p>
                </form>
            </div>
        )
    }
}

export default withRouter(Login);