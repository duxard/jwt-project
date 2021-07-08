const mongoose = require('mongoose');

function getMongoConnectionUrl(config) {
  return `mongodb+srv://${config.user}:${config.pass}@${config.cluster}/test?retryWrites=true`;
}

module.exports = {
  connect: DB_CONFIG => {

    mongoose.connect(
      getMongoConnectionUrl(DB_CONFIG),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );

    const connection = mongoose.connection;

    connection.
      once('open', () => {
        console.log('mongo connection open');
      })
      .once('connected', () => {
        console.log('mongo connected');
      })
      .on('error', (error) => {
        console.log('mongo connection error: ', error);
      })
      .on('disconnected', () => {
        console.log('mongo connection disconnected');
      })
      .on('reconnected', () => {
        console.log('mongo connection reconnected');
      })
  },
  getMongoStoreClient: () => ({
    db: () => mongoose.connection
  }),
  // close the connection
  close: () => {
    console.log('Force close the MongoDB connection');
    mongoose.connection.close();
  }
};
