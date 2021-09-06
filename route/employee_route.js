const express = require('express'); //third party
const router = express.Router();
const upload = require ('../middleware/upload');
const employeeadd = require('../model/employee_model')
const auth = require("../middleware/auth")

//adding new employee
router.post('/addemployee',auth.verifyAdmin, upload.single('employee_image'),function(req,res){

    const employee_name = req.body.employee_name
    const employee_phone = req.body.employee_phone
    const employee_address = req.body.employee_address
    const employee_email = req.body.employee_email
   

   const employee = new employeeadd({
        employee_name : employee_name,
        employee_phone : employee_phone,
        employee_address : employee_address,
        employee_email : employee_email,
        employee_image : req.file.filename
    });
    employee.save()
    .then(function(result){
        res.status(200).json({success: true, msg :"Employee Added"});
        console.log("Name : "+ employee_name + " Added")
    })
    .catch(function(e){
        console.log("here")
        res.status(201).json({success: false, message : e})
    });
   
})

//display Employee Details
router.get('/employee/display', function(req,res){
    employeeadd.find()
    .then(function(employeedisplay){
        res.status(200).json({
            success:true,
            data: employeedisplay,
          
        })
       
    })
    .catch(function(error){
        res.status(500).json({success:false,message:error})
    })
})

// eployee single
router.get('/employee/single/:id',auth.verifyAdmin, function(req,res){
    const id = req.params.id;  
    employeeadd.findOne({_id : id })
    .then(function(data){
        res.status(200).json(data);
    })

    .catch(function(e){
      
        res.status(500).json({message:e})
    })
})

//Employee Update
router.put('/employee/update/:id',auth.verifyAdmin, upload.single('employee_image'), function(req,res){
    const employee_name = req.body.employee_name
    const employee_phone = req.body.employee_phone
    const employee_address = req.body.employee_address
    const employee_email = req.body.employee_email
    const id = req.params.id

    employeeadd.updateOne({_id : id},{
        employee_name : employee_name,
        employee_phone : employee_phone,
        employee_address : employee_address,
        employee_email : employee_email,
        employee_image : req.file.filename
    })
    .then(function(result){
        res.status(200).json({success :true, message :"Employee Detail Updated.."})
        console.log("Employee Details Updated")
        console.log("Employee Name : " + employee_name )
    })
    .catch(function(e){
        res.status(500).json({success:false, message : e})
    })
})
   //delete food details
   router.delete('/employee/delete/:id',auth.verifyAdmin,function(req, res){
    const id = req.params.id
    employeeadd.deleteOne({_id:id})
    .then(function(result){
      console.log("Deleted!!")
      res.status(200).json({a : "deleted successfully", success : true});
      

  })
  .catch(function(err){
    console.log("here")
      res.status(500).json({message : err})
  })

  })
module.exports = router;