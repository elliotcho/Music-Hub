//require modules
const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
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

//set up body-parser and static files
app.use(bodyParser.json());
app.use(express.static('../client/build'));

const {
    signup,
    login
}=require('./handlers/users');

const{
    getUserSongs,
    addSong,
    loadSong
}=require('./handlers/songs');

app.get('/', (req, res)=>{
    res.sendFile('../client/build/index.html');
});

app.post('/signup', signup);
app.post('/login', login);

app.post('/loadsong', loadSong(path));
app.post('/usersongs', getUserSongs);
app.post('/addsong', addSong(path, upload));

app.listen(3000);