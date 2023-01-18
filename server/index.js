require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const argon2 = require('argon2');
const ClientError = require('./client-error');
const jwt = require('jsonwebtoken');
const pg = require('pg');
const app = express();
const authorizationMiddleware = require('./authorization-middleware');
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(staticMiddleware);

// app.get('/api/finalproject', (req, res, next) => {
//   const userId = req.body;
//   const sql = `
//     select *
//       from "courseEntries"
//      where "userId" = 2
//   `;
//   const params = [userId];
//   db.query(sql, params)
//     .then(result => {
//       res.json(result.rows);
//       console.log(result.rows);
//     })
//     .catch(err => next(err));
// });

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
  const { userId } = req.body;
  const sql = `insert into "courseEntries" ("courseName", "colorCode", "userId")
                values($1, $2, $3)
                returning *`;
  const values = [courseName, colorCode, userId];
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
  const { courseId } = req.body;
  const sql = `insert into "assignments" ("assignment", "about", "dateDue","courseId")
                values($1, $2, $3, $4)
                returning *`;
  const values = [assignment, about, dateDue, courseId];
  db.query(sql, values)
    .then(result => {
      const course = result.rows[0];
      res.status(201).json(course);
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
        res.status(201).json(data);
      }
    })
    .catch(err => next(err));

});

app.delete('/api/finalproject/:courseId', (req, res, next) => {
  const { courseId } = req.params;
  const sql =
    ` WITH moved_rows AS (
    DELETE FROM "assignments"
    WHERE "courseId" = $1
)
delete
from "courseEntries"
where "courseId" = $1
`;
  const course = [courseId];
  db.query(sql, course)
    .then(result => {
      res.sendStatus(204);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-up', (req, res, next) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  argon2
    .hash(password)
    .then(password => {
      const sql = `insert into users ("userName","hashedPassword")
              values ($1, $2)
              returning *`;
      const values = [userName, password];
      db.query(sql, values)
        .then(result => {
          const user = result.rows[0];
          res.status(201).json(user);
        })
        .catch(err => {
          next(err);
        });
    })
    .catch(err => next(err));

});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select "userId",
           "hashedPassword"
      from "users"
     where "userName" = $1
  `;
  const params = [userName];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, userName };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});
app.use(authorizationMiddleware);
app.get('/api/finalproject', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
    select *
      from "courseEntries"
     where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
