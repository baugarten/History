var uuid = require('node-uuid');
var crypto = require('crypto');
var bookshelf = require('../config/bookshelf');
var User = require('./User');

var Clip = bookshelf.model('Clip', {
  tableName: 'clips',
  hasTimestamps: true,

  initialize: function() {
    this.on('creating', function(model, attrs, options) {
      if (!model.get('id')) {
        model.set('id', uuid.v1());
      }
      model.set('uuid', crypto.randomBytes(20).toString('hex'));
    });
  },

  creator: function() {
    return this.belongsTo('User', 'creator_id');
  },

});

module.exports = Clip;
