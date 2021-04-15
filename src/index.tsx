import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Modal from 'react-modal';
import store from './redux';
import Router from './Router';

import './global.scss';

//Accessibility setup
Modal.setAppElement('#root');

ReactDOM.render(
	<Provider store={store}>
		<Router />
	</Provider>,
	document.getElementById('root')
);
