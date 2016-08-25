var Account = require('../models/Clip');

/**
 * GET /account
 */
exports.accountGet = function(req, res) {
  req.checkParams('id', 'Account id must be a UUID').isUUID();

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  let account = req.user.related('accounts').find((account) => {
    return account.get('id') === req.params.id;
  });

  if (account) {
    return account.fetch({withRelated: ['teams', 'users']}).then((account) => {
      res.send({ account: account.toJSON() });
    });
  } else {
    res.send(404);
  }
};
