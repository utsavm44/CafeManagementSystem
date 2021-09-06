const express = require('express'); //third party
const router = express.Router();
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const Admin = require('../model/admin_model');
const auth = require('../middleware/auth');
var ObjectID = require('mongodb').ObjectID; 
const upload = require ('../middleware/upload');


// Add Admin
router.post('/admin/add',
//validation
[
    check('email', "Invalid Emial Address ").isEmail(),
    check('name', "You must enter name").not().isEmpty(),
    check('address', "You must enter Address").not().isEmpty()
], 
function(req,res){
    const  errors = validationResult(req)
    console.log(errors.array())
    if(!errors.isEmpty()){
        res.status(400).json(errors.array())
    }
     else {
        
        const name = req.body.name
        const address = req.body.address
        const email = req.body.email
        const phone = req.body.phone

        const password = req.body.password

        bcrypt.hash(password,10, function(err, hash){
            console.log(hash)
            const me = new Admin({name : name,  address:address,  email:email, password:hash,phone:phone});
            me.save()
            .then(function(result){
                // success insert
                res.status(201).json({a : "Registered success"});

            })
            .catch(function(err){
                res.status(500).json({message : err})
            });
            console.log("Sucessfully Registered");
        })

    
        
    }
})

//admin login 
router.post('/admin/login', async function (req, res) {
  try{
    const email = req.body.email
    const password = req.body.password
    const Users = await Admin.checkCrediantialsDb(email,
      password)
  const token = await Users.generateAuthToken()
      res.status(200).json({
        success: true,
        message: "admin login success",
        token: token,
        id: Users._id
      })
    }
    
    catch(e){
      const token = ""
      res.status(200).json({
        success:false,
        message:"invalid credential",
        token:token
      })
    }
  })

  // display all admin
  router.get('/admin/display',auth.verifyAdmin, function (req, res) {

    Admin.find().then(function (data) {
      res.send(data)
  
    })
  })

  // to Delete admin
  router.delete('/admin/delete/:id', auth.verifyAdmin, function (req, res) {
    const id = req.params.id
    Admin.deleteOne({ _id: id })
      .then(function (result) {
        console.log("Deleted!!")
        res.status(200).json({ a: "deleted successfully", success: true });
  
  
      })
      .catch(function (err) {
        console.log("here")
        res.status(500).json({ message: err })
      })
  
  })

// admin update
router.put('/admin/update',auth.verifyAdmin, function(req,res){
    const name = req.body.name
    const address = req.body.address
    const email = req.body.email
    const id = req.body.id

    Admin.updateOne({_id : id}, {
        name:name,
        address:address,
        email:email
    }
      )
    .then(function(result){
      res.status(200).json({message:"Menu Updated",success: true,})
    })
    console.log("here")
    .catch(function(e){
      res.status(500).json({
        message:e,success: false
      })
    })

  })

  // Admin profile check
  router.get('/checklogin',auth.verifyAdmin, async function(req,res) {
    // res.send(req.data)
   
        res.send(req.user)
})

//admin logout
router.delete('/logout/admin', auth.verifyAdmin, function(req,res){
  
  Admin.findById(req.user._id, function(err, userdata){
    console.log(req.token)
  var  deletetoken = {token : req.token}
  var  delete1 = userdata.tokens.splice(userdata.tokens.indexOf(deletetoken), 1);
    userdata.tokens= userdata.tokens.pull(delete1[0]._id)
    console.log(userdata.tokens)
    userdata.save((err, data) => {
        if(err) return res.send({
            success : false,
            message : err.message
        })
    })
    return res.send({
        success : true,
        message : "Logged Out",

    })
})
})

// Update Admin user
router.put('/user/updateadmin/:_id',auth.verifyAdmin, function(req,res){
  console.log(req.body);
  console.log(req.params._id)
  Admin.findOneAndUpdate({_id:ObjectID(req.params._id)}, req.body).then(function () {
      res.status(200).send().catch(function (e) {
          res.status(400).send()
      })
  })

  })

  // Update Image
 router.put('/updateAdminProfile/:_id',auth.verifyAdmin,upload.single('image'),function(req,res){
  try{
        const User = {
            image: req.file.filename
        }
        Admin.findOneAndUpdate({_id:ObjectID(req.params._id)}, User).then(function () {
            res.status(200).send().catch(function (e) {
                res.status(400).send()
            })
        })
      }
      catch{
        console.log("profile pic not updated")
  
      }
    
  })
//admin logout
// router.delete('/logout')
module.exports = router;