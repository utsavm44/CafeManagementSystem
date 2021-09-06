const mongoose = require('mongoose') // database connection
var now = new Date();
//attributes of database and create model
const table = mongoose.model('Table', {     
    user_id :{
        type: mongoose.Schema.ObjectId,
        ref: 'UserDetails',
        require:true,
        trim: true
    },
    
    user_email :{
        type :String,
        require:true,
        trim: true
    },  

    people: {
        type: String,
        require:true,
        trim: true
    },
    
    date:{
        type: String,
        trim: true
    },
    currentdate:{
        type : Date, 
        default: now 
    },

    time:{
        type: String,
        trim: true
    }
    
    
  })

  module.exports = table