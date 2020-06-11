import React, {Component} from 'react';
import Song from './Song';

const axios=require('axios');

class MyMusic extends Component{
    constructor(){
        super();

        this.state={
            songs: []
        }

        this.deleteSong=this.deleteSong.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }

    componentDidMount(){
        this.setState({}, ()=>{
            const {userId}=this.props;

            const data={userId}
            const config={headers: {'content-type': 'application/json'}};
            
            axios.post('/usersongs', data, config)
            .then(response => {
                this.setState({songs: response.data.songs});
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

        this.setState({songs: songs});

        axios.post('/deletesong', {id: id}, {headers: {'Content-Type': 'application/json'}})
        .then(()=>{
            return;
        });
    }

    handleChange(e){
        const audioFile=e.target.files[0];

        const formData=new FormData();

        formData.append('ownerId', this.props.userId);
        formData.append('originalName', audioFile.name)
        formData.append('audio', audioFile);

        const config={headers: {'content-type': 'multipart/form-data'}};

        axios.post('/addsong', formData, config).then(()=>{window.location.reload()});
    }

    render(){
        const songs=this.state.songs.map(song =>
            <Song 
                key={song._id}
                songId={song._id}
                songName={song.originalName}
                ownerName={song.ownerName}
                numLikes={song.likedBy.length}
                deleteSong={this.deleteSong}
            />
        );

        const noSongs=<h1 className='noSongs'>No Music Available</h1>

        return(
            <div className='myMusic'>
                {songs.length===0? noSongs: songs}

                <section className='addSong'>
                    <label htmlFor='upload'>+</label>
                    <input id='upload' 
                           onChange={this.handleChange} 
                           type='file'
                           accept='mp3'
                    />
                </section>
            </div>
        )
    }
}

export default MyMusic;