const {
    User
}=require('../dbschemas');

exports.signup= (req ,res)=>{
   User.findOne({email: req.body.email}).then(result =>{
       if(result!==null){
           res.json({msg: 'Email has been taken by another user'});
       }

       else if(req.body.password!==req.body.confirmPassword){
           res.json({msg: 'Passwords do not match'});
       }

       else{
           const newUser=new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                songs: []
           });

           newUser.save().then(()=>{
              res.json({...newUser, msg: 'Success'});
           });
       }
   });
}