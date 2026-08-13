const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries");

async function openHome(req, res) {
  const categories = await db.getAllCategories();
  res.render("index", { categories: categories });
}

async function openCategory(req, res) {
  const categoryId = req.params.id;
  const catItems = await db.getCategory(categoryId);
  // console.log("category: ", catItems);
  res.render("category", { name: categoryId, items: catItems });
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

async function deleteMessage(req, res) {
  const msgId = req.params.id;
  await db.deleteMessage(msgId);
  res.redirect("/");
}

module.exports = {
  openHome,
  openCategoryForm,
  validateCategory,
  submitCategory,
  openCategory,
  deleteMessage
};
