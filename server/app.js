const express=require('express');
const bodyParser= require('body-parser');
const app=express();

app.use(bodyParser.json());
app.use(express.static('../client/build'));

app.get('/', (req, res)=>{
    res.sendFile('../client/build/index.html');
});

const {
    signup
}=require('./handlers/users');

app.post('/signup', (req, res)=>{
    res.json({msg: 'successs'});
});

app.listen(3000);