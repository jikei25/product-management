const express = require("express");
const controller = require("../../controllers/admin/product-category.controller");
const multer = require('multer');
const uploadCloud = require('../../middlewares/admin/uploadCloud.middleware');
const validate = require('../../validates/admin/product-category.validate');

const router = express.Router();
const upload = multer();

router.get("/", controller.index);
router.get("/create", controller.createCategory);
router.post("/create", upload.single('thumbnail'), uploadCloud.upload, validate.createCategory, controller.create);
router.get("/edit/:id", controller.edit);
router.patch("/edit/:id", upload.single('thumbnail'), uploadCloud.upload, controller.editPatch);
module.exports = router;