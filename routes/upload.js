const express = require("express");
const upload = require("../middlewares/upload");
const uploadRoute = express.Router();

uploadRoute.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.send("please correct upload image");
    console.log(req.file);
  const imageUrl = `http://localhost:3000/file/${req.file.filename}`;
  return res.send(imageUrl);
});

module.exports = uploadRoute;
