var jwt = require('jsonwebtoken');
var config = require('../../knexfile');
var knex = require('knex')(config);
var request = require('supertest');
var should = require('should');
var server = require('../../server');
var knexCleaner = require('knex-cleaner');
var User = require('../../models/User');
var DbUtils = require('./db.utils');
var TestUtils = require('./utils');

describe('GET /api/v1/account/:id', function() {
  before(function(done) {
    this.timeout(10000);
    DbUtils.clean(knex).then(function() { done(); });
  });

  it('should get account', function(done) {
    request(server)
      .get(`/api/v1/account/${TestUtils.defaultAccount().get('id')}`)
      .set('Authorization', TestUtils.authToken())
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        should.exist(res.body.account);
        should(res.body.account.name).be.equal(TestUtils.defaultAccount().get('name'));
        done(err);
      });
  });

  it('should require authentication', function(done) {
    request(server)
      .get(`/api/v1/account/${TestUtils.defaultAccount().get('id')}`)
      .expect('Content-Type', /json/)
      .expect(401)
      .end(function(err, res) {
        should(res.body.msg).equal('Unauthorized');
        done(err);
      });
  });
});

