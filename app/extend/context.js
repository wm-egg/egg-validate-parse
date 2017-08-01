'use strict';

function parseArray(data) {
  return data.split(',');
}

function parseObject(data) {
  return JSON.parse(data);
}

function parse(type, data) {
  if (type === 'int' || type === 'integer' || type === 'number') {
    return Number.parseFloat(data);
  } else if (type === 'boolean' || type === 'bool') {
    return typeof data === 'undefined' ? false : (data === true || data === 'true' || data === '1');  // 'true' or '1'
                                                                                                      // can parsed to
                                                                                                      // boolean true
  } else if (type === 'array' && typeof data === 'string') {
    return parseArray(data);
  } else if (type === 'object' && typeof data === 'string') {
    return parseObject(data);
  }

  return data;
}

module.exports = {
  /**
   * validate data with rules
   *
   * @param  {Object} rules  - validate rule object, see [parameter](https://github.com/node-modules/parameter);
   * @param  {Object} [data] - validate target, if passed
   * @return {*} return data has been validated and parsed
   */
  validateParse(rules, data) {
    const ruleKeys = Object.keys(rules);
    // this.app.logger.debug(`[${this.app.config.validateParse.appName}] rules, data`, rules, data);

    if (!data) {
      data = {};
      const body = this.request.body;
      const params = this.params;
      const query = this.query;
      const queries = this.queries;
      const state = this.state;
      // this.app.logger.debug(`[${this.app.config.validateParse.appName}] body, params, query, queries, state`, body,
      // params, query, queries, state);

      ruleKeys.map(key => {
        const rule = rules[key];
        const scope = rule.scope || 'body';
        const keyName = key;

        switch (scope) {
          case 'body':
            if (typeof body[key] !== 'undefined') {
              data[keyName] = parse(rule.type, body[key]);
            }
            break;
          case 'params':
            if (typeof params[key] !== 'undefined') {
              data[keyName] = parse(rule.type, params[key]);
            }
            break;
          case 'query':
            if (typeof query[key] !== 'undefined') {
              data[keyName] = parse(rule.type, query[key]);
            }
            break;
          case 'queries':
            if (typeof queries[key] !== 'undefined') {
              data[keyName] = parse(rule.type, queries[key]);
            }
            break;
          case 'state':
            if (typeof state[key] !== 'undefined') {
              data[keyName] = parse(rule.type, state[key]);
            }
            break;
          default:
            throw new Error('unsupported scope in rules');
        }

        return 0;
      });
    }
    // this.app.logger.debug(`[${this.app.config.validateParse.appName}] parse result`, data);

    const errors = this.app.parameter.validate(rules, data);
    if (errors) {
      this.throw(422, 'Validation Failed', {
        code: 'invalid_param',
        errors,
      });
    }

    ruleKeys.map(key => {
      const rule = rules[key];
      const name = rule.name;

      if (name) {
        data[name] = data[key];
        delete data[key];
      }

      return null;
    });

    this.app.logger.debug(`[${this.app.config.validateParse.appName}] validate and parse result`, data);

    return data;
  },
};
