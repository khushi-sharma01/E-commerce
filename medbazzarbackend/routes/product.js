var express = require("express");

var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");

router.post(
  "/submit_product",
  upload.single("picture"),
  function (req, res, next) {
    try {
      pool.query(
        "insert into product (categoryid,subcategoryid,brandid,productname,description,picture) values(?,?,?,?,?,?)",
        [
          req.body.categoryid,
          req.body.subcategoryid,
          req.body.brandid,
          req.body.productname,
          req.body.description,
          req.file.filename,
        ],

        function (error, result) {
          if (error) {
            console.log(error);
            res.status(200).json({
              status: false,
              msg: "serve error : pls contact database administrator ...",
            });
          } else {
            {
              res.status(200).json({
                status: true,
                msg: "Product submitted successfully",
              });
            }
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

router.get("/display_all_product", function (req, res, next) {
  try {
    pool.query(
      "select P.*,(select C. categoryname from category C where C.categoryid=P.categoryid )as categoryname, (select S.subcategoryname from subcategory S where S.subcategoryid=P.subcategoryid) as subcategoryname,(select B. brandname from brand B where B.brandid=P.brandid)as brandname from product p ",
      function (error, result) {
        if (error) {
          res.status(200).json({
            status: false,
            message: "Server Error Pls Contact Database Administrator....",
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
      message: "Server Error : Pls Contact Server Administrator..... ",
    });
  }
});
router.post(
  "/delete_product",

  function (req, res, next) {
    try {
      pool.query(
        "delete from product where  productid=?",
        [req.body.productid],

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

router.post("/update_product_data", function (req, res, next) {
  try {
    pool.query(
      "UPDATE product SET categoryid=?, subcategoryid=?,brandid=?,productname=?,description=? WHERE productid=?",
      [
        req.body.categoryid,
        req.body.subcategoryid,
        req.body.brandid,
        req.body.productname,
        req.body.description,
        req.body.productid,
      ],
      function (error, result) {
        if (error) {
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
    console.log(e);
    res.status(200).json({
      status: false,
      msg: "Server error: Please contact the server administrator.",
    });
  }
});

router.post(
  "/update_product_picture",
  upload.single("picture"),

  function (req, res, next) {
    try {
      pool.query(
        "update product set picture=? where productid=?",
        [req.file.filename, req.body.productid],

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
router.post("/fetch_all_product_by_subcategoryid", function (req, res, next) {
  try {
    pool.query(
      "select * from product where subcategoryid=?",
      [req.body.subcategoryid],
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
module.exports = router;
