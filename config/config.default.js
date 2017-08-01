'use strict';

/**
 * egg-validate-parse default config
 * @member Config#validateParse
 * @property {String} SOME_KEY - some description
 * @return {*} config object
 */
module.exports = () => {
  const exports = {};

  exports.validateParse = {
    appName: 'egg:validate-parse',
  };

  return exports;
};
