//require modules
const mongoose=require('mongoose');
const multer=require('multer');
const fs=require('fs');
const path=require('path');
const cors=require('cors');
const express=require('express');
const bodyParser= require('body-parser');
const app=express();

//connect to database
mongoose.connect('mongodb://localhost:27017/MusicHub', {
    useUnifiedTopology: true,
    useNewUrlParser: true 
});

mongoose.connection.once('open', ()=>{
    console.log('Connected to database');
}).on('error', err=> {console.log(err);});

//set up audio storage
const storage=multer.diskStorage({
    destination: './audio',
    filename: (req, file, cb)=>{
        cb(null, 'AUDIO-' + Date.now() + path.extname(file.originalname));
    }
});

const upload=multer({
    storage: storage,
    limits: {fileSize: 1000000000}
}).single('audio');

app.use(bodyParser.json());
app.use(cors());

const {
    signup,
    login
}=require('./handlers/users');

const{
    loadSong,
    addSong,
    deleteSong,
    handleLikes,
    getUserSongs,
    getRecentSongs,
    getTrendingSongs,
}=require('./handlers/songs');

app.post('/signup', signup);
app.post('/login', login);

app.post('/addsong', addSong(path, upload));
app.post('/loadsong', loadSong(path));
app.post('/deletesong', deleteSong(fs, path));
app.post('/handlelikes', handleLikes);
app.post('/usersongs', getUserSongs);
app.post('/recentsongs', getRecentSongs);
app.post('/trendingsongs', getTrendingSongs);

app.listen(5000);