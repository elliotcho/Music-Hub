import React, {Component} from 'react';

class Trending extends Component{
    render(){
        const noSongs=<h1 className='noSongs'>No Music Available</h1>

        return(
            <div className='trending'>
                {noSongs}
            </div>
        )
    }
}

export default Trending;