import React from 'react';

import waka from './waka.mp3';

function Song(props){
    return(
        <section className='song container'>
            <h2>
                {Waka}
                <span className='userName'>Gugsa</span>
            </h2>

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

export default Song;