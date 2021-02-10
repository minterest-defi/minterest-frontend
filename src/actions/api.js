import { ApiPromise, WsProvider } from '@polkadot/api';
import jsonrpc from '@polkadot/types/interfaces/jsonrpc';
import queryString from 'query-string';
// import {} from '../services';
// import {} from './types';
import config from '../config';

const parsedQuery = queryString.parse(window.location.search);
const connectedSocket = parsedQuery.rpc || config.PROVIDER_SOCKET;
console.log(`Connected socket: ${connectedSocket}`);

export function initializeAPI() {
	return (dispatch) => {
		dispatch({ type: 'CONNECT_INIT' });

		const provider = new WsProvider(connectedSocket);
		const _api = new ApiPromise({
			provider,
			types: config.CUSTOM_TYPES,
			rpc: { ...jsonrpc, ...config.RPC },
		});

		// Set listeners for disconnection and reconnection event.
		_api.on('connected', () => {
			dispatch({ type: 'CONNECT', payload: _api });
			// `ready` event is not emitted upon reconnection and is checked explicitly here.
			_api.isReady.then((_api) => dispatch({ type: 'CONNECT_SUCCESS' }));
		});
		_api.on('ready', () => dispatch({ type: 'CONNECT_SUCCESS' }));
		_api.on('error', (err) =>
			dispatch({ type: 'CONNECT_ERROR', payload: err })
		);
	};
}
