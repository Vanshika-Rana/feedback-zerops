import express from 'express';
import path from 'path';
import { connectDB } from './db';

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.get('/count', async (_, res) => {
  const client = await connectDB();
  const result = await client.query('SELECT COUNT(*) FROM clicks');
  await client.end();
  res.json({ count: parseInt(result.rows[0].count) });
});

app.post('/click', async (_, res) => {
  const client = await connectDB();
  await client.query('INSERT INTO clicks DEFAULT VALUES');
  const result = await client.query('SELECT COUNT(*) FROM clicks');
  await client.end();
  res.json({ count: parseInt(result.rows[0].count) });
});

app.get('/status', (_, res) => {
  res.status(200).send({ status: 'UP' });
});

export default app;