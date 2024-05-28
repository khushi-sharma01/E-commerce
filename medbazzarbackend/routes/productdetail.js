var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");

router.post("/submit", upload.any(), function (req, res, next) {
  try {
    var files = req.files.map((item) => {
      return item.filename;
    });
    pool.query(
      "insert into productdetails ( categoryid, subcategoryid, brandid, productid, productsubname,description, weight, weighttype, type, packaging, qty, price, offerprice, offertype, picture,concernid) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        req.body.categoryid,
        req.body.subcategoryid,
        req.body.brandid,
        req.body.productid,
        req.body.productsubname,
        req.body.description,
        req.body.weight,
        req.body.weighttype,

        req.body.type,
        req.body.packaging,
        req.body.qty,
        req.body.price,
        req.body.offerprice,
        req.body.offertype,
        files + "",
        req.body.concernid
      ],

      function (error, result) {
        if (error) {
          console.log(error);
          res.status(200).json({
            status: false,
            msg: "serve error : pls contact database administrator ...",
          });
        } else {
          res.status(200).json({
            status: true,
            msg: "subcategory submitted successfully",
          });
        }
      }
    );
  } catch (e) {
    console.log(e);
    {
      res.status(200).json({
        status: false,
        msg: "server error : pls contact server administrator ...",
      });
    }
  }
});

router.get("/display_products_detail", function (req, res, next) {
  try {
    pool.query(
      "select Pro.*,(select con.concernname from concern con where con.concernid=Pro.concernid )as concernname, (select C.categoryname from category C where C.categoryid=Pro.categoryid) as categoryname, (select SC.subcategoryname from subcategory SC where SC.subcategoryid=Pro.subcategoryid)as subcategoryname, (select B.brandname from brand B where B.brandid=Pro.brandid) as brandname,(select P.productname from product P where P.productid=Pro.productid) as productname from productdetails Pro ",
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(200).json({
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
router.post(
  "/delete_product_detail",

  function (req, res, next) {
    try {
      pool.query(
        "delete from productdetails where  productdetailid=?",
        [req.body.productdetailid],

        function (error, result) {
          if (error) {
            {
              res.status(200).json({
                status: false,
                msg: "serve error : pls contact database administrator ...",
              });
            }
          } else {
            {
              res
                .status(200)
                .json({ status: true, msg: "Product Deleted successfully" });
            }
          }
        }
      );
    } catch (e) {
      console.log(e);
      {
        res.status(200).json({
          status: false,
          msg: "server error : pls contact server administrator ...",
        });
      }
    }
  }
);

router.post(
  "/update_product_detail",

  function (req, res, next) {
    try {
      
      console.log(req.body);
      pool.query(
        "update productdetails set categoryid =? , subcategoryid=? , brandid=?  , productid=?,productsubname=?, weight=?, weighttype=?, type=?, packaging=?, qty=?, price=?, offerprice=?, offertype=? ,concernid=? where productdetailid=?",
        [
          req.body.categoryid,
          req.body.subcategoryid,
          req.body.brandid,
          req.body.productid,
          req.body.productsubname,
          req.body.weight,
          req.body.weighttype,
          req.body.type,
          req.body.packaging,
          req.body.qty,
          req.body.price,
          req.body.offerprice,
          req.body.offertype,
          req.body.productdetailid,
          req.body.concernid
        ],

        function (error, result) {
          if (error) {
            console.log(error);
            res.status(200).json({
              status: false,
              msg: "Server error: Please contact the database administrator.",
            });
          } else {
            console.log(result);
            res.status(200).json({
              status: true,
              msg: "Product updated successfully.",
            });
          }
        }
      );
    } catch (e) {
      res.status(200).json({
        status: false,
        msg: "Server error: Please contact the server administrator.",
      });
    }
  }
);
router.post(
  "/update_product_picture",
  upload.any(),

  function (req, res, next) {
    try {
      var files = req.files.map((item) => {
        return item.filename;
      });
      pool.query(
        "update productdetails set picture=? where productdetailid=?",
        [ files + "", req.body.productdetailid],

        function (error, result) {
          if (error) {
            {
              res.status(200).json({
                status: false,
                msg: "serve error : pls contact database administrator ...",
              });
            }
          } else {
            {
              res
                .status(200)
                .json({ status: true, msg: "Picture Updated successfully" });
            }
          }
        }
      );
    } catch (e) {
      console.log(e);
      {
        res.status(200).json({
          status: false,
          msg: "server error : pls contact server administrator ...",
        });
      }
    }
  }
);
module.exports = router;
