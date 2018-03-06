import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import configureStore from './store/configure-store';
import SubjectAccessRequestCreateComponent from './component/create-sar/subjectAccessRequestCreate';

import registerServiceWorker from './registerServiceWorker';


const store = configureStore();


ReactDOM.render(
    <Provider store={store}>
      <div>
        <Router history={browserHistory}>
        <Route path='/' component={SubjectAccessRequestCreateComponent}/>
        </Router>
      </div>
    </Provider>,
    document.getElementById('root')
  )


