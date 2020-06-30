import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import logo from './Images/logo.jpg';
import './Login.css';

const axios=require('axios');

class Login extends Component{
    constructor(){
        super();
        this.toSignup=this.toSignup.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    toSignup(){
        this.props.history.push('/signup');
    }

    handleSubmit(e){
        e.preventDefault();

        const data={
            email: e.target.email.value,
            password: e.target.password.value
        }

        const config={
            headers: {'content-type': 'application/json'}
        }

        axios.post('http://localhost:5000/login', data, config)
        .then(response =>{
            const {msg, _doc}=response.data;

            if(msg==='Success'){
                this.props.getUserInfo(_doc);
                this.props.history.push('/musicfeed');
            }

            else{
                alert(msg);
            }
        });
    }

    render(){
        return(
            <div className='login text-center'>
                <form onSubmit={this.handleSubmit} className='form-signin mb-5'>
                    <img src={logo} className='mb-4 ml-3' width='100' height='100' alt='logo'/>

                    <h1 className='mb-4 ml-4'>Music Hub</h1>

                    <input name='email' type='email' placeholder='Email address'/>
                    <input name='password' type='password' placeholder='Password' className='mb-4'/>

                    <button className='btn-lg btn-danger ml-2 mb-5'>Login</button>

                    <p className='mt-5 ml-3' onClick={this.toSignup}>Don't have an account? Sign up here</p>
                </form>
            </div>
        )
    }
}

export default withRouter(Login);