var Clip = require('../models/Clip');

/**
 * GET /clip
 */
exports.clipGetList = function(req, res) {
  req.user.clips()
    .fetch()
    .then(function(clips) {
      res.status(200).send({ clips: clips.toJSON() });
    })
    .catch(function(err) {
      console.log("ERR!", err);
      res.send(500);
    });
};

/**
 * POST /contact
 */
exports.clipPost = function(req, res) {
  req.assert('clip', 'Clip cannot be blank').notEmpty();
  req.assert('team_id', 'Team cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  req.user.clips()
    .create({
      clip: req.body.clip,
      team_id: req.body.team_id
    })
    .then(function(clip) {
      res.send({ clip: clip.toJSON() });
    })
    .catch(function(err) {
      console.error("Error saving clip", err);
      res.status(500).send({ msg: 'Internal Error' });
    });
};
