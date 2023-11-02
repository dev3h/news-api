"use strict";

var cloudinary = require("cloudinary").v2;
var _require = require("multer-storage-cloudinary"),
  CloudinaryStorage = _require.CloudinaryStorage;
var multer = require("multer");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});
var storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  allowedFormats: ["jpg", "png", "jpeg", "gif"],
  params: {
    folder: "news"
  }
});
var uploadCloud = multer({
  storage: storage
});
module.exports = uploadCloud;