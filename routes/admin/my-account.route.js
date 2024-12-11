const express = require("express");
const router = express.Router();
const myAccountController = require("../../controllers/admin/my-account.controller");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const multer = require("multer");
const upload = multer();
const authMiddleware = require("../../middlewares/admin/auth.middleware");
const validate = require("../../validates/admin/account.validate");

router.get("/", myAccountController.index);
router.get("/edit", myAccountController.edit);
router.patch("/edit", upload.single("avatar"),uploadCloud.upload, validate.editPatch, myAccountController.editPatch);

module.exports = router;