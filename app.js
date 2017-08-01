'use strict';
const Parameter = require('parameter');

module.exports = app => {
  app.parameter = new Parameter();
  app.logger.warn(`[${app.config.validateParse.appName}] plugins start with config ${JSON.stringify(app.config.validateParse)}`);
};
