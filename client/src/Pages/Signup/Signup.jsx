import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import logo from './Images/logo.jpg';
import './Signup.css';

const axios=require('axios');

class Signup extends Component{
    constructor(){
        super();
        this.toLogin=this.toLogin.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    toLogin(){
        this.props.history.push('/');
    }

    handleSubmit(e){
        e.preventDefault();

        const data={
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email: e.target.email.value,
            password: e.target.password.value,
            confirmPassword: e.target.confirmPassword.value
        }

        const config={
            headers: {'content-type': 'application/json'}
        }

        axios.post('/signup', data, config)
        .then(response => {
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
            <div className='signup text-center text-black'>
                <form onSubmit={this.handleSubmit}>
                    <img src={logo} className='mb-2 ml-2' width='150' height='150' alt='logo'/>

                    <h1 className='mt-4 ml-2 mb-5'>Sign up for Music Hub</h1>

                    <input name='firstName' 
                           type='text' 
                           placeholder='Your First Name Here'
                           minLength='1'
                           maxLength='32'
                           required={true}
                    />
                    
                    <input name ='lastName' 
                           type='text' 
                           placeholder='Your Last Name Here'
                           minLength='1'
                           maxLength='32'
                           required={true}
                    />
                    
                    <input name='email' 
                           type='email' 
                           placeholder='Your Email Here'
                           minLength='1'
                           maxLength='50'
                           required={true}
                    />

                    <input name='password' 
                           type='password' 
                           placeholder='Your password Here'
                           minLength='1'
                           maxLength='50'
                           required={true}
                    />

                    <input name='confirmPassword' 
                           type='password' 
                           placeholder='Confirm Password'
                           minLength='1'
                           maxLength='50'
                           required={true}
                    />

                    <button className='btn-lg btn-danger mt-4'>Submit</button>

                    <p className='mt-4 ml-4' onClick={this.toLogin}>Already have an account? Login here</p>
                </form>
            </div>
        )
    }
}

export default withRouter(Signup);