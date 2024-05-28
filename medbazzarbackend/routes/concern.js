var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");

router.post("/submit", upload.single("picture"), function (req, res, next) {
  try {
    pool.query(
      "INSERT INTO concern (concernname, picture) VALUES (?, ?)",
      [req.body.concernname, req.file.filename],
      function (error, result) {
        if (error) {
          res.status(200).json({
            status: false,
            msg: "Server error: Please contact the database administrator.",
          });
        } else {
          res.status(200).json({
            status: true,
            msg: "Concern submitted successfully",
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

router.get("/fetchallconcern", function (req, res, next) {
  try {
    pool.query("SELECT * FROM concern", function (error, result) {
      if (error) {
        res.status(200).json({
          status: false,
          msg: "Server error: Please contact the database administrator.",
        });
      } else {
        res.status(200).json({
          status: true,
          msg: "Success",
          data: result,
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(200).json({
      status: false,
      msg: "Server error: Please contact the server administrator.",
    });
  }
});

module.exports = router;
