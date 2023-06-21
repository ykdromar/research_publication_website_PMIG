const express = require("express");
const router = express.Router();

router.use("/api", require("./api"));
router.get("/", (req, res) => {
  return res.status(200).json({
    status: 200,
  });
});

module.exports = router;
