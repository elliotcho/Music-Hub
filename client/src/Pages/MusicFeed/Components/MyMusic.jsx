import React, {Component} from 'react';

import waka from './waka.mp3';

class MyMusic extends Component{
    render(){
        const noSongs=<h1 className='noSongs'>No Music Available</h1>

        const songs=[];

        for(let i=0;i<5;i++){
            songs.push(
            <section className='song container'>
                <h2>Waka<span className='userName'>Gugsa</span></h2>

                <audio controls>
                    <source src={waka} type='audio/mpeg'/>
                </audio>    

                <i className="fa trash">&#xf014;</i>

                <section className='likesContainer'>
                    <i className="fa like">
                        &#xf087;           
                    </i>

                    <span className='likesCount'>1000</span>    
                </section>

                <hr/>
            </section>
            )
        }

        return(
            <div className='myMusic'>
                {songs}

                <section className='addSong'>
                    <label htmlFor='upload'>+</label>
                    <input id='upload' type='file' accept='mp3'/>
                </section>
            </div>
        )
    }
}

export default MyMusic;