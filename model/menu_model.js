const mongoose = require('mongoose') // database connection
const menuAdd = mongoose.model('MenuDetails', {

    menu_name: {
        type: String,
        require: true,
        trim: true
    },

    menu_title: {
        type: String,
        trim: true
    },

    menu_price: {
        type: String,
        require: true,   
    },
    menu_desc: {
        type: String,
        require: true,   
    }
    ,
    menu_image: {
        type: String
     
    }

  
}

)

module.exports = menuAdd;