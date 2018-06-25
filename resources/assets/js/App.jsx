require('./vendor/Adds');
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
//import fetchival from 'fetchival';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
//import ReduxPromise from 'redux-promise';
import reducers from './reducers';

import AppRoutes from './routes';

import thunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<Router>
			<AppRoutes />
		</Router>
	</Provider>
	, 
	document.getElementById('app')
);