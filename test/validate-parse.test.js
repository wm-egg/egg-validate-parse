'use strict';

const request = require('supertest');
const mm = require('egg-mock');

describe('test/validate-parse.test.js', () => {
  let app;
  before(() => {
    app = mm.app({
      baseDir: 'apps/validate-parse-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mm.restore);

  it('should GET /', () => {
    return request(app.callback()).get('/')
    .expect('hi, validateParse')
    .expect(200);
  });
  it('validate POST success', () => {
    app.mockCsrf();

    return request(app.callback()).post('/15?query1=1&query2=2&queries1=1&queries1=2')
    .send({
      data1: 123,
      data2: 'blala',
      data3: '1, 2',
      data4: true,
    })
    .expect({
      id: '15',
      query1: 1,
      queryAlias2: 2,
      queries1: [ '1', '2' ],
      data1: 123,
      data2: 'blala',
      data3: [ '1', ' 2' ],
      data4: true,
    })
    .expect(200);
  });
  it('validate POST fail', () => {
    app.mockCsrf();

    return request(app.callback()).post('/15?query1=1&query2=2&queries1=1&queries1=2')
    .send({
      data1: 123,
      data2: 'blaaah',
    })
    .expect({
      success: false,
      message: 'Validation Failed',
      detail: [
        { message: 'required', field: 'data3', code: 'missing_field' },
        { message: 'required', field: 'data4', code: 'missing_field' },
      ],
    })
    .expect(200);
  });
});
