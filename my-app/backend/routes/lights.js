import express from 'express';
import db from '../db/index.js';

const router = express.Router();

router.post('/toggle', (req, res) => {
  const { on } = req.body;

  if (on) {
    const timestamp = new Date().toISOString();
    db.run('INSERT INTO light_logs (timestamp) VALUES (?)', [timestamp], function (err) {
      if (err) return res.status(500).json({ error: 'DB error' });

      db.get('SELECT COUNT(*) AS count FROM light_logs', (err, row) => {
        if (err) return res.status(500).json({ error: 'DB error' });

        res.json({
          counter: row.count,
          lastTime: timestamp,
        });
      });
    });
  } else {
    res.json({ message: "Light turned off, no DB action." });
  }
});

router.get('/status', (req, res) => {
  db.get('SELECT COUNT(*) AS count FROM light_logs', (err, countRow) => {
    if (err) return res.status(500).json({ error: 'DB error' });

    db.get('SELECT timestamp FROM light_logs ORDER BY id DESC LIMIT 1', (err, timeRow) => {
      if (err) return res.status(500).json({ error: 'DB error' });

      res.json({
        counter: countRow.count,
        lastTime: timeRow ? timeRow.timestamp : null,
      });
    });
  });
});

export default router;
