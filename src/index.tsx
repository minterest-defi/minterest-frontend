import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Modal from 'react-modal';

import './global.css';

import store from './redux';
import App from './App';

//Accessibility setup
Modal.setAppElement('#root');

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
