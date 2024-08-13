const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

   //pre save hook
userSchema.pre('save', function(next) { //TO get the access of user instance from this keyword, we are using funtion() here, instead of arrow funcction.
    //this;  // on fucntion() 'this'  will be user    //on arrow function if we use 'this' here it will refer cass's whole context.
    console.log("Pre save hook");
    
    const user = this;

    if(!user.isModified('password')){
        return next()
    }

    //10 refers how complex this salt is we going to generate.
    bcrypt.genSalt(10, (err, salt) => {
        if(err){
            return next(err);
        }
        
        bcrypt.hash(user.password, salt, (err, hash) => {
            if(err){
                return next(err);
            }

            user.password = hash
            next();
        })
    })
})

userSchema.methods.comparePassword = function(candidatePassword) {
    const user = this;
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
            if(err){
                return reject(err);
            }

            if(!isMatch){
                return reject(false);
            }

            return resolve(true)
        });
    })
}

mongoose.model('User', userSchema);