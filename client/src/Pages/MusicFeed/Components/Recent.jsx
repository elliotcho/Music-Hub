import React, {Component} from 'react';
import Song from './Song';

const axios=require('axios');

class Recent extends Component{
    constructor(){
        super();

        this.state={
            userId: null,
            songs: []
        }

        this.deleteSong=this.deleteSong.bind(this);
    }

    componentDidMount(){
        this.setState({}, ()=>{
            const {userId} =this.props;

            const config={headers: {'Content-Type': 'application/json'}};

            axios.post('/recentsongs', {}, config)
            .then(response =>{
                const {songs} = response.data;

                this.setState({
                    userId, songs
                });
            });
        });
    }

    deleteSong(id){
        if(!window.confirm("Are you sure you want to delete this post?")){
            return;
        }

        const songs=this.state.songs;

        for(let i=0;i<songs.length;i++){
            if(id===songs[i]._id){
                songs.splice(i, 1);
                break;
            }
        }

        this.setState({songs});

        axios.post('/deletesong', {id}, {headers: {'Content-Type': 'application/json'}})
        .then(()=>{});
    }

    render(){
        const songs=this.state.songs.map(song =>{
            return (<Song 
                        key={song._id}
                        songId={song._id}
                        userId={this.state.userId}
                        ownerId={song.ownerId}
                        songName={song.originalName}
                        ownerName={song.ownerName}
                        numLikes={song.likedBy.length}
                        deleteSong={this.deleteSong}
                    />)
        });

        const noSongs=<h1 className='noSongs'>No Music Available</h1>

        return(
            <div className='recent'>
                {songs.length===0? noSongs: songs}
            </div>
        )
    }
}

export default Recent;