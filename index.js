const express = require('express');
const cors = require('cors');
const port = 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use('/form', require('./routes/form'));

app.get('/', (req, res) => {
  res.json({
    version: process.env.npm_package_version
  })
});

app.get('*', function(req, res){
  res.status(404).json({
    error: 404
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});