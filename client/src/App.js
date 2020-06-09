import React from 'react';
import {HashRouter, Route} from 'react-router-dom';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import MusicFeed from './Pages/MusicFeed/MusicFeed';

function App() {
  return (
    <HashRouter>
      <Route exact path='/' render={()=><Login/>}/>
      <Route exact path='/signup'render={()=><Signup/>}/>
      <Route exact path='/musicfeed' render={()=><MusicFeed/>}/>
    </HashRouter>
  );
}

export default App;
