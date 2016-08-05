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

describe('GET /api/v1/clip', function() {
  before(function(done) {
    this.timeout(10000);
    DbUtils.clean(knex).then(function() { done(); });
  });

  it('should get clips', function(done) {
    request(server)
      .get('/api/v1/clip')
      .set('Authorization', TestUtils.authToken())
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        should(res.body.clips).have.length(0);
        done(err);
      });
  });

  it('should require authentication', function(done) {
    request(server)
      .get('/api/v1/clip')
      .expect('Content-Type', /json/)
      .expect(401)
      .end(function(err, res) {
        should(res.body.msg).equal('Unauthorized');
        done(err);
      });
  });
});

describe('POST /api/v1/clip', function() {
  before(function(done) {
    this.timeout(10000);
    DbUtils.clean(knex).then(function() { done(); });
  });

  it('should create a new clip', function(done) {
    request(server)
      .post('/api/v1/clip')
      .set('Authorization', TestUtils.authToken())
      .send({
        clip: "echo 'foo'",
        team_id: TestUtils.defaultTeam().get('id')
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        should(res.body.clip.clip).equal("echo 'foo'");
        TestUtils.user().clips().fetch().then(function(clips) {
          should(clips).have.length(1);
          should(clips.at(0).get('clip')).equal("echo 'foo'");
          done(err);
        });
      });
  });

  it('should error without a required parameters', function(done) {
    request(server)
      .post('/api/v1/clip')
      .set('Authorization', TestUtils.authToken())
      .send({
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .end(function(err, res) {
        should(res.body).deepEqual([
          { param: 'clip', msg: 'Clip cannot be blank' },
          { param: 'team_id', msg: 'Team cannot be blank' }
        ]);
        done(err);
      });
  });

  it('should require authentication', function(done) {
    request(server)
      .post('/api/v1/clip')
      .expect('Content-Type', /json/)
      .expect(401)
      .end(function(err, res) {
        should(res.body.msg).equal('Unauthorized');
        done(err);
      });
  });
});

