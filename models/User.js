var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var uuid = require('node-uuid');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var bookshelf = require('../config/bookshelf');
var Account = require('./Account');
var Team = require('./Team');
var Clip = require('./Clip');

var User = bookshelf.model('User', {
  tableName: 'users',
  hasTimestamps: true,

  initialize: function() {
    this.on('creating', function(model, attrs, options) {
      if (!model.get('id')) {
        model.set('id', uuid.v1());
      }
    });
    this.on('saving', this.hashPassword, this);
  },

  accounts: function() {
    return this.belongsToMany('Account', 'user_accounts', 'user_id', 'account_id').withPivot('is_admin');
  },

  accountTeams: function() {
    let query = Team.query((qb) => {
      qb.rightJoin('accounts', 'teams.account_id', 'accounts.id')
      qb.innerJoin('user_accounts', 'accounts.id', 'user_accounts.account_id')
      qb.where('user_accounts.user_id', '=', this.get('id'))
    })
    return query;
  },

  adminTeams: function() {
    return this.belongsToMany('Team', 'user_teams', 'user_id', 'team_id').withPivot('is_admin');
  },

  teams: function() {
    throw new Error("Don't call teams")
  },

  clips: function() {
    return this.hasMany('Clip', 'creator_id');
  },

  hashPassword: function(model, attrs, options) {
    var password = options.patch ? attrs.password : model.get('password');
    if (!password) { return; }
    return new Promise(function(resolve, reject) {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, null, function(err, hash) {
          if (options.patch) {
            attrs.password = hash;
          }
          model.set('password', hash);
          resolve();
        });
      });
    });
  },

  comparePassword: function(password, done) {
    var model = this;
    bcrypt.compare(password, model.get('password'), function(err, isMatch) {
      done(err, isMatch);
    });
  },

  hidden: ['password', 'passwordResetToken', 'passwordResetExpires'],

  generateToken: function() {
    var payload = {
      iss: 'my.domain.com',
      sub: this.get('id'),
      iat: moment().unix(),
      exp: moment().add(7, 'days').unix()
    };
    return jwt.sign(payload, process.env.TOKEN_SECRET);
  },

  virtuals: {
    gravatar: function() {
      if (!this.get('email')) {
        return 'https://gravatar.com/avatar/?d=retro';
      }
      var md5 = crypto.createHash('md5').update(this.get('email')).digest('hex');
      return 'https://gravatar.com/avatar/' + md5 + '?d=retro';
    }
  }
}, {
  registerWithAccountAndTeam: function(accountName, teamName, name, email, password) {
    return bookshelf.transaction(function(t) {
      var user = new User({
        name: name,
        email: email,
        password: password
      });
      var account = new Account({
        name: accountName
      });
      var team = new Team({
        display_name: teamName,
      });

      return Promise.all([
        account.save(null, { transacting: t }),
        user.save(null, { transacting: t }),
        team.save(null, { transacting: t })
      ]).then(([account, user, team]) => {
        return Promise.all([
          account.users().attach({
            user_id: user.get('id'),
            account_id: account.get('id'),
            is_admin: true
          }, { 
            transacting: t 
          }),
          //user.teams().attach({
          //  user_id: user.get('id'),
          //  team_id: team.get('id'),
          //  //is_admin: true
          //}, {
          //  transacting: t
          //}),
          team.save({ 
            account_id: account.get('id') 
          }, { 
            patch: true, 
            method: 'update',
            transacting: t
          })
        ]);
      }).then(function() {
        return {
          'account': account, 
          'user': user,
          'team': team
        };
      })
    });
  }
});

module.exports = User;
