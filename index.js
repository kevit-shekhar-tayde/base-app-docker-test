require('dotenv').config();
const express = require('express');
const { Client } = require('pg');

const app = express();

const port = process.env.PORT || 3000;

const db = new Client({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
});

// console.log(process.env.PGHOST,process.env.PGPORT,process.env.PGDATABASE,process.env.PGUSER,process.env.PGPASSWORD)

db.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
  })
  .catch((err) => {
    console.error('Failed to connect to PostgreSQL:', err);
  });

  app.use((req, res, next) => {
    console.log('Request headers:', req.headers);
    console.log('Request URL:', req.url);
    next();
  });

app.get('/', async (req, res) => {
  res.send('application running from your k8s');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
