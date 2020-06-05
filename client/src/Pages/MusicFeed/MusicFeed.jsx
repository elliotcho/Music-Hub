import React, {Component} from 'react';

class MusicFeed extends Component{
    render(){
        return(
            <div className='musicFeed'>
                <header className='text-center'>
                    <h1 className='mb-5'>Gugsa Challa</h1>
                </header>

                <ul className='nav nav-tabs'>
                    <li><a className='nav-link active' data-toggle='tab' href='#trending'>Trending</a></li>
                    <li><a className='nav-link' data-toggle='tab' href='#recent'>Recent</a></li>
                    <li><a className='nav-link' data-toggle='tab' href='#mymusic'>My Music</a></li>
                </ul>

                <div className='tab-content'>
                    <section id='trending' className='tab-pane active'>
                        Trending
                    </section>

                    <section id='recent' className='tab-pane'>
                        Recent
                    </section>

                    <section id='mymusic' className='tab-pane'>
                        My Music
                    </section>
                </div>
            </div>
        )
    }
}

export default MusicFeed;