const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const SongSchema=new Schema({
    name: String,
    ownerId: String,
    likedBy: [String]
});

const UserSchema =new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    songs: [SongSchema]
});

const Song=mongoose.model('song', SongSchema);
const User=mongoose.model('user', UserSchema);

exports.Song=Song;
exports.User=User;