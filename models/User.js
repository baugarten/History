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

  teams: function() {
    return this.belongsToMany('Team');
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
        return 'https://gravatar.com/avatar/?s=200&d=retro';
      }
      var md5 = crypto.createHash('md5').update(this.get('email')).digest('hex');
      return 'https://gravatar.com/avatar/' + md5 + '?s=200&d=retro';
    }
  }
}, {
  registerWithAccount: function(accountName, name, email, password) {
    var user = new User({
      name: name,
      email: email,
      password: password
    });
    var account = new Account({
      name: accountName
    });

    return Promise.all([
      account.save(),
      user.save()
    ]).then(function(models) {
      return models[0].users().attach(models[1]);
    }).then(function(users) {
      return {
        'account': account, 
        'user': user
      };
    })
  }
});

module.exports = User;
