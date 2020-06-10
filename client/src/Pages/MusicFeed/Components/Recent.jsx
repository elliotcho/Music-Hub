import React, {Component} from 'react';

class Recent extends Component{
    render(){
        const noSongs=<h1 className='noSongs'>No Music Available</h1>

        return(
            <div className='recent'>
                {noSongs}
            </div>
        )
    }
}

export default Recent;