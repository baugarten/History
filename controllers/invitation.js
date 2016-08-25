import { generateToken } from './user';
var moment = require('moment');
const bookshelf = require('../config/bookshelf');
var Invitation = require('../models/Invitation');

exports.sendInvitation = function(req, res) {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('email', 'Email cannot be blank').notEmpty();
  req.assert('account_id', 'Account id cannot be blank').notEmpty();
  req.assert('account_id', 'Account id must be a UUID').isUUID();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  const account = req.user.related('accounts').find((account) => {
    return account.get('id') === req.body.account_id
  });

  if (!account) {
    return res.status(404).send({msg: 'Account not found' });
  }

  new Invitation({
    from_user_id: req.user.get('id'),
    from_user: req.user,
    to_account_id: req.body.account_id,
    to_account: account,
    to_email: req.body.email,
    expires_at: moment().add(3, 'days').utc() // three days in future
  }).save()
    .then((invitation) => {
      res.status(200).send({msg: `Invitation to ${req.body.email} sent.`})
    })
    .catch(function(err) {
      console.error('Error sending invitation', err);
      return res.status(500).send({ msg: 'Error when sending invitation.' });
    });
};

exports.getInvitation = function(req, res) {
  req.assert('code', 'Invitation code cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  new Invitation({
    code: req.params.code
  }).fetch({ withRelated: 'account' })
    .then((invitation) => {
      res.status(200).send({ invitation: invitation.toJSON() });
    })
    .catch((err) => {
      console.error('Error fetching invitation', err);
      res.status(500).send({msg: 'Error when fetching invitation' })
    });
};

exports.signupWithInvitation = function(req, res) {
  req.assert('code', 'Invitation code cannot be blank').notEmpty();
  req.assert('name', 'Name cannot be blank').notEmpty();
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('email', 'Email cannot be blank').notEmpty();
  req.assert('password', 'Password must be at least 4 characters long').len(4);
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  bookshelf.transaction((t) => {
    return new Invitation({
      code: req.params.code,
    }).fetch({ withRelated: 'account' }, { transacting: t })
      .then((invitation) => {
        if (!invitation) {
          return res.status(404).send({msg: 'Invitation not found. Please ask your account administrator to resend the invitation link' });
        } else if (!!invitation.get('claimed_at')) {
          return res.status(400).send({msg: 'Invitation already claimed. Please ask your account administrator to resend the invitation link' });
        }

        let account = invitation.related('account');
        return Promise.all([
          account.users().create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password 
          }, { transacting: t }), 
          Promise.resolve(account),
          invitation.save({ 
            claimed_at: moment().utc() 
          }, {
            patch: true,
            transacting: t,
            method: 'update'
          })
        ]).then(([user, account]) => {
          let token = generateToken(user)
          let userJson = user.toJSON();
          userJson.accounts = [account.toJSON()];
          res.status(200).send({ token: token, user: userJson });
        })
        .catch((err) => {
          if (err.code === 'ER_DUP_ENTRY' || err.code === '23505') {
            return res.status(400).send({ msg: 'The email address you have entered is already associated with another account.' });
          }
          console.error('Error fetching invitation', err);
          res.status(500).send({msg: 'Error when fetching invitation' })
        });
      });
  });
};
