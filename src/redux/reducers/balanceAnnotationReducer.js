import {
	GET_BALANCE_ANNOTATION_START,
	GET_BALANCE_ANNOTATION_ERROR,
	GET_BALANCE_ANNOTATION_SUCCESS,
	RESET_BALANCE_ANNOTATION,
} from '../../actions/types';

const initialState = {
	balanceAnnotation: null,
};

export default function balanceAnnotationReducer(state = initialState, action) {
	switch (action.type) {
		case GET_BALANCE_ANNOTATION_START: {
			return state;
		}

		case GET_BALANCE_ANNOTATION_SUCCESS: {
			return {
				...state,
				balanceAnnotation: action.payload,
			};
		}

		case GET_BALANCE_ANNOTATION_ERROR: {
			return state;
		}

		case RESET_BALANCE_ANNOTATION: {
			return {
				...initialState,
			};
		}

		default:
			return state;
	}
}
