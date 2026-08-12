const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function getCategory(id) {
  const sql = `
  SELECT category_name, item_name, description, stock
  FROM category_items JOIN items
    ON item_name = name
  WHERE category_name = '${id}';
  `;
  const rows = (await pool.query(sql)).rows;
  return rows;
}

async function postNewMessage(added, username, text) {
  const SQL = `
  INSERT INTO messages (added, username, text) 
  VALUES
    ('${added}', '${username}', '${text}');
  `;
  await pool.query(SQL);
}

async function deleteMessage(id) {
  await pool.query(`DELETE FROM messages WHERE id = '${id}'`);
}

module.exports = {
  getAllCategories,
  postNewMessage,
  getCategory,
  deleteMessage
};
