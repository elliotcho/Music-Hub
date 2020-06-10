import React, {Component} from 'react';

const axios=require('axios');

class Song extends Component{
    constructor(){
        super();

        this.state={
            songName: '',
            ownerName: '',
            url: '',
            numLikes: 0
        }
    }

    componentDidMount(){
        this.setState({}, ()=>{
            this.setState({
                songName: this.props.songName,
                ownerName: this.props.ownerName,
                numLikes: this.props.numLikes
            });

            const config={headers: {'Content-Type': 'application/json'}};

            axios.post('/loadsong', {id: this.props.songId}, config).then(response =>{
                this.setState({url: URL.createObjectURL(new Blob([response.data]))});
            });
        });
    }

    render(){
        const {songName, ownerName, url, numLikes} =this.state;

        console.log(url);

        return(
            <section className='song container'>
                <h2>
                    {songName}
                    <span className='userName'>{ownerName}</span>
                </h2>

                <audio controls='controls' src={url} type='audio/mpeg'/> 

                <i className="fa trash">&#xf014;</i>

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