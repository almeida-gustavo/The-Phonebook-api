import 'reflect-metadata';
import express from 'express';

import '@shared/infra/typeorm';

const app = express();

app.use(express.json());

app.get('/test', (req, res) => {
  return res.json('Hello App');
});

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Server is runing on port 3333');
});
