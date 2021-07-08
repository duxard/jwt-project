'use strict';

const path = require('path');
const nconf = require('nconf');

const defaultConfig = 'cfg/config.json';

const settings = nconf.argv()
  .env()
  .file({ file: `${path.dirname(__filename)}/../${defaultConfig}` });

module.exports = settings;


