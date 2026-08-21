const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function getAllItems() {
  const { rows } = await pool.query("SELECT * FROM items");
  return rows;
}

async function getCategoryItems(name) {
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
  
  const errors = [];
  try {
    await pool.query(sql, [name, description]);
  } catch (err) {
    // specific error code for primary key conflict
    if (err.code === "23505") {
      errors.push({ msg: "Item already exists in this category." });
    }
  }
  return errors;
}

async function deleteCategory(name) {
  const sql = `
  DELETE FROM categories
  WHERE name = $1;
  `;
  await pool.query(sql, [name]);
}

async function getItem(name) {
  const sql = `
  SELECT *
  FROM items
  WHERE name = $1;
  `;
  // using parameterized queries is good practice, decreases possibility of unwanted SQL injections
  const row = (await pool.query(sql, [name])).rows[0];
  // console.log("row:", row);
  return row;
}

async function postNewItem(categoryName, itemName, description, stock) {
  // "ON CONFLICT (name) DO NOTHING" basically just ignores the primary key conflict and skips the query
  const sql1 = `
  INSERT INTO items (name, description, stock) 
  VALUES ($1, $2, $3)
  ON CONFLICT (name) DO NOTHING;
  `;
  const sql2 = `
  INSERT INTO category_items (category_name, item_name) 
  VALUES ($1, $2);
  `;

  await pool.query(sql1, [itemName, description, stock]);

  const errors = [];
  try {
    await pool.query(sql2, [categoryName, itemName]);
  } catch (err) {
    // specific error code for primary key conflict
    if (err.code === "23505") {
      errors.push({ msg: "Item already exists in this category." });
    }
  }
  return errors;
}

async function deleteItem(name) {
  const sql = `
  DELETE FROM items
  WHERE name = $1;
  `;
  await pool.query(sql, [name]);
}

async function getValidItemsForCategory(categoryName) {
  // joins items and category_items, selects all entries that
  const sql = `
  SELECT i.*
  FROM items i
  LEFT JOIN category_items ci
    ON ci.item_name = i.name
    AND ci.category_name = $1
  WHERE ci.item_name IS NULL;
  `;
  const { rows } = await pool.query(sql, [categoryName]);
  // console.log("rows:", rows);
  return rows;
}

async function postCategoryItem(categoryName, itemName) {
  const sql = `
  INSERT INTO category_items (category_name, item_name) 
  VALUES
    ($1, $2);
  `;
  await pool.query(sql, [categoryName, itemName]);
}

module.exports = {
  getAllCategories,
  getAllItems,
  postNewCategory,
  getCategoryItems,
  deleteCategory,
  getItem,
  postNewItem,
  deleteItem,
  getValidItemsForCategory,
  postCategoryItem
};
