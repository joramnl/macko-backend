const db = require('./db');

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
  return forms;

  const rows = await db.query(
    `SELECT id, name 
    FROM forms`
  );

  const data = rows ? rows : [];

  return {
    data,
  };
}

async function get(id) {
  return forms.find((form) => form.id == id);
}

async function create(name) {
  let data = {
    id: ++id,
    name,
  };

  forms.push(data);
  return data;
}

async function remove(id) {
  if (!get(id)) return false;

  forms = forms.filter((form) => form.id != id);
  return true;
}

module.exports = {
  getAll,
  get,
  create,
  remove,
};
