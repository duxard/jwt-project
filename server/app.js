const express = require('express');
const cors = require('cors');
const port = 8000;
const host = "127.0.0.1";
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes/routes');

app.use(cors());

//Connect to mongodb
mongoose.connect(
  `mongodb+srv://duxard23:duxard23@cluster0-wgddl.mongodb.net/test?retryWrites=true`,
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(data => console.log(`MongoDB: connected successfully`))
  .catch(err => {
    console.log(`MongoDB: fail`);
    console.error( err );
  });

app.use(routes);

app.listen(port, host, () => {
  console.log(`Server is running at ${host}:${port}`);
});
