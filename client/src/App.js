import React, {Component} from 'react';
import {HashRouter, Route} from 'react-router-dom';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import MusicFeed from './Pages/MusicFeed/MusicFeed';

class App extends Component{
   constructor(){
      super();

      this.state={
        userInfo: {}
      }

      this.getUserInfo=this.getUserInfo.bind(this);
   }

   getUserInfo(info){
      this.setState({
        userInfo: info
      });
   }

   render(){
     return (
        <HashRouter>
            <Route exact path='/' render={()=><Login getUserInfo={this.getUserInfo}/>}/>
            <Route exact path='/signup'render={()=><Signup getUserInfo={this.getUserInfo}/>}/>
            <Route exact path='/musicfeed' render={()=><MusicFeed userInfo={this.state.userInfo}/>}/>
        </HashRouter>
      );
   }
}

export default App;
