var exceptions = require('../exceptions');
var Team = require('../models/Team');

/**
 * GET /team
 */
exports.teamGetList = function(req, res) {
  Team
    .query((qb) => {
      qb.rightJoin('accounts', 'teams.account_id', 'accounts.id')
      qb.innerJoin('user_accounts', 'accounts.id', 'user_accounts.account_id')
      qb.where('user_accounts.user_id', '=', req.user.get('id'))
    })
    .fetchAll()
    .then(function(teams) {
      res.status(200).send({ teams: teams.toJSON() });
    })
    .catch(function(err) {
      console.error("ERR!", err);
      res.send(500);
    });
};

/**
 * POST /team
 */
exports.teamCreate = function(req, res) {
  req.assert('account_id', 'Account ID cannot be blank').notEmpty();
  req.assert('account_id', 'Account ID must be a UUID').isUUID();
  req.assert('team_name', 'Team name cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  new Team({
    account_id: req.body.account_id,
    display_name: req.body.team_name
  }).save()
    .then(function(team) {
      res.status(200).send({ team: team.toJSON(), msg: `${req.body.team_name} created successfully.` });
    })
    .catch(exceptions.renderError(res))
    .catch((err) => {
      console.error("ERR!", err);
      res.sendStatus(500);
    });
};

