const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 8000;
const host = "127.0.0.1";
const app = express();
const mongoose = require('mongoose');
const api = require('./routes/api');
const bodyParser = require('body-parser');

// @todo: needed for old way of connecting to Mongo
require('dotenv').config();

// settings import
const settings = require('./services/settings');
const database = require('./services/database');
database.connect(settings.get('database').mongo);

// @todo: old usage
// mongoose.connect(
//   `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_CLUSTER}/test?retryWrites=true`,
//   { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(data => console.log(`MongoDB: connected successfully`))
//   .catch(err => {
//     console.log(`MongoDB: fail`);
//     console.error( err );
//   });

app.use(cors());
app.use(bodyParser.json());
app.use(api);

app.listen(port, host, () => {
  console.log(`Server is running at ${host}:${port}`);
});

process.on('SIGINT', function() {
  database.close();
  process.exit(0)
});
