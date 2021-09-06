const express = require('express'); //third party
const router = express.Router();
const Table = require('../model/table_model');
const auth = require('../middleware/auth');
const table = require('../model/table_model');


router.post('/addtable', function(req, res){
   
    const user_email = req.body.user_email
    const date = req.body.date
    const people = req.body.people
    const time = req.body.time
    const user_id = req.body.user_id
    

    const table = new Table({user_email:user_email, date:date,people:people,time:time, user_id:user_id })
    // menu_image : req.file.filename
    table.save()

    .then(function(result){
        // success insert
        console.log(result );
        res.status(200).json({success : true, a : "table Added"});

    })
    .catch(function(err){
        res.status(201).json({  success : false, message : err})
    });
    console.log("Table Added");
  


    // const Table = new table(
    //     req.body)
    //     Table.save().then(function( ){
    //       res.status(200).json({success : true, a : "table Added"});
    //       console.log("table")
    //       console.log(Table)
    //         // res.send("Table has been added")
    //     }).catch(function(e){
    //         res.send(e)
    //     })


    // const user_email = req.body.user_email
    // const date = req.body.date
    // const people = req.body.people
    // const time = req.body.time
    // const user_id = req.body.user_id

})

router.get('/table/display',auth.verifyAdmin, function(req,res){
    Table.find()
        .then(function (menudisplay) {
            res.status(200).json({
              success: true,
              data: menudisplay,
            });
          })
          .catch(function (error) {
            res.status(500).json({ success: false, message: error });
          });
    
    })

    router.delete('/table/delete/:id',auth.verifyAdmin,function(req, res){
        const id = req.params.id
        Table.deleteOne({_id:id})
        // const menu = menuAdd.findById(req.params.id)
        // menu.remove()
        .then(function(result){
          console.log("Deleted!!")
          res.status(200).json({a : "deleted successfully", success : true});
          // data(result)
  
      })
      .catch(function(err){
        console.log("here")
          res.status(500).json({message : err})
      })
  
      })
module.exports = router;