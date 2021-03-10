import express from 'express';

const app = express();

app.get('/*', (req, res) => {
  console.warn('wow');
  console.warn('wow');
  res.send(200);
});

app.listen(8080);