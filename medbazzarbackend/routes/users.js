var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");

router.post(
  "/submit_user",

  function (req, res, next) {
    console.log(req.body);
    try {
      pool.query(
        "insert into userdata (mobileno,emailid,username) values(?,?,?)",
        [req.body.mobileno, req.body.emailid, req.body.username],

        function (error, result) {
          if (error) {
            {
              console.log(error);
              res.status(500).json({
                status: false,
                msg: "serve error : pls contact database administrator ...",
              });
            }
          } else {
            {
              res.status(200).json({
                status: true,
                msg: "User Data submitted successfully",
              });
            }
          }
        }
      );
    } catch (e) {
      {
        res.status(500).json({
          status: false,
          msg: "server error : pls contact server administrator ...",
        });
      }
    }
  }
);

router.post(
  "/check_userdata",

  function (req, res, next) {
    try {
      pool.query(
        "select * from userdata where mobileno=? ",
        [req.body.mobileno],

        function (error, result) {
          if (error) {
            {
              console.log(error);
              res.status(500).json({
                status: false,
                msg: "serve error : pls contact database administrator ...",
              });
            }
          } else {
            if (result.length == 1)
              res.status(200).json({
                status: true,
                data: result[0],
                message: "User found...",
              });
            else
              res.status(200).json({
                status: false,
                data: [],
                message: "User Not found...",
              });
          }
        }
      );
    } catch (e) {
      {
        res.status(200).json({
          status: false,
          msg: "server error : pls contact server administrator ...",
        });
      }
    }



  }
);


router.post('/check_user_address', function(req, res, next) {
  try{
    console.log("user",req.body)
    pool.query("select * from address  where mobileno=?",[req.body.mobileno],function(error,result){
     if(error)
     {  console.log(error)
         res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
     else
     {  if(result.length==1)
        res.status(200).json({status:true,data:result[0],message:'User found...'})
        else
        res.status(200).json({status:false,data:[],message:'User found...'})

        

     }
    
    })



  }
  catch(e)
  {
    console.log('Error:',e)
    res.status(200).json({status:false,message:'Server Error:Pls Contact Server Administrator...'})
  }

});

router.post('/submit_user_address', function(req, res, next) {
  try{
   
    pool.query("insert into address  (mobileno ,address,landmark,state,city,pincode) values(?,?,?,?,?,?)",[req.body.mobileno,req.body.address,req.body.landmark,req.body.state,req.body.city,req.body.pincode],
    
    function (error, result) {
      if (error) {
        {
          console.log(error);
          res.status(500).json({
            status: false,
            msg: "serve error : pls contact database administrator ...",
          });
        }
      } else {
        {
          res.status(200).json({
            status: true,
            msg: "User Address submitted successfully",
          });
        }
      }
    }
  );
} catch (e) {
  {
    res.status(500).json({
      status: false,
      msg: "server error : pls contact server administrator ...",
    });
  }
}
}
);

module.exports = router;
