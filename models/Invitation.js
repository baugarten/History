const uuid = require('node-uuid');
const crypto = require('crypto');
const bookshelf = require('../config/bookshelf');
const User = require('./User');

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'Mailgun',
  auth: {
    user: process.env.MAILGUN_USERNAME,
    pass: process.env.MAILGUN_PASSWORD
  }
});

const Invitation = bookshelf.model('Invitation', {
  tableName: 'invitations',
  idAttribute: 'code',

  initialize: function() {
    this.on('creating', function(model, attrs, options) {
      model.set('code', crypto.randomBytes(48).toString('hex'));
      const fromUser = model.get('from_user');
      model.unset('from_user');
      const toAccount = model.get('to_account');
      model.unset('to_account');

      var mailOptions = {
        from: 'Hist <gethist@gmail.com>',
        to: model.get('to_email'),
        subject: 'Invitation to Hist',
        text: `You are invited by ${fromUser.get('name')} to join ${toAccount.get('name')}!\n\n${this.invitationUrl()}`
      };

      return transporter.sendMail(mailOptions);
    });
  },

  fromUser: function() {
    return this.belongsTo('User', 'from_user_id');
  },

  account: function() {
    return this.belongsTo('Account', 'to_account_id');
  },

  invitationUrl: function() {
    return `http://${process.env.HOST_PORT}/signup/invite/${this.get('code')}`;
  }
});

module.exports = Invitation;

