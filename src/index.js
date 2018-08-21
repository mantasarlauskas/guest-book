import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/containers/MainContainer';
import { Router, Route, browserHistory  } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import { getData } from './actions';
import logger from 'redux-logger';

const store = createStore(rootReducer, applyMiddleware(thunk, logger));
store.dispatch(getData(10));

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Main} />
        </Router>
    </Provider>, 
    document.getElementById('root')
);
