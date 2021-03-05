import API from '../services';
import {
	GET_BALANCE_ANNOTATION_START,
	GET_BALANCE_ANNOTATION_ERROR,
	GET_BALANCE_ANNOTATION_SUCCESS,
	RESET_BALANCE_ANNOTATION,
} from './types';

export function getBalanceAnnotation(account) {
	return async (dispatch) => {
		try {
			dispatch({ type: GET_BALANCE_ANNOTATION_START });
			const data = await API.query.system.account(account);

			dispatch({
				type: GET_BALANCE_ANNOTATION_SUCCESS,
				payload: data.data.free.toHuman(),
			});
		} catch (err) {
			console.log(err);
			dispatch({ type: GET_BALANCE_ANNOTATION_ERROR });
		}
	};
}

export const resetBalanceAnnotation = () => {
	return {
		type: RESET_BALANCE_ANNOTATION,
	};
};
