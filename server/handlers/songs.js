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

exports.getUserSongs = (req, res)=>{
    User.findOne({_id:req.body.userId}).then(result =>{
        const songs=result.songs.map(song =>{
            song.ownerName=result.firstName;
            return song;
        });

        res.json({songs});
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