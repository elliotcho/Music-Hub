const {
    User, 
    Song
}=require('../dbschemas');

exports.loadSong=(path) => (req, res) =>{
    User.find({}).then(result =>{
       let fileName;
       let found=false;
       
       for(let i=0;i<result.length;i++){
            for(let j=0;j<result[i].songs.length;j++){
                let song=result[i].songs[j];

                if(song._id==req.body.id){
                    found=true;
                    fileName=song.storageName;
                    break;
                }
            }

            if(found){break;}
       }

       res.sendFile(path.join(__dirname, '../', `/audio/${fileName}`));
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

exports.deleteSong=(fs, path) => (req, res)=>{
    User.find({}).then(result =>{
        let found=false;

        for(let i=0;i<result.length;i++){
            for(let j=0;j<result[i].songs.length;j++){
                let song=result[i].songs[j];

                if(song._id==req.body.id){
                    found=true;

                    const user=result[i];
                    const idxToRemove=j;

                    fs.unlink(path.join(__dirname, '../', `/audio/${song.storageName}`), (err)=>{
                        if(err){
                            console.log(err);
                        }

                        user.songs.splice(idxToRemove, 1);
                        
                        User.updateOne(
                            {_id: user._id},
                            {songs: user.songs}
                        ).then(()=>{});
                    });

                    break;
                }
            }

            if(found){break;}
        }

        res.json({msg: 'Success'});
    });
}

exports.handleLikes=(req, res) =>{
    if(req.body.action==='check'){
        User.findOne({_id: req.body.ownerId}).then(result => {
            let color='gray';
            let found=false;

            for(let i=0;i<result.songs.length;i++){
                let song=result.songs[i];

                if(song._id!=req.body.songId){continue;}

                for(let j=0;j<song.likedBy.length;j++){
                
                    let like=song.likedBy[j];

                    if(like==req.body.userId){
                        found=true;
                        color='#0000FF';
                        break;
                    }
                }

                if(found){break;}
            }

            res.json({color});
        });
    }

    else if(req.body.action==='like'){
        User.findOne({_id: req.body.ownerId}).then(result =>{
            for(let i=0;i<result.songs.length;i++){
                let song=result[i];

                if(song._id==req.body.songId){
                    song.likedBy.push(req.body.userId);
                    break;
                }
            }

            res.json({msg: 'Success'});
        });
    }

    else{
        User.findOne({_id: req.body.ownerId}).then(result =>{
            found=false;
            const songs=result.songs;

            for(let i=0;i<songs.length;i++){
                if(songs[i]._id!=req.body.songId){continue;}

                for(let j=0;j<songs[i].likedBy.length;j++){
                    if(songs[i].likedBy[j]==req.body.userId){
                        found=true;
                        
                        songs[i].likedBy.splice(j, 1);

                        User.updateOne({_id: req.body.ownerId}, {songs}).then(()=>{});

                        break;
                    }
                }

                if(found){break;}
            }

            res.json({msg: 'Success'});
        });
    }
}

exports.getUserSongs = (req, res)=>{
    User.findOne({_id:req.body.userId}).then(result =>{
        result.songs.sort((a, b) => b.date-a.date);

        const songs=result.songs.map(song =>{
            const modified={...song._doc};
            modified.ownerName=result.firstName;
            return modified;
        });

        res.json({songs});
    });
}