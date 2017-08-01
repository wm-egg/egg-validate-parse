'use strict';

module.exports = app => {
  app.get('/', function* () {
    this.body = 'hi, ' + app.plugins.validateParse.name;
  });
  app.post('/:id', app.controller.base.index);
};
