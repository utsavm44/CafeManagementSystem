const mongoose = require('mongoose') // database connection
const employeeadd = mongoose.model('employeeDetails',{
    employee_name: {
        type: String,
        trim: true
    },

    employee_address: {
        type: String,
        trim: true
    },
    employee_phone:{
        type:String,
        trim :true
    },
   
    employee_email: {
        type: String
      
    }
    ,
    employee_image:{
        type:String,
    }

  
}
) 


module.exports=employeeadd