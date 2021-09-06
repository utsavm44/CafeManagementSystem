const mongoose = require('mongoose') // database connection
const jwt = require('jsonwebtoken') //Auth Token handle
const bcrypt = require('bcryptjs')
const user = new mongoose.Schema( {
    name: {
        type: String,
        require: true,
        trim: true
    },

    address: {
        type: String,
        trim: true
    },
    phone:{
        type:String,
        require:true,
        trim :true
    },
    gender: {
        type: String,
        require: true,
        trim: true
        
    },
    dob: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    }
    ,
    password: {
        type: String,
        require: true,
        trim: true
    },
    image:{
        type:String,
        trim:true,
        default:'pending'
    },


    tokens: [{
        token: {
            type: String,
        }
    }]
}

)
user.statics.checkCrediantialsDb = async (email, password) => {

    const user = await users.findOne({email: email} )
    if (!user) {
        console.log('user not found')
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error('Invalid login credentials')
    }
    return user
 
}
// login token generate function
user.methods.generateAuthToken = async function () {
    const userAuth = this
    const token = jwt.sign({ _id: userAuth._id.toString() }, 'thisismynewcourse')
 
    console.log(token);
    userAuth.tokens = userAuth.tokens.concat({ token: token })
    await userAuth.save()
    return token
}
const users = mongoose.model('UserDetails', user)
module.exports = users;