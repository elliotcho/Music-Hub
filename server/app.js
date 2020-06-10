//require modules
const mongoose=require('mongoose');
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
}).on('error', err=> {
    console.log(err);
});

//set up body-parser and static files
app.use(bodyParser.json());
app.use(express.static('../client/build'));

const {
    signup
}=require('./handlers/users');

app.get('/', (req, res)=>{
    res.sendFile('../client/build/index.html');
});

app.post('/signup', signup);

app.listen(3000);