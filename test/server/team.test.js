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

describe('POST /api/v1/team', function() {
  before(function(done) {
    this.timeout(10000);
    DbUtils.clean(knex).then(function() { done(); });
  });

  it('should create team', function(done) {
    request(server)
      .post(`/api/v1/team`)
      .set('Authorization', TestUtils.authToken())
      .send({
        account_id: TestUtils.defaultAccount().get('id'),
        team_name: 'New Team Name Test'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        should.exist(res.body.team);
        should(res.body.team.display_name).be.equal('New Team Name Test');
        done(err);
      });
  });

  it('should not create team duplicate team', function(done) {
    request(server)
      .post(`/api/v1/team`)
      .set('Authorization', TestUtils.authToken())
      .send({
        account_id: TestUtils.defaultAccount().get('id'),
        team_name: 'New Team Name Test'
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .end(function(err, res) {
        should(res.body.msg).be.equal('Duplicate short name for team.');
        done(err);
      });
  });

  it('should require authentication', function(done) {
    request(server)
      .post(`/api/v1/team`)
      .expect('Content-Type', /json/)
      .expect(401)
      .end(function(err, res) {
        should(res.body.msg).equal('Unauthorized');
        done(err);
      });
  });
});

