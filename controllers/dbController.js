const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries");

async function openHome(req, res) {
  const categories = await db.getAllCategories();
  res.render("index", { categories: categories });
}

async function openCategory(req, res) {
  const categoryId = req.params.id;
  const catItems = (await db.getCategory(categoryId));
  // TODO/continue here: figure out what exactly catItems is returning
  console.log("category: ", catItems);
  res.render("category", { name: categoryId, items: catItems });
}

async function openForm(req, res) {
  res.render("form", { title: "New Post!" });
}

const validateMessage = [
  body("username").trim()
    .notEmpty().withMessage("Username should not be empty."),
  body("text").trim()
    .isLength({ min: 10 }).withMessage("Message should be at least 10 characters long."),
];
async function submitForm(req, res) {
  // validate inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("form", {
      title: "New Post!",
      errors: errors.array(),
    });
  }
  // effectively "const username = req.body.username" and "const text = req.body.text"
  const { username, text } = matchedData(req);
  const added = (new Date()).toISOString();
  await db.postNewMessage(added, username, text);
  res.redirect("/");
}

async function deleteMessage(req, res) {
  const msgId = req.params.id;
  await db.deleteMessage(msgId);
  res.redirect("/");
}

module.exports = {
  openHome,
  openForm,
  validateMessage,
  submitForm,
  openCategory,
  deleteMessage
};
