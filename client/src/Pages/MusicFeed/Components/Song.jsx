import React, {Component} from 'react';

const axios=require('axios');

class Song extends Component{
    constructor(){
        super();

        this.state={
            songId: '',
            userId: '',
            ownerId: '',
            songName: '',
            ownerName: '',
            url: '',
            numLikes: 0
        }

        this.handleMouseLeave=this.handleMouseLeave.bind(this);
        this.handleLike=this.handleLike.bind(this);
    }

    componentDidMount(){
        this.setState({}, ()=>{
            const {
                songId, 
                userId, 
                ownerId, 
                songName, 
                ownerName, 
                numLikes
            }=this.props;

            this.setState({
                songId, userId, ownerId, songName, ownerName, numLikes
            });

           fetch('http://localhost:5000/loadsong', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({id: this.props.songId})
           }).then(response => response.blob())
           .then(obj =>{
                this.setState({url: URL.createObjectURL(obj)});  
           });

           const config={headers: {'Content-Type': 'application/json'}}

           axios.post('http://localhost:5000/handlelikes', {action:'check', userId, ownerId, songId}, config)
           .then(response => {
                this.setState({likeColor: response.data.color});
           });
        });
    }

    handleMouseOver(e){
        if(e.target.style.color==='gray'){
            e.target.style.color='rgb(0, 0, 254)';
        }
    }

    handleMouseLeave(e){
        e.target.style.color=this.state.likeColor;
    }

    handleLike(e){
        let {numLikes, songId, ownerId, userId}=this.state;

        let action;

        if(e.target.style.color==='rgb(0, 0, 254)' || e.target.style.color==='gray'){
            this.setState({likeColor: 'blue', numLikes:numLikes+1});
            action='like';
        }

        else{
            this.setState({likeColor: 'gray', numLikes:numLikes-1});
            action='unlike';
        }

        const data={action, songId, ownerId, userId}
        const config={headers: {'Content-Type': 'application/json'}};

        axios.post('http://localhost:5000/handlelikes', data, config)
        .then(()=> {});
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
                <h2>{songName}</h2>
                <div className='userName'>{ownerName}</div>

                <audio controls='controls' src={url} type='audio/mpeg'/> 

                <i className="fa trash" 
                   onClick={()=>{this.props.deleteSong(songId)}}
                   style={userId!==ownerId? {visibility: 'hidden'}: {visibility: 'visible'}}
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