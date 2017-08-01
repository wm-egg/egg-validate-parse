'use strict';

module.exports = app => {
  class BaseController extends app.Controller {
    * index(ctx) {
      const rules = {
        id: {
          type: 'id',
          required: true,
          scope: 'params',
        },
        query1: {
          type: 'int',
          required: true,
          scope: 'query',
        },
        query2: {
          type: 'number',
          required: false,
          scope: 'query',
          name: 'queryAlias2',
        },
        queries1: {
          type: 'array',
          required: false,
          scope: 'queries',
        },
        data1: {
          type: 'number',
          required: true,
          scope: 'body',
        },
        data2: {
          type: 'string',
          required: true,
        },
        data3: {
          type: 'array',
          required: true,
        },
        data4: {
          type: 'bool',
          required: true,
        },
      };

      const result = ctx.validateParse(rules);

      this.logger.debug('validate success');

      ctx.body = result;
      return;
    }
  }
  return BaseController;
};
