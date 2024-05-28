var express = require("express");

var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");
router.post(
  "/submit_brand",
  upload.single("picture"),
  function (req, res, next) {
    try {
      pool.query(
        "insert into brand (brandname,picture) values(?,?)",
        [req.body.brandname, req.file.filename],
        function (error, result) {
          if (error) {
            res.status(200).json({
              status: false,
              msg: "server error : please contact databse administrator",
            });
          } else {
            res.status(200).json({
              status: true,
              msg: "Brand submitted succesfully",
            });
          }
        }
      );
    } catch (e) {
      res.status(200).json({
        status: false,
        msg: "server error: pls contact server adminstrator",
      });
    }
  }
);

router.post(
  "/update_brand_data",

  function (req, res, next) {
    try {
      pool.query(
        "update brand set brandname=? where brandid=?",
        [req.body.brandname, req.body.brandid],

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
                .json({ status: true, msg: "brand Updated successfully" });
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
  "/update_brand_picture",
  upload.single("picture"),
  function (req, res, next) {
    try {
      pool.query(
        "update brand set picture=? where brandid=?",
        [req.file.filename, req.body.brandid],
        function (error, result) {
          if (error) {
            res.status(200).json({
              status: false,
              msg: "server error : please contact databse administrator",
            });
          } else {
            res.status(200).json({
              status: true,
              msg: "Brand picture updated succesfully",
            });
          }
        }
      );
    } catch (e) {
      res.status(200).json({
        status: false,
        msg: "server error: pls contact server adminstrator",
      });
    }
  }
);

router.get(
  "/display_all_brand",

  function (req, res, next) {
    try {
      pool.query(
        "select * from brand ",

        function (error, result) {
          if (error) {
            res.status(200).json({
              status: false,
              msg: "server error : please contact databse administrator",
            });
          } else {
            res.status(200).json({
              status: true,
              msg: "Success",
              data: result,
            });
          }
        }
      );
    } catch (e) {
      res.status(200).json({
        status: false,
        msg: "server error: pls contact server adminstrator",
      });
    }
  }
);

router.post("/delete_brand", function (req, res, next) {
  try {
    pool.query(
      "delete from brand where brandid=?",
      [req.body.brandid],
      function (error, result) {
        if (error) {
          res.status(200).json({
            status: false,
            msg: "server error : please contact database administrator",
          });
        } else {
          res.status(200).json({
            status: true,
            msg: "Brand Deleted successfully",
          });
        }
      }
    );
  } catch (e) {
    res.status(200).json({
      status: false,
      msg: "server error: please contact server administrator",
    });
  }
});

module.exports = router;
