import React, {Component} from 'react';
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

    render(){
        const {firstName, lastName, userId}=this.state;

        return(
            <div className='musicFeed'>
                <header className='container-fluid'>
                    <img src={logo} alt='logo'/>
                    <h1>{firstName} {lastName}</h1>
                    <button><i className='fa fa-sign-out'></i></button>
                </header>

                <ul className='nav nav-tabs'>
                    <li><a className='nav-link' data-toggle='tab' href='#trending'>Trending</a></li>
                    <li><a className='nav-link' data-toggle='tab' href='#recent'>Recent</a></li>
                    <li><a className='nav-link active' data-toggle='tab' href='#mymusic'>My Music</a></li>
                </ul>

                <div className='tab-content'>
                    <section id='trending' className='tab-pane'>
                        <Trending/>
                    </section>

                    <section id='recent' className='tab-pane'>
                        <Recent/>
                    </section>

                    <section id='mymusic' className='tab-pane active'>
                       <MyMusic userId={userId}/>
                    </section>
                </div>
            </div>
        )
    }
}

export default MusicFeed;