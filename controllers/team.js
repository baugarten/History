var Team = require('../models/Team');

/**
 * GET /team
 */
exports.teamGetList = function(req, res) {
  req.user.teams()
    .fetch()
    .then(function(teams) {
      res.status(200).send({ teams: teams.toJSON() });
    })
    .catch(function(err) {
      console.error("ERR!", err);
      res.send(500);
    });
};

