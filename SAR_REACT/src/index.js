import React from 'react';
import ReactDOM from 'react-dom';
import PageRoute from './routes/routes';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configure-store';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

const store = configureStore();
const initialState = {};

ReactDOM.render(
    <Provider store={store}>
        <PageRoute />
    </Provider>, document.getElementById('root'));
registerServiceWorker();