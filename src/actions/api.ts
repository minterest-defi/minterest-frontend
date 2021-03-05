import API from '../services';
import { Dispatch } from '../util/types';
// import {} from './types';
// TODO refactoring
export function initializeAPI() {
	return (dispatch: Dispatch) => {
		dispatch({ type: 'CONNECT_INIT' });
		API.isReady.then((API) => {
			dispatch({ type: 'CONNECT', payload: API });
			dispatch({ type: 'CONNECT_SUCCESS' });
		});
		// Set listeners for disconnection and reconnection event.
		API.on('connected', () => {
			dispatch({ type: 'CONNECT', payload: API });
			// `ready` event is not emitted upon reconnection and is checked explicitly here.
			API.isReady.then(() => dispatch({ type: 'CONNECT_SUCCESS' }));
		});
		API.on('ready', () => dispatch({ type: 'CONNECT_SUCCESS' }));
		API.on('error', (err) => dispatch({ type: 'CONNECT_ERROR', payload: err }));
	};
}
