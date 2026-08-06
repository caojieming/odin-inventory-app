const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries");

async function openHome(req, res) {
  const messages = await db.getAllMessages();
  // console.log("All messages: ", messages);
  res.render("index", { title: "Mini Messageboard", messages: messages });
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

async function openDetails(req, res) {
  const msgId = req.params.id;
  const msg = (await db.getMessageDetails(msgId)).rows[0];
  // console.log("message: ", msg);
  res.render("details", { title: "Message Details", message: msg });
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
  openDetails,
  deleteMessage
};
