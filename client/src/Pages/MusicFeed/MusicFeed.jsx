import React, {Component} from 'react';
import MyMusic from './Components/MyMusic';
import logo from './Images/logo.jpg';
import './MusicFeed.css'

class MusicFeed extends Component{
    render(){
        return(
            <div className='musicFeed'>
                <header className='container-fluid'>
                    <img src={logo} alt='logo'/>
                    <h1>Gugsa Challa</h1>
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