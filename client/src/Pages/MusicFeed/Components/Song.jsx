import React, {Component} from 'react';

const axios=require('axios');

class Song extends Component{
    constructor(){
        super();

        this.state={
            songId: '',
            songName: '',
            ownerName: '',
            url: '',
            numLikes: 0
        }
    }

    componentDidMount(){
        this.setState({}, ()=>{
            this.setState({
                songId: this.props.songId,
                songName: this.props.songName,
                ownerName: this.props.ownerName,
                numLikes: this.props.numLikes
            });

           fetch('/loadsong', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({id: this.props.songId})
           }).then(response => response.blob())
           .then(obj =>{
                this.setState({url: URL.createObjectURL(obj)});  
           });
        });
    }

    render(){
        const {songId, userId, ownerId, songName, ownerName, url, numLikes} =this.state;
        
        return(
            <section className='song container'>
                <h2>
                    {songName}
                    <span className='userName'>{ownerName}</span>
                </h2>

                <audio controls='controls' src={url} type='audio/mpeg'/> 

                <i className="fa trash" 
                   onClick={()=>{this.props.deleteSong(songId)}}
                   style={userId===ownerId? {visibility: 'hidden'}: {visibility: 'visible'}}
                >
                    &#xf014;
                </i>

                <section className='likesContainer'>
                    <i className="fa like">
                        &#xf087;           
                    </i>

                    <span className='likesCount'>{numLikes===0? null: numLikes}</span>    
                </section>

                <hr/>
            </section>
        )
    }
}

export default Song;