var express = require("express");

var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");
router.post("/submit_banner", upload.any(), function (req, res, next) {

  try {
   
    var files = req.files.map((item) => {
      return item.filename;
    });

    pool.query(
      "INSERT INTO banners (bannertype, brandid, picture) VALUES (?, ?, ?)",
      [req.body.bannertype, req.body.brandid, files + ""], // Use join to concatenate filenames
      function (error, result) {
        if (error) {
          console.error("Database error:", error);
          return res.status(500).json({
            status: false,
            msg: "Server error: Please contact the database administrator",
          });
        } else {
          console.log("SSSSSSSSSSSSSSSSSSSSS", result);
          res.status(200).json({
            status: true,
            msg: "Banners submitted successfully",
          });
        }
      }
    );
  } catch (e) {
    console.error("Server error:", e);
    res.status(500).json({
      status: false,
      msg: "Server error: Please contact the server administrator",
    });
  }
});

module.exports = router;
