const db = require('./db');
const { getDateTime } = require('./utils');

let id = 2;
let forms = [
  {
    id: 0,
    name: 'test',
  },
  {
    id: 1,
    name: 'donald duck',
  },
  {
    id: 2,
    name: 'mickey mouse',
  },
];

async function getAll() {
  const rows = await db.query(
    `SELECT * 
    FROM form`
  );

  let data = rows ? rows : [];

  data.map((row) => (row.fields = JSON.parse(row.fields)));

  return data;
}

async function get(id) {
  const rows = await db.query(
    `SELECT * 
    FROM form
    WHERE id=${id}`
  );

  let data = rows ? rows : [];

  data.map((map) => (map.fields = JSON.parse(map.fields)));

  return data;
}

async function create(name, fields) {
  if (!name || !fields) return null;

  let datetime = getDateTime();

  const rows = await db.query(
    `INSERT INTO form
    (name, fields, created_on, updated_on)
    VALUES (?, ?, ?, ?)`,
    [name, JSON.stringify(fields), datetime, datetime]
  );

  const data = rows ? rows : [];

  return data;
}

async function remove(id) {
  if (!get(id)) return false;

  const rows = await db.query(
    `DELETE FROM form
     WHERE id=${id}`,
    [id]
  );

  console.log(rows.affectedRows);

  return true;
}

module.exports = {
  getAll,
  get,
  create,
  remove,
};
