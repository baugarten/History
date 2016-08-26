var jwt = require('jsonwebtoken');
var config = require('../../knexfile');
var knex = require('knex')(config);
var request = require('supertest');
var should = require('should');
var server = require('../../server');
var knexCleaner = require('knex-cleaner');
var User = require('../../models/User');
var DbUtils = require('./db.utils')
var TestUtils = require('./utils');

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
        team_display_name: 'Test Signup Team!',
        name: 'Ben',
        email: 'baugarten@gmail.com',
        password: 'password'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        should(res.body.token).be.a.token();
        const team = res.body.user.teams[0];
        should(team.short_name).equal('test-signup-team-');
        should(team.display_name).equal('Test Signup Team!');
        const account = res.body.user.accounts[0];
        should(account.name).equal('Clips inc');

        var user = new User({
          id: res.body.user.id
        });
        user.fetch()
          .then(function(user) {
            return Promise.all([
              user.accounts().fetch(),
              user.accountTeams().fetchAll(),
            ]).then(([accounts, teams]) => {
              should(accounts).have.length(1);
              should(accounts.at(0).get('name')).equal('Clips inc');
              should(accounts.at(0).pivot.get('is_admin')).equal(true);
              should(teams).have.length(1);
              should(teams.at(0).get('display_name')).equal('Test Signup Team!');
              should(teams.at(0).get('short_name')).equal('test-signup-team-');
              should(teams.at(0).get('account_id')).equal(accounts.at(0).get('id'));
              //should(teams.at(0).pivot.get('is_admin')).equal(true);
              return teams.at(0).account().fetch();
            }).then((account) => {
              should(account).be.defined;
              should(account.get('name')).equal('Clips inc');
              done(err);
            });
          });

      });
  });

  it('should login as user', function(done) {
    request(server)
      .post('/login')
      .send({
        email: TestUtils.user().get('email'),
        password: TestUtils.unhashedPassword()
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        should(res.body.token).be.a.token();
        should(res.body.user.id).equal(TestUtils.user().get('id'));
        should(res.body.user.name).equal(TestUtils.user().get('name'));
        const account = res.body.user.accounts[0];
        should(account.id).equal(TestUtils.defaultAccount().get('id'));
        should(account.name).equal(TestUtils.defaultAccount().get('name'));
        const team = account.teams[0];
        should(team.id).equal(TestUtils.defaultTeam().get('id'));
        should(team.short_name).equal(TestUtils.defaultTeam().get('short_name'));
        should(team.display_name).equal(TestUtils.defaultTeam().get('display_name'));
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
