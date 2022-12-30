require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const pg = require('pg');
const app = express();
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(staticMiddleware);

app.get('/api/finalproject', (req, res, next) => {
  const sql = `
    select *
      from "courseEntries"
  `;
  db.query(sql)
    .then(result => {
      const users = result.rows;
      res.json(users);
    })
    .catch(err => next(err));
});
app.use(express.json());
app.post('/api/finalproject', (req, res, next) => {
  const { courseName } = req.body;
  // const color = req.body.colorCode;
  // const user = Number(req.body.userId);
  const sql = `insert into "courseEntries" ("courseName", "colorCode", "userId")
                values($1, 'blue', '1')
                returning *`;
  const values = [courseName];
  db.query(sql, values)
    .then(result => {
      const course = result.rows[0];
      return res.status(201).json(course);
    })
    .catch(err => next(err));

});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
