import { Action, SubstrateReducerType } from '../../util/types';
import {
	API_STATE_READY,
	API_STATE_INIT,
	API_STATE_CONNECTING,
	API_STATE_ERROR,
} from '../../util/constants';
// TODO const types

const initialState: SubstrateReducerType = {
	apiState: null,
	api: null,
	apiError: null,
};

export default function substrateReducer(
	state = initialState,
	action: Action
): SubstrateReducerType {
	switch (action.type) {
		case 'CONNECT_INIT':
			return { ...state, apiState: API_STATE_INIT };

		case 'CONNECT':
			return { ...state, api: action.payload, apiState: API_STATE_CONNECTING };

		case 'CONNECT_SUCCESS':
			return { ...state, apiState: API_STATE_READY };

		case 'CONNECT_ERROR':
			return { ...state, apiState: API_STATE_ERROR, apiError: action.payload };

		default:
			return state;
	}
}
