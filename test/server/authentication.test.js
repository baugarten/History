var jwt = require('jsonwebtoken');
var config = require('../../knexfile');
var knex = require('knex')(config);
var request = require('supertest');
var should = require('should');
var server = require('../../server');
var knexCleaner = require('knex-cleaner');
var User = require('../../models/User');
var DbUtils = require('./db.utils')

should.Assertion.add('token', function() {
  this.params = { operator: 'to be asset' };
  
  should(jwt.verify(this.obj, process.env.TOKEN_SECRET)).be.true;
});

describe('POST /signup', function() {
  before(function(done) {
    this.timeout(10000);
    DbUtils.clean(knex).then(function() { done(); });
  });

  it('should save user', function(done) {
    request(server)
      .post('/signup')
      .send({
        account_name: 'Clips inc',
        name: 'Ben',
        email: 'baugarten@gmail.com',
        password: 'password'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        should(res.body.token).be.a.token();
        var user = new User({
          id: res.body.user.id
        });
        user.fetch()
          .then(function(user) {
            user.accounts()
              .fetch()
              .then(function(accounts) {
                should(accounts).have.length(1);
                should(accounts.at(0).get('name')).equal('Clips inc');
                done(err);
              });
          });

      });
  });

  it('should login as user', function(done) {
    request(server)
      .post('/login')
      .send({
        email: 'baugarten@gmail.com',
        password: 'password'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        should(res.body.token).be.a.token();
        should(res.body.user.name).equal('Ben');
        done(err);
      });
  });

  it('should fail with invalid credentials', function(done) {
    request(server)
      .post('/login')
      .send({
        email: 'baugarten@gmail.com',
        password: 'notapassword'
      })
      .expect('Content-Type', /json/)
      .expect(401)
      .end(function(err, res) {
        should(res.body.msg).equal('Invalid email or password');
        done(err);
      });
  });
});

describe('GET /contact', function() {
  it('should render ok', function(done) {
    request(server)
      .get('/contact')
      .expect(200, done);
  });
});
