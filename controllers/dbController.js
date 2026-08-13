const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries");

async function openHome(req, res) {
  const categories = await db.getAllCategories();
  res.render("index", { categories: categories });
}

async function openCategory(req, res) {
  const catName = req.params.name;
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
  await db.postNewCategory(name, description);
  res.redirect("/");
}

async function deleteCategory(req, res) {
  const catName = req.params.name;
  await db.deleteCategory(catName);
  res.redirect("/");
}

async function openItemDetails(req, res) {
  const catName = req.params.category_name;
  const itemName = req.params.item_name;
  const item = await db.getItem(itemName);
  res.render("itemDetails", { category_name: catName, item: item });
}

module.exports = {
  openHome,
  openCategoryForm,
  validateCategory,
  submitCategory,
  openCategory,
  deleteCategory,
  openItemDetails
};
