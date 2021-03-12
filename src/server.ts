import express from 'express';

const app = express();

app.get('/*', (req, res) => {
  res.send(200);
});

app.listen(8080);