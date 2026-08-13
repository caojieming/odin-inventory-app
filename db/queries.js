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
  WHERE category_name = $1;
  `;
  // using parameterized queries is good practice, decreases possibility of unwanted SQL injections
  const rows = (await pool.query(sql, [id])).rows;
  return rows;
}

async function postNewCategory(name, description) {
  console.log("name: ", name);
  console.log("description: ", description);
  const SQL = `
  INSERT INTO categories (name, description) 
  VALUES
    ($1, $2);
  `;
  // again, using parameterized queries reduces possibility of unwanted SQL injections
  await pool.query(SQL, [name, description]);
}

async function deleteMessage(id) {
  await pool.query(`DELETE FROM messages WHERE id = '${id}'`);
}

module.exports = {
  getAllCategories,
  postNewCategory,
  getCategory,
  deleteMessage
};
