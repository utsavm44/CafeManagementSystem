const mongoose = require('mongoose') // database connection
const foodItem = mongoose.model('FoodDetails', {

    food_name: {
        type: String,
        require: true,
        trim: true
    },

    food_price: {
        type: String,
        require: true,   
    },
    food_desc: {
        type: String,
        require: true,   
    }
    ,
    food_image: {
        type: String
     
    },

  
}

)

module.exports = foodItem;