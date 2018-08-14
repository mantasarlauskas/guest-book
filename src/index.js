import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import Login from './components/Login';
import './index.css';
import { Router, Route, browserHistory  } from 'react-router';
import registerServiceWorker from './registerServiceWorker';

const requireAuth = (nextState, replace) => !sessionStorage.getItem('userLoggedIn') ? true : replace('/');

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Main} />
        <Route path="/login" component={Login} onEnter={requireAuth} />
    </Router>, 
    document.getElementById('root')
);
registerServiceWorker();
