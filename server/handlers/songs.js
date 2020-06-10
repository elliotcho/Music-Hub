const {
    User, 
    Song
}=require('../dbschemas');

exports.getUserSongs=(req, res)=>{
    User.findOne({_id:req.body.userId}).then(result =>{
        res.json({songs: result.songs});
    });
}

exports.addSong=(path, upload) => (req, res)=>{
    upload(req, res, (err)=>{
        if(err){
            console.log(err);
        }

        User.findOne({_id: req.body.ownerId}).then(result =>{
            const userSongs=result.songs;

            userSongs.push(new Song({
                originalName: path.parse(req.body.originalName).name,
                storageName: req.file.filename,
                ownerId: req.body.ownerId,
                date: Date.now(),
                likedBy: []
            }));

            User.updateOne(
                {_id: result._id},
                {songs: userSongs}
            ).then(()=>{res.json({msg: 'Success'})});
        });
    });
}