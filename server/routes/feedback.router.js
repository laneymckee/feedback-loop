const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

router.post('/', (req, res) => {
  let feedbackEntry = req.body;
  console.log('Adding feedback...', feedbackEntry);
  let queryText = `INSERT INTO "feedback" ("feeling", "understanding", "support", "comments")
                    VALUES ($1, $2, $3, $4);`;
  pool
    .query(queryText, [
      feedbackEntry.feeling,
      feedbackEntry.understanding,
      feedbackEntry.support,
      feedbackEntry.comments
    ])
    .then(result => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.log('Error adding feedback');
      res.sendStatus(500);
    });
});

module.exports = router;
