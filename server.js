var express = require('express');
var path = require('path');
var logger = require('morgan');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var dotenv = require('dotenv');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var Provider = require('react-redux').Provider;
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var sass = require('node-sass-middleware');
var webpack = require('webpack');
var config = require('./webpack.config');
var _ = require('lodash');

// Load environment variables from .env file
dotenv.load();

// ES6 Transpiler
require('babel-core/register');
require('babel-polyfill');

// Models
var User = require('./models/User');

// Controllers
var userController = require('./controllers/user');
var contactController = require('./controllers/contact');
var clipController = require('./controllers/clip');
var subscribeController = require('./controllers/subscribe');
var teamController = require('./controllers/team');
var accountController = require('./controllers/account');
var invitationController = require('./controllers/invitation');

var app = express();

var compiler = webpack(config);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(sass({ src: path.join(__dirname, 'public'), dest: path.join(__dirname, 'public') }));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());

app.use(function(req, res, next) {
  req.isAuthenticated = function() {
    var token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token;
    try {
      return jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (err) {
      return false;
    }
  };

  if (req.isAuthenticated()) {
    var payload = req.isAuthenticated();
    new User({ id: payload.sub })
      .fetch({withRelated: ['accounts', 'teams']})
      .then(function(user) {
        req.user = user;
        if (!req.user) {
          req.isAuthenticated = function() {
            return false;
          }
        }
        next();
      });
  } else {
    next();
  }
});

if (app.get('env') === 'development') {
  console.log('Using HMR in development');
  app.use(require('webpack-dev-middleware')(compiler, {
    stats: { colors: true },
    publicPath: config.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler, { log: console.log }));
} else {
  console.log(`HMR disabled in ${app.get('env')}`);
}

app.use(express.static(path.join(__dirname, 'public')));

app.post('/contact', contactController.contactPost);
app.post('/subscribe', subscribeController.subscribePost);
app.put('/account', userController.ensureAuthenticated, userController.accountPut);
app.delete('/account', userController.ensureAuthenticated, userController.accountDelete);
app.post('/signup', userController.signupPost);
app.post('/login', userController.loginPost);
app.post('/forgot', userController.forgotPost);
app.post('/reset/:token', userController.resetPost);
app.get('/unlink/:provider', userController.ensureAuthenticated, userController.unlink);
app.post('/auth/google', userController.authGoogle);
app.get('/auth/google/callback', userController.authGoogleCallback);
app.post('/auth/github', userController.authGithub);
app.get('/auth/github/callback', userController.authGithubCallback);
app.get('/api/v1/clip', userController.ensureAuthenticated, clipController.clipGetList);
app.post('/api/v1/clip', userController.ensureAuthenticated, clipController.clipPost);
app.get('/api/v1/clip/:id', userController.ensureAuthenticated, clipController.clipGet);
app.get('/api/v1/team', userController.ensureAuthenticated, teamController.teamGetList);
app.post('/api/v1/team', userController.ensureAuthenticated, teamController.teamCreate);
app.get('/api/v1/account/:id', userController.ensureAuthenticated, accountController.accountGet);
app.post('/api/v1/invitation', userController.ensureAuthenticated, invitationController.sendInvitation);
app.get('/api/v1/invitation/:code', invitationController.getInvitation);
app.post('/api/v1/invitation/:code/signup', invitationController.signupWithInvitation);

// React server rendering
if (process.env.CLIENT_ENV !== 'test') {
  var routes = require('./app/routes');
  var configureStore = require('./app/store/configureStore').default;
  app.use(function(req, res) {
    var initialState = {
      auth: { token: req.cookies.token, user: req.user && req.user.toJSON() },
      messages: {}
    };

    var store = configureStore(initialState);

    let builtRoutes = routes.default(store);
    Router.match({ routes: builtRoutes, location: req.url }, function(err, redirectLocation, renderProps) {
      if (err) {
        res.status(500).send(err.message);
      } else if (redirectLocation) {
        res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps && _.findIndex(renderProps.routes, function(route) { return route.path === "*" }) === -1) {
        var html = ReactDOM.renderToString(React.createElement(Provider, { store: store },
          React.createElement(Router.RouterContext, renderProps)
        ));
        res.render('layout', {
          html: html,
          initialState: store.getState()
        });
      } else {
        res.sendStatus(404);
      }
    });
  });
}

if (app.get('env') === 'test') {
  console.log('Using error reporting in test env');
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    next(err);
  });
}

// Production error handler
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    res.sendStatus(err.status || 500);
  });
}

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
