import React, {Component} from 'react';
import MyMusic from './Components/MyMusic';
import logo from './Images/logo.jpg';
import './MusicFeed.css'

class MusicFeed extends Component{
    constructor(){
        super();

        this.state={
            firstName: '',
            lastName: '',
            songs: []
        }
    }

    componentDidMount(){
        console.log(this.props.userInfo);

        if(JSON.stringify(this.props.userInfo)!==JSON.stringify({})){
            this.setState({
                firstName: this.props.userInfo.firstName,
                lastName: this.props.userInfo.lastName,
                songs: this.props.userInfo.songs
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
        const {firstName, lastName}=this.state;

        return(
            <div className='musicFeed'>
                <header className='container-fluid'>
                    <img src={logo} alt='logo'/>
                    <h1>{firstName} {lastName}</h1>
                    <button><i className='fa fa-sign-out'></i></button>
                </header>

                <ul className='nav nav-tabs'>
                    <li><a className='nav-link active' data-toggle='tab' href='#trending'>Trending</a></li>
                    <li><a className='nav-link' data-toggle='tab' href='#recent'>Recent</a></li>
                    <li><a className='nav-link' data-toggle='tab' href='#mymusic'>My Music</a></li>
                </ul>

                <div className='tab-content'>
                    <section id='trending' className='tab-pane active'>
                   
                    </section>

                    <section id='recent' className='tab-pane'>
                        
                    </section>

                    <section id='mymusic' className='tab-pane'>
                       <MyMusic/>
                    </section>
                </div>
            </div>
        )
    }
}

export default MusicFeed;