import express from 'express';

const app = express();

app.use(express.json());

app.get('/test', (req, res) => {
  return res.json('Hello App');
});

app.listen(3333, () => {
  console.log('Server is runing on port 3333');
});
