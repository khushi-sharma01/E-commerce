var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");


router.get("/display_all_category", function (req, res, next) {
    try {
      pool.query("select * from category ", function (error, result) {
        if (error) {
          res.status(200).json({
            status: false,
            message: "Server Error: Pls contact daatabase administrator...",
          });
        } else {
          res
            .status(200)
            .json({ status: true, message: "Success", data: result });
        }
      });
    } catch (e) {
      res.status(200).json({
        status: false,
        message: "server error: pls contact server administrator...",
      });
    }
  });

  
router.post("/show_all_banners", function (req, res, next) {
  try {
    pool.query("select * from banners where bannertype=?",[req.body.bannertype], function (error, result) {
      if (error) {
        res.status(200).json({
          status: false,
          message: "Server Error: Pls contact daatabase administrator...",
        });
      } else {
        res
          .status(200)
          .json({ status: true, message: "Success", data: result });
      }
    });
  } catch (e) {
    res.status(200).json({
      status: false,
      message: "server error: pls contact server administrator...",
    });
  }
});
  
router.get("/show_all_brand", function (req, res, next) {
  try {
    pool.query("select * from brand where brandid !=0", function (error, result) {
      if (error) {
        res.status(200).json({
          status: false,
          message: "Server Error: Pls contact daatabase administrator...",
        });
      } else {
        res
          .status(200)
          .json({ status: true, message: "Success", data: result });
      }
    });
  } catch (e) {
    res.status(200).json({
      status: false,
      message: "server error: pls contact server administrator...",
    });
  }
});

router.get("/show_all_category", function (req, res, next) {
  try {
    pool.query("select * from category", function (error, result) {
      if (error) {
        res.status(200).json({
          status: false,
          message: "Server Error: Pls contact daatabase administrator...",
        });
      } else {
        res
          .status(200)
          .json({ status: true, message: "Success", data: result });
      }
    });
  } catch (e) {
    res.status(200).json({
      status: false,
      message: "server error: pls contact server administrator...",
    });
  }
});

router.get("/show_all_concern", function (req, res, next) {
  try {
    pool.query("select * from concern", function (error, result) {
      if (error) {
        res.status(200).json({
          status: false,
          message: "Server Error: Pls contact daatabase administrator...",
        });
      } else {
        res
          .status(200)
          .json({ status: true, message: "Success", data: result });
      }
    });
  } catch (e) {
    res.status(200).json({
      status: false,
      message: "server error: pls contact server administrator...",
    });
  }
});
  router.post("/fetch_all_subcategory_by_categoryid", function (req, res, next) {
    try {
      pool.query(
        "select * from subcategory where categoryid=?",
        [req.body.categoryid],
        function (error, result) {
          if (error) {
            res.status(200).json({
              status: false,
              message:
                "Server Error: Pls Contact to Database Administrator......",
            });
          } else {
            res
              .status(200)
              .json({ status: true, message: "Success", data: result });
          }
        }
      );
    } catch (e) {
      res.status(200).json({
        status: false,
        message: "Server Error: Pls Contact to Database Administrator......",
      });
    }
  });

  router.post("/show_all_products_by_offertype", function (req, res, next) {
    try {
      pool.query(
        
        "select P.*,PR.*,P.picture as multi_picture, P.description as pd_description,(select C.categoryname from category C where C.categoryid=P.categoryid )as categoryname, (select S.subcategoryname from subcategory S where S.subcategoryid=P.subcategoryid) as subcategoryname,(select B.brandname from brand B where B.brandid=P.brandid)as brandname,(select Con.concernname from concern Con where Con.concernid=P.concernid)as concernname from productdetails P,product PR  where P.productid=PR.productid and P.offertype IS NOT NULL",[req.body.offertype],function(error,result){
          if (error) {
            console.log(error);
            res.status(500).json({
              status: false,
              msg: "serve error : pls contact database administrator ...",
            });
          } else {
            res.status(200).json({
              status: true,
              msg: "success",
              data: result,
            });
          }
        }
      );
    } catch (e) {
      res.status(200).json({
        status: false,
        msg: "server error : pls contact server administrator ...",
      });
    }
  });
  module.exports=router;