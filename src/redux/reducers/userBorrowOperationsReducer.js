import {
	BORROW_REQUEST_START,
	BORROW_REQUEST_ERROR,
	BORROW_REQUEST_SUCCESS,
} from '../../actions/types';

const initialState = {
	isBorrowResponseRunning: false,
	borrowResponse: {},
};

export default function adminReducer(state = initialState, action) {
	switch (action.type) {
		case BORROW_REQUEST_START: {
			return {
				...state,
				isBorrowResponseRunning: false,
				borrowResponse: {},
			};
		}
		case BORROW_REQUEST_SUCCESS: {
			return {
				...state,
				isBorrowResponseRunning: false,
				borrowResponse: {},
			};
		}
		case BORROW_REQUEST_ERROR: {
			return {
				...state,
				isBorrowResponseRunning: false,
				borrowResponse: {},
			};
		}

		default:
			return state;
	}
}
