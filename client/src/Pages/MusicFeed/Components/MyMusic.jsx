import React, {Component} from 'react';

class MyMusic extends Component{
    render(){
        const noSongs=<h1 className='noSongs'>No Music Available</h1>

        const songs=[];

        return(
            <div className='myMusic'>
                {noSongs}

                <section className='addSong'>
                    <label htmlFor='upload'>+</label>
                    <input id='upload' type='file' accept='mp3'/>
                </section>
            </div>
        )
    }
}

export default MyMusic;