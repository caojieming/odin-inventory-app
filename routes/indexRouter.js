const { Router } = require("express");
const router = Router();
const dbController = require("../controllers/dbController");


// home/all categories link
router.get("/", dbController.openHome);
// all items in a specified category link
router.get("/category/:name", dbController.openCategory);

// category creation page/form link
router.get("/categoryForm", dbController.openCategoryForm);
// submission of the above form
router.post("/categoryForm", dbController.validateCategory, dbController.submitCategory);

// request to delete a category
router.post("/deleteCategory/:name", dbController.deleteCategory);



module.exports = router;