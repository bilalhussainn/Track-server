const express = require('express');
const mongoose = require('mongoose')
const User = mongoose.model('User')
const jwt = require('jsonwebtoken')
//const mongodb = require('mongodb')

const router = express.Router();

router.post('/signup', async (req, res) => {
    console.log("SignUp");
    
    console.log(req.body);
    const {email, password} = req.body 
    console.log("email: ", req);

    console.log("email: ", email);
    console.log("password: ", password);
    

    try{
        console.log("SignUp try");
        const user = new User({email, password});
        console.log("SignUp try 101");
        await user.save(); //its an asynchronous operation. 
        console.log("SignUp saved");

        const token = jwt.sign({userId: user._id}, 'MY_SECRET_KEY!!!')

        res.send({token});
    } catch(err) {
        console.log("signup error : ", err);
        
        return res.status(422).send(err.message) //invalid request
    }

    //const 
   
})

router.post('/signin', async (req, res) => {
    const {email, password} = req.body;

    if(!email, !password){
        return res.status(422).send({error: "Must provide email and password"}) //invalid request
    }

    const user = await User.findOne({email: email});

    if(!user){
        //return res.status(404).send({error: "Email not found"})  // dont use specific error message. hackers will know more information. // also try to use common error code as much as possible.
        return res.status(422).send({error: "Invalid email or password"})  
    }

    try{
        console.log("try BlocK");
        
        //const result = await user.comparePassword(password) // dont need to check the result
        await user.comparePassword(password) 
        console.log("try BlocK");
        //if(result){
            const token = jwt.sign({userId: user._id}, 'MY_SECRET_KEY!!!')
            res.send({token});
        //}
    }catch(err){
        return res.status(422).send({error: "Invalid Password or email!!"})
    }
})


// userId : 66b2874b1d32bd5191d21593
// {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmIyODc0YjFkMzJiZDUxOTFkMjE1OTMiLCJpYXQiOjE3MjI5NzYwNzV9.JBjWrf7vuTnZhFgOTNyvhZaQ5Zct7KUhT-xQd9DQVtA"
// }

module.exports = router