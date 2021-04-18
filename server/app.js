const express = require('express');
const cors = require('cors');
const port = 8000;
const host = "127.0.0.1";
const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.json({
    message: 'Home page'
  });
});

app.listen(port, host, () => {
  console.log(`Server is running at ${host}:${port}`);
});
