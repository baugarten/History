var uuid = require('node-uuid');
var bookshelf = require('../config/bookshelf');
var User = require('./User');

var Team = bookshelf.model('Team', {
  tableName: 'teams',
  hasTimestamps: true,

  initialize: function() {
    this.on('creating', function(model, attrs, options) {
      if (!model.get('id')) {
        model.set('id', uuid.v1());
      }
      if (!model.get('short_name')) {
        model.set('short_name', model.get('display_name').replace(/\W+/g, '-').toLowerCase());
      }
    });
  },

  members: function() {
    return this.belongsToMany('User');
  },

  account: function() {
    return this.belongsTo('Account');
  }
});

module.exports = Team;
