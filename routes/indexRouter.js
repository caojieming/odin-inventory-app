const { Router } = require("express");
const router = Router();
const dbController = require("../controllers/dbController");


// home/all categories link
router.get("/", dbController.openHome);

// category creation page/form link
router.get("/categoryForm", dbController.openCategoryForm);
// submission of the above form
router.post("/categoryForm", dbController.validateCategory, dbController.submitCategory);

// request to delete a category
router.post("/deleteCategory/:category_name", dbController.deleteCategory);

// link to all items in a specified category link
router.get("/category/:category_name", dbController.openCategory);
// link to item in a category
router.get("/category/:category_name/item/:item_name", dbController.openItemDetails);

// link to all items in a specified category link
router.get("/category/:category_name/itemForm", dbController.openItemForm);
// link to all items in a specified category link
router.post("/category/:category_name/itemForm", dbController.validateItem, dbController.submitItem);

module.exports = router;