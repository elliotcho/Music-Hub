import React, {Component} from 'react';
import logo from './Images/logo.jpg';
import './Signup.css';

class Signup extends Component{
    render(){
        return(
            <div className='signup text-center text-white'>
                <form>
                    <img src={logo} className='mr-4 mb-5 ml-2' width='150' height='150' alt='logo'/>

                    <h1 className='mb-5'>Sign up for Music Hub</h1>

                    <input type='text' placeholder='Your First Name Here'/>
                    
                    <input type='text' placeholder='Your Last Name Here'/>
                    
                    <input type='email' placeholder='Your Email Here'/>
                    
                    <input type='password' placeholder='Your password Here'/>
                    
                    <input type='password' placeholder='Confirm Password'/>

                    <button className='btn-lg btn-danger mt-4'>Submit</button>
                </form>
            </div>
        )
    }
}

export default Signup;