const express = require('express');
const cors = require('cors');
const { getDateTime } = require('./services/utils');
const port = 3000;

require('dotenv').config();

const app = express();

console.log(getDateTime());

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use('/form', require('./routes/form'));

app.get('/', (req, res) => {
  res.json({
    version: process.env.npm_package_version,
  });
});

app.get('*', function (req, res) {
  res.status(404).json({
    error: 404,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
