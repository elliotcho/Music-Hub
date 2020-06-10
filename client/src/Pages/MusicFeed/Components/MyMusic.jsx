import React, {Component} from 'react';

const axios=require('axios');

class MyMusic extends Component{
    constructor(){
        super();
        this.state={
            userId: '',
            songs: []
        }
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

    render(){
        const {songs}=this.state;

        const noSongs=<h1 className='noSongs'>No Music Available</h1>

        return(
            <div className='myMusic'>
                {songs.length===0? noSongs: songs}

                <section className='addSong'>
                    <label htmlFor='upload'>+</label>
                    <input id='upload' type='file' accept='mp3'/>
                </section>
            </div>
        )
    }
}

export default MyMusic;