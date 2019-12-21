const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const morgan = require('morgan');// morgan call next function if problem occur
var http = require("https");
var globalVariable = require("./config.js");

// parse application/json
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// console.log('globalVariable',globalVariable)
 
//create database connection
const conn = mysql.createConnection({
  host: globalVariable.dbHost,
  user: 'admin',
  password: globalVariable.dbPassword,
  database: 'onlydocs'
});
 
//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});

//add customer and cust session details
app.post('/api/create_user',(req, res) => {
  // console.log('req, res',req.body)
  let sql = "SELECT * FROM CUSTOMER WHERE mobilenumber="+req.body.mobile;
  let query = conn.query(sql, (err, results) => {
    if(err){
      res.send(JSON.stringify({"status": 500, "error": err, "response": null}))
    }else{
      /******Send OTP SMS******/
      var path ="/api/sendotp.php?country=91&otp="+req.body.otp+"&message=Your%20verification%20code%20is%20"+req.body.otp+".&mobile="+req.body.mobile+"&authkey="+globalVariable.authkey
      var options = {
        "method": "POST",
        "hostname": "control.msg91.com",
        "port": null,
        "path": path,
        "headers": {}
      };
      var request = http.request(options, function (response) {
        var chunks = [];
        response.on("data", function (chunk) {
          chunks.push(chunk);
        });
        response.on("end", function () {
          var body = Buffer.concat(chunks);
          // console.log(body.toString());
        });
      });
      request.end();

      /*********If customer record exists update the cust_session Else insert new customer details and cust_session************/
      if(results&&results.length!=0){
        let sql = "UPDATE CUST_SESSION_DETAILS SET mobile_no='"+req.body.mobile+"',otp='"+req.body.otp+"',session_id='',session_status='"+req.body.status+"' WHERE mobile_no="+req.body.mobile;
        let query = conn.query(sql, (err, results) => {
          if(err) res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
          res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        });
      }else{
        let data = {firstname:'',middlename:'',lastname:'',mobilenumber:req.body.mobile,date_of_birth:'',address:'',town:'',pincode:'',area:''};
        let sql = "INSERT INTO CUSTOMER SET ?";
        let query = conn.query(sql, data,(err, results) => {
          if(err) res.send(JSON.stringify({"status": 500, "error": err, "response": null}));;
          let data = {mobile_no:req.body.mobile,otp:req.body.otp,session_id:'',session_status:req.body.status};
          let sql = "INSERT INTO CUST_SESSION_DETAILS SET ?";
          let query = conn.query(sql, data,(err, results) => {
            if(err) res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
          });
        });
      }
    }
  });
});

//update cust session details
app.put('/api/update_usersession',(req, res) => {
  let sql = "UPDATE CUST_SESSION_DETAILS SET mobile_no='"+req.body.mobile+"',otp='"+req.body.otp+"',session_id='"+req.body.id+"',session_status='"+req.body.status+"' WHERE mobile_no="+req.body.mobile;
  let query = conn.query(sql, (err, results) => {
    if(err) res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//add new service
app.post('/api/create_service',(req, res) => {
  let sql = "SELECT id FROM SERVICE ORDER BY id DESC";
  let query = conn.query(sql, (err, results) => {
    if(err){
      res.send(JSON.stringify({"status": 500, "error": err, "response": null}))
    }else{
      if(results&&results.length!=0){
        var id = parseInt(results[0].id)+1
      }else{
        var id = 1
      }  
      let data = {id:id,price: req.body.price, duration: req.body.duration,name: req.body.serviceName};
      let sql = "INSERT INTO SERVICE SET ?";
      let query = conn.query(sql, data,(err, results) => {
        if(err) res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      });
    }
  })
});

//get service data
app.get('/api/get_service',(req, res) => {
  let sql = "SELECT * FROM SERVICE ORDER BY id DESC";
  let query = conn.query(sql, (err, results) => {
    if(err){
      res.send(JSON.stringify({"status": 500, "error": err, "response": null}))
    }else{
      if(results&&results.length!=0){
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      }else{
        res.send(JSON.stringify({"status": 404, "error": null, "response": {message: 'Data not found.'}}));
      }
    }
  })
});

//update service data
app.put('/api/update_service/:id',(req, res) => {
  let sql = "UPDATE SERVICE SET name='"+req.body.serviceName+"', price='"+req.body.price+
  "',duration='"+req.body.duration+"',id='"+req.body.serviceId+"' WHERE id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  })
});

//delete service data
app.delete('/api/delete_service/:id',(req, res) => {
  let sql = "DELETE FROM SERVICE WHERE id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  })
});

//add service form fields
app.post('/api/create_serviceForm',(req, res) => {
  let sql = "SELECT id FROM FORM_FIELDS ORDER BY id DESC";
  let query = conn.query(sql, (err, results) => {
    if(err){
      res.send(JSON.stringify({"status": 500, "error": err, "response": null}))
    }else{
      if(results&&results.length!=0){
        var id = parseInt(results[0].id)+1
      }else{
        var id = 1
      }  
      let data = {id:id,name: req.body.fieldName,type: req.body.type,option: req.body.option,label: req.body.labelName,sequenceno: req.body.sequenceNo};
      let sql = "INSERT INTO FORM_FIELDS SET ?";
      let query = conn.query(sql, data,(err, results) => {
        if(err) res.send(JSON.stringify({"status": 500, "error": err, "response": null}));;
        let data = {service_id:req.body.serviceId,form_field_id:id,is_mandatory: req.body.mandatoryField};
        let sql = "INSERT INTO SERVICE_FORM_FIELD SET ?";
        let query = conn.query(sql, data,(err, results) => {
          if(err) res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
          res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        });
      });
    }
  })
});

//get service form fields by Id
app.get('/api/get_serviceForm/:id',(req, res) => {
  let sql = "SELECT * FROM SERVICE_FORM_FIELD WHERE service_id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err){
      res.send(JSON.stringify({"status": 500, "error": err, "response": null}))
    }else{
      // console.log('results',results)
      if(results&&results.length!=0){
        var newArr = []
        for (var i = 0; i < results.length; i++) {
          let sql = "SELECT * FROM FORM_FIELDS WHERE id="+results[i].FORM_FIELD_ID+" ORDER BY sequenceno ASC";
          let query = conn.query(sql, (err, result) => {
            if(err){
              res.send(JSON.stringify({"status": 500, "error": err, "response": null}))
            }else{
              // console.log('result[0]',result[0])
              newArr.push(result[0])
              if(newArr.length===results.length){
                res.send(JSON.stringify({"status": 200, "error": null, "response": newArr}));
              }
            }
          })
        }
      }else{
        res.send(JSON.stringify({"status": 404, "error": null, "response": {message: 'Data not found.'}}));
      }
    }
  })
});

//get service form fields
app.get('/api/get_serviceForm',(req, res) => {
  let sql = "SELECT * FROM SERVICE_FORM_FIELD";
  let query = conn.query(sql, (err, results) => {
    if(err){
      res.send(JSON.stringify({"status": 500, "error": err, "response": null}))
    }else{ 
      if(results&&results.length!=0){
        getServiceName();
        async function getServiceName(){
          var newArr = []
          for (var i = 0; i < results.length; i++) {
            var mandatory = results[i].IS_MANDATORY
            var serviceId = results[i].SERVICE_ID
            var formFeildId = results[i].FORM_FIELD_ID
            var serviceName = await fetch_serviceName(serviceId);
            var prevServiceId = serviceId;
            let sql = "SELECT * FROM FORM_FIELDS WHERE id="+formFeildId;
            let query = conn.query(sql, (err, result) => {
              if(err){
                res.send(JSON.stringify({"status": 500, "error": err, "response": null}))
              }else{
                newArr.push({data:result[0],mandatory:mandatory,serviceName:serviceName,serviceId:prevServiceId})
                if(newArr.length===results.length){
                  res.send(JSON.stringify({"status": 200, "error": null, "response": newArr}));
                }
              }
            })
          }
        }
      }else{
        res.send(JSON.stringify({"status": 404, "error": null, "response": {message: 'Data not found.'}}));
      }
    }
  })
});

function fetch_serviceName(id){
  return new Promise(function(resolve,reject){
    let sqlService = "SELECT NAME FROM SERVICE WHERE id="+id;
    let queryService = conn.query(sqlService, (err, result) => {
      if(err){
        console.log(err);
        reject(err);
      }else{
        serviceName = result[0].NAME
        resolve(serviceName); 
      }
    })
  })
}// end function

//update service form fields(not working)
app.put('/api/update_serviceForm/:id',(req, res) => {
  let sql = "UPDATE FORM_FIELDS SET name='"+req.body.fieldName+"', label='"+req.body.label+
  "', type='"+req.body.type+"', option='"+req.body.option+"', id='"+req.body.fieldId+
  "', sequenceno='"+req.body.sequenceno+"' WHERE id='"+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err){
      res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
    }else{
      let sql = "UPDATE SERVICE_FORM_FIELD SET service_id='"+req.body.serviceId+"', form_field_id='"+req.body.fieldId+
      "', is_mandatory='"+req.body.mandatory+"' WHERE form_field_id="+req.params.id;
      let query = conn.query(sql, (err, results) => {
        if(err){
          res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
        }else{
          res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        }
      })  
    }
  })
});

function get_formFieldDeleteRes(id){
  return new Promise(function(resolve,reject){
    let sql = "DELETE FROM SERVICE_FORM_FIELD WHERE service_id="+id;
    let query = conn.query(sql, (err, results) => {
      if(err){
        console.log(err);
        reject(err);
      }else{
        resolve(true); 
      }
    })
  })
}// end function

//delete service form fields (not working)
app.delete('/api/delete_serviceForm/:id',(req, res) => {
  getFormDeleteResult();
  async function getFormDeleteResult(){
    var isFormDelete = await get_formFieldDeleteRes(req.params.id)
    // console.log('isFormDelete',isFormDelete)
    if(isFormDelete){
      let sql = "DELETE FROM FORM_FIELDS WHERE id="+req.params.id;
      let query = conn.query(sql, (err, results) => {
        if(err){
          res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
        }else{
          res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        }
      })
    }
  }
  // let sql = "DELETE FROM FORM_FIELDS WHERE id="+req.params.id;
  // let query = conn.query(sql, (err, results) => {
  //   if(err){
  //     res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
  //   }else{
  //     let sql = "DELETE FROM SERVICE_FORM_FIELD WHERE service_id="+req.params.id;
  //     let query = conn.query(sql, (err, results) => {
  //       if(err){
  //         res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
  //       }else{
  //         res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  //       }
  //     })
  //   }
  // })
});

//add service documents
app.post('/api/create_serviceDocument',(req, res) => {
  let sql = "SELECT id FROM DOCUMENT ORDER BY id DESC";
  let query = conn.query(sql, (err, results) => {
    if(err){
      res.send(JSON.stringify({"status": 500, "error": err, "response": null}))
    }else{
      if(results&&results.length!=0){
        var id = parseInt(results[0].id)+1
      }else{
        var id = 1
      }  
      let data = {id:id,name:req.body.documentName};
      let sql = "INSERT INTO DOCUMENT SET ?";
      let query = conn.query(sql, data,(err, results) => {
        if(err) res.send(JSON.stringify({"status": 500, "error": err, "response": null}));;
        let data = {service_id:req.body.serviceId,document_id:id,is_mandatory: req.body.mandatoryField};
        let sql = "INSERT INTO DOCUMENT_SERVICE SET ?";
        let query = conn.query(sql, data,(err, results) => {
          if(err) res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
          res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        });
      });
    }
  })
});

//get service document by Id
app.get('/api/get_serviceDocument/:id',(req, res) => {
  let sql = "SELECT * FROM DOCUMENT_SERVICE WHERE service_id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err){
      res.send(JSON.stringify({"status": 500, "error": err, "response": null}))
    }else{
      if(results&&results.length!=0){
        var newArr = []
        for (var i = 0; i < results.length; i++) {
          let sql = "SELECT * FROM DOCUMENT WHERE id="+results[i].DOCUMENT_ID;
          let query = conn.query(sql, (err, result) => {
            if(err){
              res.send(JSON.stringify({"status": 500, "error": err, "response": null}))
            }else{
              newArr.push(result[0])
              if(newArr.length===results.length){
                res.send(JSON.stringify({"status": 200, "error": null, "response": newArr}));
              }
            }
          })
        }
      }else{
        res.send(JSON.stringify({"status": 404, "error": null, "response": {message: 'Data not found.'}}));
      }
    }
  })
});

//add service data
app.post('/api/add_serviceFormData',(req, res) => {
  let sql = "SELECT order_id FROM ORDER_SERVICE_DATA ORDER BY order_id DESC";
  let query = conn.query(sql, (err, results) => {
    if(err){
      res.send(JSON.stringify({"status": 500, "error": err, "response": null}))
    }else{
      if(results&&results.length!=0){
        var id = parseInt(results[0].order_id)+1
      }else{
        var id = 1
      }  
      let data = {order_id:id,service_id:req.body.serviceId,field_name:req.body.fieldName,field_value:req.body.fieldValue};
      // let sql = "INSERT INTO ORDER_SERVICE_DATA SET ?";
      // let query = conn.query(sql, data,(err, results) => {
      //   if(err) res.send(JSON.stringify({"status": 500, "error": err, "response": null}));;
      //   let data = {service_id:req.body.serviceId,document_id:id,is_mandatory: req.body.mandatoryField};
      //   let sql = "INSERT INTO DOCUMENT_SERVICE SET ?";
      //   let query = conn.query(sql, data,(err, results) => {
      //     if(err) res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
      //     res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      //   });
      // });
    }
  })
});
 
//Server listening
app.listen(globalVariable.port,() =>{
  // console.log('Server started on port 3024...');
});