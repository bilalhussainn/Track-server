const express = require('express')
const mongoose = require('mongoose')
const auth = require('../middlewares/requireAuth')
const requireAuth = require('../middlewares/requireAuth')

const Track = mongoose.model('Track')

const router = express.Router()

router.use(requireAuth)

router.get('/tracks', async (req, res) => {
    //req.user._id

    const email = req.user.email
    const password = req.user.password

    const tracks = await Track.find({userId: req.user._id})

    res.send({email, password, tracks });
})

router.post('/tracks', async (req, res) => {

    const {name, locations} = req.body

    if(!name || !locations){
        return res.status(422).send({error: "You must provide a name and loations."})
    }

    try{
    const track = new Track({name, locations, userId: req.user._id})
    await track.save();
    res.send(track);
    }catch(err){
     res.status(422).send({error: err.message})
    }


})



module.exports = router