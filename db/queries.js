const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function getCategory(name) {
  const sql = `
  SELECT category_name, item_name, description, stock
  FROM category_items JOIN items
    ON item_name = name
  WHERE category_name = $1;
  `;
  // using parameterized queries is good practice, decreases possibility of unwanted SQL injections
  const rows = (await pool.query(sql, [name])).rows;
  return rows;
}

async function postNewCategory(name, description) {
  const SQL = `
  INSERT INTO categories (name, description) 
  VALUES
    ($1, $2);
  `;
  // again, using parameterized queries reduces possibility of unwanted SQL injections
  await pool.query(SQL, [name, description]);
}

async function deleteCategory(name) {
  const SQL1 = `
  DELETE FROM categories WHERE name = $1;
  `;
  const SQL2 = `
  DELETE FROM category_items WHERE category_name = $1;
  `;
  await pool.query(SQL1, [name]);
  await pool.query(SQL2, [name]);
}

async function getItem(name) {
  const sql = `
  SELECT *
  FROM items
  WHERE name = $1;
  `;
  // using parameterized queries is good practice, decreases possibility of unwanted SQL injections
  const rows = (await pool.query(sql, [name])).rows[0];
  return rows;
}

module.exports = {
  getAllCategories,
  postNewCategory,
  getCategory,
  deleteCategory,
  getItem
};
