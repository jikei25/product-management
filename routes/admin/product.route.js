const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/product.controller");
const multer = require('multer');
const uploadCloud = require('../../middlewares/admin/uploadCloud.middleware');

const upload = multer();
const validate = require("../../validates/admin/product.validate");

router.get("/", controller.index);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi", controller.changeMulti);
router.delete("/delete/:id", controller.deleteItem);
router.get("/create", controller.createItem);
router.post("/create", upload.single('thumbnail'), uploadCloud.upload, validate.createProduct, controller.create); // single("...") must be the same at the name attribute in the form 
router.get("/edit/:id", controller.edit);
router.patch("/edit/:id", upload.single('thumbnail'), uploadCloud.upload, validate.createProduct, controller.editPatch);
router.get("/detail/:id", controller.detail);

module.exports = router;