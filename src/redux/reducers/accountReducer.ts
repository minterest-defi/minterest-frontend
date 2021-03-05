import {
	SET_CURRENT_ACCOUNT,
	CHECK_IS_ADMIN_SUCCESS,
	CHECK_IS_ADMIN_START,
	CHECK_IS_ADMIN_ERROR,
} from '../../actions/types';

const initialState = {
	currentAccount: null,
	isAdmin: false,
	isAdminRequestRunning: false,
};

export default function substrateReducer(state = initialState, action) {
	switch (action.type) {
		case SET_CURRENT_ACCOUNT:
			return {
				...state,
				currentAccount: action.payload,
				isAdmin: false,
			};

		case CHECK_IS_ADMIN_START:
			return {
				...state,
				isAdminRequestRunning: true,
			};
		case CHECK_IS_ADMIN_SUCCESS:
			return {
				...state,
				isAdmin: action.payload,
				isAdminRequestRunning: false,
			};
		case CHECK_IS_ADMIN_ERROR:
			return {
				...state,
				isAdmin: false,
				isAdminRequestRunning: false,
			};

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
