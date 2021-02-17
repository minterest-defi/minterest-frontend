import { SET_CURRENT_ACCOUNT } from '../../actions/types';

const initialState = {
	currentAccount: null,
};

export default function substrateReducer(state = initialState, action) {
	switch (action.type) {
		case SET_CURRENT_ACCOUNT:
			return { ...state, currentAccount: action.payload };

		case 'LOAD_KEYRING':
			return { ...state, keyringState: 'LOADING' };

		case 'SET_KEYRING':
			return { ...state, keyring: action.payload, keyringState: 'READY' };

		case 'KEYRING_ERROR':
			return { ...state, keyring: null, keyringState: 'ERROR' };

		default:
			return state;
	}
}
