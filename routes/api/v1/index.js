const express = require("express");
const router = express.Router();

router.use("/users", require("./users_routes"));
router.use("/publications", require("./publication_routes"));

module.exports = router;
