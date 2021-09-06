const express = require('express'); //third party
const router = express.Router();
const menuAdd = require('../model/menu_model');
const upload = require ('../middleware/upload')
const auth = require('../middleware/auth')

//adding menu
// upload.single('menu_image')
router.post('/addmenu', auth.verifyAdmin,upload.single('menu_image'),function(req, res) {

    const menu_name = req.body.menu_name
    const menu_title = req.body.menu_title
    const menu_price = req.body.menu_price
    const menu_desc = req.body.menu_desc

    const menu = new menuAdd({menu_name : menu_name, menu_title: menu_title, menu_price:menu_price, menu_desc:menu_desc,menu_image : req.file.filename })
    menu.save()

    .then(function(result){
        // success insert
        res.status(200).json({success : true, a : "Menu Added"});

    })
    .catch(function(err){
        res.status(201).json({  success : false, message : err})
    });
    console.log("Menu Added");



})

//display menu
router.get('/menu/display', function(req,res){
    menuAdd.find()
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

    router.get('/menu/single/:id',auth.verifyAdmin, function(req,res){
      const id = req.params.id;  
      menuAdd.findOne({_id : id })
      .then(function(data){
          res.status(200).json(data);
      })
  
      .catch(function(e){
        
          res.status(500).json({message:e})
      })
  })

  router.get('/menu/name/:menu_name', function(req,res){
    const menu_name = req.params.menu_name;  
    menuAdd.findOne({menu_name : menu_name })
    .then(function(data){
      console.log(data)
        res.status(200).json(data);
    })

    .catch(function(e){
      console.log('here')
        res.status(500).json({message:e})
    })
})


    //MENU EDIT
    router.put('/menu/update/:id',auth.verifyAdmin,upload.single('menu_image'), function(req,res){
      const menu_name = req.body.menu_name
      const menu_price = req.body.menu_price
      const menu_desc = req.body.menu_desc
      const menu_title = req.body.menu_title
      const id = req.params.id
      console.log(id)

      menuAdd.updateOne({_id : id}, {menu_name:menu_name,menu_price:menu_price,menu_desc:menu_desc,menu_title:menu_title,menu_image:req.file.filename }
        )
      .then(function(result){
        res.status(200).json({message:"Menu Updated",success: true,})
        console.log("Menu Updated")
      })
      
      .catch(function(e){
        res.status(500).json ({message : e});
    })
    

    })

    //delete menu details
    router.delete('/menu/delete/:id',auth.verifyAdmin,function(req, res){
      const id = req.params.id
      menuAdd.deleteOne({_id:id})
     
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
