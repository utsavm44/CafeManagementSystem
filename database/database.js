// const mongoose = require('mongoose')
// mongoose.connect('mongodb://127.0.0.1:27017/RMS',{
//     useNewUrlParser: true,
//     useCreateIndex: true ,
//     useFindAndModify:false,
//     useUnifiedTopology: true
// })
require('colors');

const mongoose = require('mongoose'); //third party to connect mongodb

mongoose.connect('mongodb://127.0.0.1:27017/RMS',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    
    
}, console.log(`Database connected Successfully!!`.yellow.bold))
