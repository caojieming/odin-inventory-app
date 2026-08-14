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
  const sql = `
  INSERT INTO categories (name, description) 
  VALUES
    ($1, $2);
  `;
  // again, using parameterized queries reduces possibility of unwanted SQL injections
  await pool.query(sql, [name, description]);
}

async function deleteCategory(name) {
  const sql1 = `
  DELETE FROM categories WHERE name = $1;
  `;
  const sql2 = `
  DELETE FROM category_items WHERE category_name = $1;
  `;
  await pool.query(sql1, [name]);
  await pool.query(sql2, [name]);
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

async function postNewItem(categoryName, itemName, description, stock) {
  const sql1 = `
  INSERT INTO items (name, description, stock) 
  VALUES
    ($1, $2, $3);
  `;
  const sql2 = `
  INSERT INTO category_items (category_name, item_name) 
  VALUES
    ($1, $2);
  `;
  await pool.query(sql1, [itemName, description, stock]);
  await pool.query(sql2, [categoryName, itemName]);
}

module.exports = {
  getAllCategories,
  postNewCategory,
  getCategory,
  deleteCategory,
  getItem,
  postNewItem
};
