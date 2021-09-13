const express = require('express');
const app = express();
const pg = require("pg");
const { port, dbUrl } = require('../config');

// Coneccion a PostreSQL con PG
const pgClient = new pg.Client({ connectionString: dbUrl });
pgClient.connect();
pgClient.query("SELECT NOW()", (err, res) => {
  console.log('conectado a la base de datos');  
});

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes

app.use(require('./routes/index'));



app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})