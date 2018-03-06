import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';
import configureStore from 'util/store';

// Styles
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../scss/style.scss'
// Temp fix for reactstrap
import '../scss/core/_dropdown-menu-right.scss';

// Containers
import App from './App';
import { signup, authenticate } from 'store/auth';

const store = configureStore();

// TEMPORARY DISPATCHES
// store.dispatch(signup({ email: "xraassew232", password: 'ya'}))
//   .then(console.log)
//   .catch(console.log)
// store.dispatch(authenticate({ strategy: 'local', email: "a@a.com", password: 'a' }))
//   .then(console.log)
//   .catch(console.log)

render((
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path="/" name="Home" component={App}/>
      </Switch>
    </HashRouter>
  </Provider>), document.getElementById('root'));
