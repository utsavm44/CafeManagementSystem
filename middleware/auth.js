const jwt = require('jsonwebtoken')// token handle
const User = require('../model/user_model') // user model
const Admin = require('../model/admin_model') // user model


// auth token verify function
// module.exports.verifyUser = function(req,res,next){
//     try{
//         const token = req.headers.authorization.split(" ")[1]; //token only
//         console.log(token)
//         const decodeData = jwt.verify(token, 'secretkey')
//         User.findOne({_id : decodeData.userId})
//         .then(function(result){
//             //success
//             req.user = result
//             next()
            
           
//         }
//     )
//         .catch(function(err){
//             res.status(401).json({message : err})
//         })
//     }
//     catch(err){
//         res.status(401).json({message : "Unauthorized access!!"})
//     }
// }

// // admin auth token verify function
// module.exports.verifyAdmin = function(req,res,next){
//     try{
//         const token = req.headers.authorization.split(" ")[1]; //token only
//         console.log(token)
//         const decodeData = jwt.verify(token, 'secretkey')
//         Admin.findOne({_id : decodeData.userId})
//         .then(function(result){
//             //success
//             req.user = result
//             next()
            
           
//         }
//     )
//         .catch(function(err){
//             res.status(401).json({message : err})
//         })
//     }
//     catch(err){
//         res.status(401).json({message : "Unauthorized access!!"})
//     }
// }


module.exports.verifyUser = async(req,res,next) =>{
    try {
     console.log(req.header('Authorization'))
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, 'thisismynewcourse')
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token
   })
   console.log(user)
    if (!user) {
    throw new Error()
    }
    req.token = token
    req.user = user
    next()
    } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' })
    }
    
}
 
module.exports.verifyAdmin=  async (req, res, next) => {
    try {
        console.log(req.header('Authorization'))
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, 'thisismynewcourse')
    const user = await Admin.findOne({ _id: decoded._id, 'tokens.token': token
   })
    if (!user) {
    throw new Error()
    }
    req.token = token
    req.user = user
    next()
    } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' })
    }
   }


//    module.exports.varifyU=function(req,res,next){
//     try{
//         const token=req.headers.authorization.split(" ")[1];
//         console.log(token)
//         const decodedData=jwt.verify(token,'secretkey');
//         User.findById({_id:decodedData.userId}).then(function(alldata){
//             req.user=alldata;
//             next()
//         }).catch(function(err){
//             return res.status(201).json({success:true,msg:"Unauthorized access!!"})
//         })
//     }
//     catch(err){
//         return res.status(201).json({success:true,msg:"Unauthorized access!!"})
//     }
// }

// auth token verify function
module.exports.varifyU = function(req,res,next){
    try{
        const token = req.headers.authorization.split(" ")[1]; //token only
        console.log(token)
        const decodeData = jwt.verify(token, 'secretkey')
        User.findOne({_id : decodeData.userId})
        .then(function(result){
            //success
            req.user = result
            next()
            
           
        }
    )
        .catch(function(err){
            res.status(401).json({message : err})
        })
    }
    catch(err){
        res.status(401).json({message : "Unauthorized access!!"})
    }
}

