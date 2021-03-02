import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './global.css';

import store from './redux';
import App from './App';

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
