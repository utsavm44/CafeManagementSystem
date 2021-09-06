const express = require('express'); //third party
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const UserRegistration = require('../model/user_model');
const upload = require('../middleware/upload');
const androidupload = require('../middleware/androidupload');



const multer = require('multer')


const { route } = require('./admin_route');
const auth = require('../middleware/auth');
var ObjectID = require('mongodb').ObjectID;

// Add User
router.post('/user/add',
  //validation
  [

    check('email', "Invalid Email Address ").isEmail(),
    check('name', "You must enter name").not().isEmpty(),
    check('address', "You must enter Address").not().isEmpty()
  ],
  function (req, res) {
    console.log("HERE")
    const errors = validationResult(req)
    console.log(errors.array())
    if (!errors.isEmpty()) {
      res.status(400).json(errors.array())
    }

    else {

      const name = req.body.name
      const phone = req.body.phone
      const gender = req.body.gender
      const dob = req.body.dob
      const address = req.body.address
      const email = req.body.email
      const image = req.body.image
      const password = req.body.password

      bcrypt.hash(password, 10, function (err, hash) {
        console.log(hash)
        const me = new UserRegistration({

          name: name,
          dob: dob,
          phone: phone,
          gender: gender,
          address: address,
          email: email,
          image: image,
          password: hash
        });

        me.save()
          .then(function (result) {
            // success insert
            console.log(result)
            res.status(200).json({ success: true, a: "Registered success" });

          })
          .catch(function (err) {
            res.status(201).json({ success: false, message: err })
          });
        console.log("Sucessfully Registered");
      })



    }
  })

//function for Login Function
router.get('/checkuserlogin', auth.verifyUser, async function (req, res) {
  // res.send(req.data)

  res.send(req.user)




})

router.post('/user/login', async function (req, res) {
  try {
    const email = req.body.email
    const password = req.body.password
    const Users = await UserRegistration.checkCrediantialsDb(email,
      password)
    const token = await Users.generateAuthToken()
    res.status(200).json({
      success: true,
      message: "user login success",
      token: token,
      id: Users._id
    })
  }
  catch (e) {
    // const token = ""
    res.status(200).json({
      success: false,
      message: "invalid credential",
      //   token: token
    })
  }
})
// Update user
router.put('/user/update/:_id', auth.verifyUser, function (req, res) {
  console.log(req.body);
  console.log(req.params._id)
  UserRegistration.findOneAndUpdate({ _id: ObjectID(req.params._id) }, req.body).then(function () {
    res.status(200).send().catch(function (e) {
      res.status(400).send()
    })
  })

})



//delete User details
router.delete('/user/delete/:id', auth.verifyAdmin, function (req, res) {
  const id = req.params.id
  UserRegistration.deleteOne({ _id: id })
    .then(function (result) {
      console.log("Deleted!!")
      res.status(200).json({ a: "deleted successfully", success: true });


    })
    .catch(function (err) {
      console.log("here")
      res.status(500).json({ message: err })
    })

})

// Update Image
router.put('/updateProfile/:_id', auth.verifyUser, upload.single('image'), function (req, res) {
  try {
    const User = {
      image: req.file.filename
    }
    UserRegistration.findOneAndUpdate({ _id: ObjectID(req.params._id) }, User).then(function () {
      res.status(200).send().catch(function (e) {
        res.status(400).send()
      })
    })
  }
  catch {
    console.log("profile pic not updated")

  }

})

//get one user by _id for Android
router.get('/user/display/:id', auth.verifyUser, function (req, res) {
  console.log("In api")
  const id = req.params.id
  console.log(req.params.id)

  UserRegistration.find({ _id: id })
    .then(function (data) {
      res.status(200).json({ success: true, data: data });
      console.log(data)
    })

    .catch(function (e) {
      res.status(200).json({ success: false, message: "Error" })
    })
})

// for Web Applicaion
router.get('/user/display/api/:id', auth.verifyAdmin, function (req, res) {
  console.log("In api")
  const id = req.params.id
  console.log(req.params.id)

  UserRegistration.findOne({ _id: id })
    .then(function (data) {
      res.status(200).json({ success: true, data: data });
      console.log(data)
    })

    .catch(function (e) {
      res.status(200).json({ success: false, message: "Error" })
    })
})

//display
router.get('/user/display', function (req, res) {

  UserRegistration.find().then(function (data) {
    res.send(data)

  })
})
router.put('/user/adminupdate/:id', auth.verifyAdmin, (req, res) => {
  const id = req.body.id
  const name = req.body.name
  const phone = req.body.phone
  const address = req.body.address
  const email = req.body.email


  console.log(name)

  UserRegistration.updateOne({ _id: id }, { name: name, phone: phone, address: address, email: email }).then(function () {
    res.status(200).json({ success: true, msg: "Succesfully Updated" })
  }).catch(function (e) {
    res.status(500).json({ success: false })
  })
})
//user logout
router.delete('/logout/user', auth.verifyUser, function (req, res) {

  UserRegistration.findById(req.user._id, function (err, userdata) {
    console.log(req.token)
    var deletetoken = { token: req.token }
    var delete1 = userdata.tokens.splice(userdata.tokens.indexOf(deletetoken), 1);
    userdata.tokens = userdata.tokens.pull(delete1[0]._id)
    console.log(userdata.tokens)
    userdata.save((err, data) => {
      if (err) return res.send({
        success: false,
        message: err.message
      })
    })
    return res.send({
    
      success: true,
      message: "Logged Out",

    })
  })
})


//logout
router.delete('/user/logout', function (req, res) {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: 'customer Logged out',
  });
});


//  android
router.put('/user/update', auth.verifyUser, (req, res) => {
  const id = req.body._id
  const name = req.body.name
  const address = req.body.address
  const email = req.body.email
  const dob = req.body.dob
  const gender = req.body.gender
  const phone = req.body.phone

  
  UserRegistration.updateOne({ _id: id }, { name: name, address: address, email: email, dob:dob, gender:gender,phone:phone }).then(function (result) {
    console.log(result)
    res.status(200).json({ success: true, msg: "Succesfully Updated" })
  }).catch(function (e) {
    res.status(201).json({ success: false })
  })
})




router.put("/update/user/profile/:id", auth.verifyUser, (req, res) => {
  const id = req.params.id
  console.log("here")

  androidupload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // console.log("here")

      res.status(201).json({ success: false, msg: "error" })
    }
    else if (err) {
      res.status(201).json({ success: false, msg: "not gonna happen" })
      console.log("aayush")

    }
    else {
      constid = req.params.id
      image = req.file.filename
      console.log(image)
      UserRegistration.updateOne({ _id: id }, { image: image }).then(function (data) {
        console.log(data)
        res.status(200).json({ success: true, msg: "Done" })
      }).catch(function (e) {
        res.status(201).json({ success: false, msg: "not register" })
      })
    }
  })
})








module.exports = router;