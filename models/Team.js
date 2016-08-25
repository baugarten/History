import { DuplicateEntry } from '../exceptions';
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
    this.on('saving', (model, attrs, options) => {
      if (model.hasChanged('short_name') && !!model.get('account_id')) {
        return model.account()
          .fetch({ withRelated: 'teams' })
          .then((account) => {
            if (!account) {
              return Promise.resolve();
            }

            let dupeTeam = account.related('teams').find((team) => {
              return team.get('id') !== model.get('id') && team.get('short_name') === model.get('short_name')
            })
            if (dupeTeam) {
              return Promise.reject(DuplicateEntry('Duplicate short name for team.'));
            }
            return Promise.resolve();
          });
      } else {
        return Promise.resolve();
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
