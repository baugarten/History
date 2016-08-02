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
    });
  },

  members: function() {
    return this.belongsToMany('User');
  },

});

module.exports = Team;
