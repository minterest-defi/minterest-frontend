import {
	BORROW_REQUEST_START,
	BORROW_REQUEST_ERROR,
	BORROW_REQUEST_SUCCESS,
} from '../../actions/types';

const initialState = {
	isBorrowResponseRunning: false,
	borrowResponse: null,
};

export default function adminReducer(state = initialState, action) {
	switch (action.type) {
		case BORROW_REQUEST_START: {
			return {
				...state,
				isBorrowResponseRunning: true,
				borrowResponse: null,
			};
		}
		case BORROW_REQUEST_SUCCESS: {
			return {
				...state,
				isBorrowResponseRunning: false,
				borrowResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case BORROW_REQUEST_ERROR: {
			return {
				...state,
				isBorrowResponseRunning: false,
				borrowResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}

		default:
			return state;
	}
}
