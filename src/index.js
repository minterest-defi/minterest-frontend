import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { SubstrateContextProvider } from './substrate-lib';

ReactDOM.render(
	<SubstrateContextProvider>
		<App />
	</SubstrateContextProvider>,
	document.getElementById('root')
);
