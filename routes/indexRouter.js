const { Router } = require("express");
const router = Router();
const dbController = require("../controllers/dbController");


// NOTE TO SELF: ordering here matters, put /:A/B before /:A/:C, otherwise all pages that should be /:A/B will instead be assumed as /:A/:C


// home/all categories link
router.get("/", dbController.openHome);

// category creation page/form link
router.get("/categoryForm", dbController.openCategoryForm);
// submission of the above form
router.post("/categoryForm", dbController.validateCategory, dbController.submitCategory);

// request to delete a category
router.post("/deleteCategory/:category_name", dbController.deleteCategory);

// link to all items in a specified category link
router.get("/:category_name/itemForm", dbController.openItemForm);
// link to all items in a specified category link
router.post("/:category_name/itemForm", dbController.validateItem, dbController.submitItem);

// link to all items in a specified category link
router.get("/:category_name", dbController.openCategory);
// link to item in a category
router.get("/:category_name/:item_name", dbController.openItemDetails);

// request to delete an item (from a category)
router.post("/deleteItem/:category_name/:item_name", dbController.deleteItem);

module.exports = router;