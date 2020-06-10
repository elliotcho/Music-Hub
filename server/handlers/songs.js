const {
    User
}=require('../dbschemas');

exports.getUserSongs=(req, res)=>{
    User.findOne({_id:req.body.userId}).then(result =>{
        res.json({songs: result.songs});
    });
}