const { Router } = require("express");
const router = Router();
const dbController = require("../controllers/dbController");



router.get("/", dbController.openHome);

router.get("/new", dbController.openForm);
router.post("/new", dbController.validateMessage, dbController.submitForm);

router.get("/details/:id", dbController.openDetails);

router.post("/delete/:id", dbController.deleteMessage);



module.exports = router;