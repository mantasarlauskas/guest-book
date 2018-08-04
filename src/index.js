import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import Login from './components/Login';
import './index.css';
import { Router, Route, browserHistory  } from 'react-router';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Main} />
        <Route path="/login" component={Login} />
    </Router>, 
    document.getElementById('root')
);
registerServiceWorker();


/*import { Router, Route, hashHistory } from 'react-router';
ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App} />
        <Route path="list-days" component={App}>
            <Route path=":filter" component={App} />>
        </Route>
        <Route path="add-day" component={App} />
        <Route path="*" component={Whoops404} />
    </Router>, document.getElementById('root'));
registerServiceWorker();*/
