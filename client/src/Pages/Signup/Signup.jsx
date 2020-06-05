import React, {Component} from 'react';
import logo from './Images/logo.jpg';
import './Signup.css';

class Signup extends Component{
    render(){
        return(
            <div className='signup text-center text-black'>
                <form>
                    <img src={logo} className='mb-2 ml-2' width='150' height='150' alt='logo'/>

                    <h1 className='mt-4 ml-2 mb-5'>Sign up for Music Hub</h1>

                    <input type='text' placeholder='Your First Name Here'/>
                    
                    <input type='text' placeholder='Your Last Name Here'/>
                    
                    <input type='email' placeholder='Your Email Here'/>
                    
                    <input type='password' placeholder='Your password Here'/>
                    
                    <input type='password' placeholder='Confirm Password'/>

                    <button className='btn-lg btn-danger mt-4'>Submit</button>

                    <p className='mt-4 ml-4'>Already have an account? Login here</p>
                </form>
            </div>
        )
    }
}

export default Signup;