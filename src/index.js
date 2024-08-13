require('./models/Users')
require('./models/Track') //atleast once in entire project
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes')
const trackRoutes = require('./routes/trackroutes')

const requireAuth = require('./middlewares/requireAuth')

const app = express()  //it represents entire application. //we can associate diffrent route handler with it.
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

//qECJao9vfDu7hSX0
const mongoUri = 'mongodb+srv://bilalhussain:FarzanaZara@cluster0.j5nfbqv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(mongoUri, {
    useNewUrlParser: true,  //just to avoid common error messages
    //useCreateIndex: true  //just to avoid common error messages     // but it gives error. so commented
})

mongoose.connection.on('connected', () => {
    console.log("Connected to mongo instance!!!");
})

mongoose.connection.on('error', (err) => {
    console.log("Error connecting to mongo", err);
})

//API call for root directory. //Here localhost:3001
app.get('/', requireAuth, (req, res) => {
    //my guess is wrong
    // requireAuth(req, res, () => {
    //     res.send("Hi there!.")
    // })
    res.send(`Your email : ${req.user.email}`)
})

app.listen(3001, () => {
    console.log("Listening on Port 3001");
    
})