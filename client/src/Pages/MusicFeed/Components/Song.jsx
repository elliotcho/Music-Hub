import React, {Component} from 'react';

const axios=require('axios');

class Song extends Component{
    constructor(){
        super();

        this.state={
            userId: '',
            songId: '',
            songName: '',
            ownerName: '',
            url: '',
            numLikes: 0, 
            likeColor: 'gray'
        }

        this.handleMouseLeave=this.handleMouseLeave.bind(this);
        this.handleLike=this.handleLike.bind(this);
    }

    componentDidMount(){
        this.setState({}, ()=>{
            this.setState({
                userId: this.props.userId,
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

    handleMouseOver(e){
        if(e.target.style.color==='gray'){
            e.target.style.color='#0000FE';
        }

        else{
            e.target.style.color='#0000FF';
        }
    }

    handleMouseLeave(e){
        e.target.style.color=this.state.likeColor;
    }

    handleLike(e){
        console.log(e.target.style.color);
    }

    render(){
        const {
               songId, 
               userId, 
               ownerId, 
               songName, 
               ownerName, 
               url, 
               numLikes, 
               likeColor
        } =this.state;
        
        return(
            <section className='song container'>
                <h2>
                    {songName}
                    <span className='userName'>{ownerName}</span>
                </h2>

                <audio controls='controls' src={url} type='audio/mpeg'/> 

                <i className="fa trash" 
                   onClick={()=>{this.props.deleteSong(songId)}}
                   style={userId==ownerId? {visibility: 'hidden'}: {visibility: 'visible'}}
                >
                    &#xf014;
                </i>

                <section className='likesContainer'>
                    <i className="fa like" 
                        onClick={this.handleLike} 
                        onMouseOver={this.handleMouseOver}
                        onMouseLeave={this.handleMouseLeave}
                        style={{color: likeColor}}
                    >
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