const express = require("express");
const router = express.Router();
const path = require("path");
const publicationApisController = require("../../../controllers/api/v1/publication_apis");
const passport = require("passport");
const multer = require("multer");

router.post(
  "/publish",
  passport.authenticate("jwt", { session: false }),
  multer({ dest: path.join(__dirname, "../../../uploads", "papers") }).single(
    "paper"
  ),
  publicationApisController.createPublication
);

router.get("/", publicationApisController.getAllPublications);

router.get(
  "/:publicationId",
  passport.authenticate("jwt", { session: false }),
  publicationApisController.fetchPublication
);

router.put(
  "/edit/:publicationId",
  passport.authenticate("jwt", { session: false }),
  multer({
    dest: path.join(__dirname, "../../../uploads", "papers"),
  }).single("paper"),
  publicationApisController.editPublication
);

module.exports = router;
