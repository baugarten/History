var uuid = require('node-uuid');
var bookshelf = require('../config/bookshelf');
var User = require('./User');

var Account = bookshelf.model('Account', {
  tableName: 'accounts',
  hasTimestamps: true,

  initialize: function() {
    this.on('creating', function(model, attrs, options) {
      if (!model.get('id')) {
        model.set('id', uuid.v1());
      }
    });
  },

  users: function() {
    return this.belongsToMany('User', 'user_accounts', 'account_id', 'user_id');
  },

  teams: function() {
    return this.hasMany('Team');
  }
});

module.exports = Account;
