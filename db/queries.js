const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
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

async function getMessageDetails(id) {
  const row = await pool.query(`SELECT * FROM messages WHERE id = '${id}'`);
  return row;
}

async function deleteMessage(id) {
  await pool.query(`DELETE FROM messages WHERE id = '${id}'`);
}

module.exports = {
  getAllMessages,
  postNewMessage,
  getMessageDetails,
  deleteMessage
};
