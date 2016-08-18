var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'Mailgun',
  auth: {
    user: process.env.MAILGUN_USERNAME,
    pass: process.env.MAILGUN_PASSWORD
  }
});

/**
 * POST /subscribe
 */
exports.subscribePost = function(req, res) {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('email', 'Email cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  var mailOptions = {
    from: '<'+ req.body.email + '>',
    to: 'baugarten@gmail.com',
    subject: '✔ Subscribe Form',
    text: 'new subscription!' 
  };

  transporter.sendMail(mailOptions, function(err) {
    res.send({ msg: "Thank you! We'll notify you when access is available." });
  });
};
