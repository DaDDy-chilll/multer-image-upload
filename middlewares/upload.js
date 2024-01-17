const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const {v4 : primaryKey } = require('uuid')
const storage = new GridFsStorage({
  url: process.env.DB,
  file: (req, file) => {
    const match = ["image/png", "image/jpeg", "image/jpg"];
    console.log((match.indexOf(file.mimetype) === 1));
    if (match.indexOf(file.mimetype) === 1) {
      const filename = `${Date.now()}-multer-${file.originalname}`;    
      return {
        bucketName:'photos',
        filename,
      };
    }else{
        return null
    }
  },
});


 module.exports =  multer({ storage });
