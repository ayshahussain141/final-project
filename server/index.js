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

app.get('/api/finalproject/assignment', (req, res, next) => {
  const sql = `
    select *
      from "assignments"
       order by "assignmentId"
  `;
  db.query(sql)
    .then(result => {
      const users = result.rows;
      res.json(users);
    })
    .catch(err => next(err));
});

app.get('/api/finalproject/assignment/:assignmentId', (req, res, next) => {
  const { assignmentId } = req.params;
  const sql = `
    select *
      from "assignments"
      where "assignmentId" = $1
  `;
  const params = [assignmentId];
  db.query(sql, params)
    .then(result => {
      const users = result.rows[0];
      res.json(users);
    })
    .catch(err => next(err));
});

app.use(express.json());
app.post('/api/finalproject', (req, res, next) => {
  const { courseName } = req.body;
  const { colorCode } = req.body;
  // const user = Number(req.body.userId);
  const sql = `insert into "courseEntries" ("courseName", "colorCode", "userId")
                values($1, $2, '1')
                returning *`;
  const values = [courseName, colorCode];
  db.query(sql, values)
    .then(result => {
      const course = result.rows[0];
      return res.status(201).json(course);
    })
    .catch(err => next(err));
});

app.post('/api/finalproject/assignment', (req, res, next) => {
  const { assignment } = req.body;
  const { about } = req.body;
  const { dateDue } = req.body;
  // const { courseId } = req.body;
  const sql = `insert into "assignments" ("assignment", "about", "dateDue","courseId")
                values($1, $2, $3,'1')
                returning *`;
  const values = [assignment, about, dateDue];
  db.query(sql, values)
    .then(result => {
      const course = result.rows[0];
      return res.status(201).json(course);
    })
    .catch(err => next(err));
});

app.patch('/api/finalproject/assignment/:assignmentId', (req, res, next) => {
  const { assignmentId } = req.params;
  const { isCompleted } = req.body;
  const sql = `
    update "assignments"
    set "createdAt" = now(),
        "isCompleted" = $1
        where "assignmentId" = $2
         returning *
  `;
  const params = [isCompleted, assignmentId];
  db.query(sql, params)
    .then(result => {
      const data = result.rows[0];
      if (!data) {
        res.status(400).json({ error: 'Id does not exist' });
      } else {
        res.json(data);
      }
    })
    .catch(err => next(err));

});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
