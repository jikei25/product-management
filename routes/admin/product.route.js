const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/product.controller");
const multer  = require('multer');
const storage = require("../../helpers/storageMulter");
const upload = multer({ storage: storage() });

router.get("/", controller.index);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi", controller.changeMulti);
router.delete("/delete/:id", controller.deleteItem);
router.get("/create", controller.createItem);
router.post("/create", upload.single('thumbnail'), controller.create); // single("...") must be the same at the name in the form 

module.exports = router;