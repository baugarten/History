import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './components/App';
import Hero from './components/Hero';
import Home from './components/Home';
import Contact from './components/Contact';
import Pricing from './components/Pricing';
import NotFound from './components/NotFound';
import Account from './components/Account';
import Login from './components/Account/Login';
import InvitationSignup from './components/Account/InvitationSignup';
import Signup from './components/Account/Signup';
import Profile from './components/Account/Profile';
import Forgot from './components/Account/Forgot';
import Reset from './components/Account/Reset';

export default function getRoutes(store) {
  const ensureAuthenticated = (nextState, replace) => {
    if (!store.getState().auth.token) {
      replace('/login');
    }
  };
  const skipIfAuthenticated = (nextState, replace) => {
    console.log('Is authenticated?', store.getState().auth);
    if (store.getState().auth.token) {
      replace('/');
    }
  };
  const clearMessages = () => {
    store.dispatch({
      type: 'CLEAR_MESSAGES'
    });
  };
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Hero} onLeave={clearMessages}/>
      <Route path="/contact" component={Contact} onLeave={clearMessages}/>
      <Route path="/pricing" component={Pricing} onLeave={clearMessages}/>
      <Route path="/login" component={Login} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
      <Route path="/signup" component={Signup} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
      <Route path="/signup/invite/:code" component={InvitationSignup} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
      <Route path="/account" component={Profile} onEnter={ensureAuthenticated} onLeave={clearMessages}/>
      <Route path="/accounts/:id" component={Account} onEnter={ensureAuthenticated} onLeave={clearMessages}/>
      <Route path="/forgot" component={Forgot} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
      <Route path='/reset/:token' component={Reset} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
      <Route path="*" component={NotFound} onLeave={clearMessages}/>
    </Route>
  );
}
