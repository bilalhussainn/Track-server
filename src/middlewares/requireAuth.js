const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (req, res, next) => {
    const {authorization} = req.headers  //headers are lowercased automatically

    if(!authorization){
        return res.status(401).send("{error: You must be logged in}")
        
    }

    console.log("authorization",authorization);
    

    const token = authorization.replace('Bearer ','')

    console.log("Token",token);

    jwt.verify(token, "MY_SECRET_KEY!!!", async (err, payload) => {
        console.log("101");
        
        if(err){
            console.log("102");
            return res.status(401).send({error: 'You must be logged in'})
        }
        console.log("103");

        const {userId} = payload
        console.log("104", userId);

        const user = await User.findById(userId)

        console.log("104", user);

        //other req handler migh need the user object . so passing user 
        req.user = user;
        next();
        
    })

}