// import {} from '../../actions/types';
import { API_STATE_READY } from '../../util/constants';

const initialState = {};

export default function substrateReducer(state = initialState, action) {
	switch (action.type) {
		case 'CONNECT_INIT':
			return { ...state, apiState: 'CONNECT_INIT' };

		case 'CONNECT':
			return { ...state, api: action.payload, apiState: 'CONNECTING' };

		case 'CONNECT_SUCCESS':
			return { ...state, apiState: API_STATE_READY };

		case 'CONNECT_ERROR':
			return { ...state, apiState: 'ERROR', apiError: action.payload };

		default:
			return state;
	}
}
