var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");

router.post(
  "/submit_subCategory",
  upload.single("picture"),
  function (req, res, next) {
    try {
      pool.query(
        "insert into subcategory (categoryid,subcategoryname,picture) values(?,?,?)",
        [req.body.categoryid, req.body.subcategoryname, req.file.filename],

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
                msg: "subcategory submitted successfully",
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

router.get("/display_all_subcategory", function (req, res, next) {
  try {
    pool.query(
      "select S.*, (select C.categoryname from category C where C.categoryid = S.categoryid) as categoryname from subcategory S",
      function (error, result) {
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
      }
    );
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
router.post(
  "/delete_subCategory",

  function (req, res, next) {
    try {
      pool.query(
        "delete from subcategory where  subcategoryid=?",
        [req.body.subcategoryid],

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
                .json({ status: true, msg: "Category Deleted successfully" });
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

router.post("/update_subcategory_data", function (req, res, next) {
  try {
    pool.query(
      "UPDATE subcategory SET categoryid=?, subcategoryname=? WHERE subcategoryid=?",
      [req.body.categoryid, req.body.subcategoryname, req.body.subcategoryid],
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
            msg: "Category updated successfully.",
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
  "/update_subcategory_picture",
  upload.single("picture"),

  function (req, res, next) {
    try {
      pool.query(
        "update subcategory set picture=? where subcategoryid=?",
        [req.file.filename, req.body.subcategoryid],

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
