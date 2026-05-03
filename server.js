import express from 'express';
import { exec } from 'child_process';

const app = express();
const PORT = 3000;

// serve static frontend
app.use(express.static('public'));

app.get('/scan', (req, res) => {
  exec('node scan.mjs --dry-run --json', (err, stdout) => {
    if (err) {
      return res.json({ error: err.message });
    }

    try {
      const jobs = JSON.parse(stdout);
      res.json({ jobs });
    } catch (e) {
      res.json({ error: 'Failed to parse output', raw: stdout });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});