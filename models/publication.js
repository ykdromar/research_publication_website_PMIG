const mongoose = require("mongoose");

const publicationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  paper: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  citations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Citation" }],
});

const Publication = mongoose.model("Publication", publicationSchema);
module.exports = Publication;
