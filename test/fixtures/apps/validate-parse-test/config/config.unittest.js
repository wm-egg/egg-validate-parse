'use strict';

exports.keys = '123456';

exports.middleware = [
  'errorHandler',
];

exports.validateParse = {
  appName: 'egg:validate-parse',
};

exports.logger = {
  level: 'WARN',
  consoleLevel: 'DEBUG',
};
