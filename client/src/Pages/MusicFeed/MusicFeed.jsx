import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Trending from './Components/Trending';
import Recent from './Components/Recent';
import MyMusic from './Components/MyMusic';
import logo from './Images/logo.jpg';
import './MusicFeed.css'

class MusicFeed extends Component{
    constructor(){
        super();

        this.state={
            userId: '',
            firstName: '',
            lastName: '',
        }

        this.logout=this.logout.bind(this);
    }

    componentDidMount(){
        if(JSON.stringify(this.props.userInfo)!==JSON.stringify({})){
            this.setState({
                userId: this.props.userInfo._id,
                firstName: this.props.userInfo.firstName,
                lastName: this.props.userInfo.lastName
            }, ()=>{
                window.localStorage.setItem('state', JSON.stringify(this.state));
            }); 
        }

        else{
            this.setState({
                ...JSON.parse(window.localStorage.getItem('state'))
            }, ()=>{
                window.localStorage.setItem('state', JSON.stringify(this.state));
            }); 
        }
    }

    logout(){
        localStorage.clear();
        window.location.href='/';
    }

    render(){
        const {firstName, lastName, userId}=this.state;

        return(
            <div className='musicFeed'>
                <header className='container-fluid'>
                    <img src={logo} alt='logo'/>
                    
                    <h1>{firstName} {lastName}</h1>
                    
                    <button onClick={this.logout}><i className='fa fa-sign-out'></i></button>
                </header>

                <ul className='nav nav-tabs'>
                    <li><a className='nav-link' data-toggle='tab' href='#trending'>Trending</a></li>
                    <li><a className='nav-link' data-toggle='tab' href='#recent'>Recent</a></li>
                    <li><a className='nav-link active' data-toggle='tab' href='#mymusic'>My Music</a></li>
                </ul>

                <div className='tab-content'>
                    <section id='trending' className='tab-pane'>
                        <Trending userId={userId}/>
                    </section>

                    <section id='recent' className='tab-pane'>
                        <Recent userId={userId}/>
                    </section>

                    <section id='mymusic' className='tab-pane active'>
                       <MyMusic userId={userId}/>
                    </section>
                </div>
            </div>
        )
    }
}

export default withRouter(MusicFeed);