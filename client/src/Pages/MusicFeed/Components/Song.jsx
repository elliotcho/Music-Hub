import React, {Component} from 'react';

class Song extends Component{
    render(){
        return(
            <section className='song container'>
                <h2>
                    Waka
                    <span className='userName'>Gugsa</span>
                </h2>

                <audio controls='controls' src={this.props.file} type='audio/mpeg'/> 

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
}

export default Song;