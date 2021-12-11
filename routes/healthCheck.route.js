const router = require("express").Router();

router.get("/", function (req, res) {
  return res.send("all working");
});

module.exports = router;
