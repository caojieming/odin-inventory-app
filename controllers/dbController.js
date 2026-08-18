const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries");

async function openHome(req, res) {
  const categories = await db.getAllCategories();
  res.render("index", { categories: categories });
}

async function openCategory(req, res) {
  const catName = req.params.category_name;
  const catItems = await db.getCategory(catName);
  // console.log("category: ", catItems);
  res.render("category", { category_name: catName, items: catItems });
}

async function openCategoryForm(req, res) {
  res.render("categoryForm");
}

const validateCategory = [
  body("name").trim()
    .notEmpty().withMessage("Category name should not be empty."),
  body("description").trim()
    .isLength({ min: 10 }).withMessage("Category description should be at least 10 characters long."),
];
async function submitCategory(req, res) {
  // validate inputs, reload page with error messages if invalid
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("categoryForm", {
      errors: errors.array(),
    });
  }

  // effectively "const name = req.body.name" and "const description = req.body.description"
  const { name, description } = matchedData(req);
  const postErrors = await db.postNewCategory(name, description);
  // check if any post errors (mainly if an entry with the same primary key, aka category name, already exists in the "categories" DB)
  if(postErrors.length === 0) {
    res.redirect("/");
  }
  else {
    return res.status(400).render("categoryForm", {
      errors: postErrors,
    });
  }
}

async function deleteCategory(req, res) {
  const catName = req.params.category_name;
  await db.deleteCategory(catName);
  res.redirect("/");
}

async function openItemDetails(req, res) {
  const catName = req.params.category_name;
  const itemName = req.params.item_name;
  const item = await db.getItem(itemName);
  res.render("itemDetails", { category_name: catName, item: item });
}

async function openItemForm(req, res) {
  const catName = req.params.category_name;
  res.render("itemForm", { category_name: catName });
}

const validateItem = [
  body("name").trim()
    .notEmpty().withMessage("Item name should not be empty."),
  body("description").trim()
    .isLength({ min: 10 }).withMessage("Item description should be at least 10 characters long."),
  body("stock").trim()
    .notEmpty().withMessage("Item stock should not be empty.")
    .isInt({ min: 0 }).withMessage("Item stock should be a non-negative number."),
];
async function submitItem(req, res) {
  const catName = req.params.category_name;
  const errors = validationResult(req);

  // display an error message on the page if input validation fails
  if (!errors.isEmpty()) {
    return res.status(400).render("itemForm", {
      // this works, apparently
      category_name: catName,
      errors: errors.array(),
    });
  }

  const { name, description, stock } = matchedData(req);
  const itemName = name;
  const postErrors = await db.postNewItem(catName, itemName, description, stock);
  // check if any post errors (mainly if an entry with the same primary keys, aka category_name and item_name, already exists in the "category_items" DB)
  if(postErrors.length === 0) {
    res.redirect(`/category/${catName}`);
  }
  else {
    return res.status(400).render("itemForm", {
      category_name: catName,
      errors: postErrors,
    });
  }
}

module.exports = {
  openHome,
  openCategoryForm,
  validateCategory,
  submitCategory,
  openCategory,
  deleteCategory,
  openItemDetails,
  openItemForm,
  validateItem,
  submitItem
};
