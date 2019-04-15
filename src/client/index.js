import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './sass/index.scss';

import store from '../shared/store';

ReactDOM.hydrate(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>	
	</Provider>, 
	document.getElementById('root')
);