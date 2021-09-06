//import
const express = require('express'); //third party
const bodyParser = require('body-parser'); //core module
const db = require('./database/database');
const app = express();
const path = require('path')
const cors = require('cors')

//route import
const adminroute = require('./route/admin_route');
const userroute = require('./route/user_route')
const menuroute = require('./route/menu_route')
const employeeroute = require('./route/employee_route');
const fooditemroute = require('./route/foodItem_route');
const checkoutroute = require('./route/checkout_route');
const tableroute = require('./route/table _route');




app.use(express.json());
app.use(cors())
app.use(express.static(path.join(__dirname, '/media')))
app.use(bodyParser.urlencoded({extended:false}));

//Using Route
app.use(adminroute);
app.use(menuroute);
app.use(checkoutroute);
app.use(userroute);
app.use(employeeroute)
app.use(fooditemroute)
app.use(tableroute)



//localhost port
app.listen(100);
console.log(
    `Server running on port : 100`.blue.underline
      .bold
  )