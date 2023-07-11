const Publication = require("../../../models/publication");
const User = require("../../../models/user");
const fs = require("fs");
const path = require("path");
module.exports.createPublication = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user._id;
    console.log(req.file);
    const newPublication = await Publication.create({
      title,
      paper: req.file.path,
      description,
      user: userId,
    });
    if (newPublication) {
      // Update user's publications array
      let user = await User.findById(userId);
      user.publications.push(newPublication._id);
      user.save();
      return res.status(200).json({
        statusCode: 200,
        message: "Published Successfully",
        data: {
          publication: newPublication,
        },
        success: true,
      });
    } else {
      return res.status(200).json({
        statusCode: 500,
        message: "Internal Server Error",
        data: {},
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      statusCode: 500,
      message: "Internal Server Error",
      data: {},
      success: false,
    });
  }
};

module.exports.fetchPublication = async (req, res) => {
  try {
    const publication = await Publication.findById(
      req.params.publicationId
    ).populate("user", ["name", "username"]);
    if (!publication) {
      return res.status(200).json({
        statusCode: 401,
        success: false,
        data: {},
        message: "Invalid Publication",
      });
    }

    return res.status(200).json({
      statusCode: 200,
      success: true,
      data: { publication },
      message: "Publication Fetched Successfully",
    });
  } catch (error) {
    return res.status(200).json({
      statusCode: 500,
      message: "Internal Server Error",
      data: {},
      success: false,
    });
  }
};

module.exports.getAllPublications = async (req, res) => {
  try {
    const publications = await Publication.find({})
      .sort("-createdAt")
      .populate("user", ["name", "username"]);

    if (!publications) {
      return res.status(200).json({
        statusCode: 404,
        message: "Publications not found",
        data: {},
        success: false,
      });
    } else {
      return res.status(200).json({
        statusCode: 200,
        message: "Fetched all publications successfully",
        data: { publications: publications },
        success: true,
      });
    }
  } catch (error) {
    return res.status(200).json({
      statusCode: 500,
      message: "Internal Server Error",
      data: {},
      success: false,
    });
  }
};

module.exports.editPublication = async (req, res) => {
  try {
    const { title, description } = req.body;
    let userId = req.user._id;
    let publicationId = req.params.publicationId;
    let publication = await Publication.findById(publicationId);
    if (!publication) {
      return res.status(200).json({
        statusCode: 404,
        message: "Publication not found",
        data: {},
        success: false,
      });
    } else {
      if (title) {
        publication.title = title;
      }
      if (description) {
        publication.description = description;
      }
      if (req.file) {
        fs.unlinkSync(publication.paper);
        publication.paper = req.file.path;
      }
      publication.save();
      return res.status(200).json({
        statusCode: 200,
        message: "Publication info updated successfully.",
        data: {
          publication,
        },
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      statusCode: 500,
      message: "Internal Server Error",
      data: {},
      success: false,
    });
  }
};
