require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const connectDB = require("./db");
const uploadRoute = require("./routes/upload");
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");

connectDB();

let gfs;
let gfsBucket;
const conn = mongoose.connection;

conn.once("open", function () {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("photos");
  gfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'photos',
  });
});
app.use("/file", uploadRoute);

app.get("/file/:filename", async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    const readStream = gfsBucket.openDownloadStreamByName(file.filename);
    readStream.pipe(res);
  } catch (error) {
    res.send('not found')
    console.log(error.message);
  }
});

app.delete("/file/:filename", async (req, res) => {
  try {
    await gfs.files.deleteOne({ filename: req.params.filename });
    res.send("success");
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`server is running on port:${PORT}`);
});
