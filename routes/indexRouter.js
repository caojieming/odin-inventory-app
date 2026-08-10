const { Router } = require("express");
const router = Router();
const dbController = require("../controllers/dbController");



router.get("/", dbController.openHome);

router.get("/category/:id", dbController.openCategory);

router.get("/new", dbController.openForm);
router.post("/new", dbController.validateMessage, dbController.submitForm);

router.post("/delete/:id", dbController.deleteMessage);



module.exports = router;