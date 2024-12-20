const multer  = require('multer');
const cloudinary = require('cloudinary').v2;

module.exports = () => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, "./public/uploads")
        },
        filename: function (req, file, cb) {
          const uniquePrefix = Date.now() + file.originalname;
          cb(null, `${uniquePrefix}-${file.originalname}`);
        }
      });
    return storage;
}