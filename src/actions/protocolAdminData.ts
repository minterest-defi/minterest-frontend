import { Dispatch } from '../util/types';
import {
	GET_ADMIN_CONTROLLER_DATA_START,
	GET_ADMIN_CONTROLLER_DATA_ERROR,
	GET_ADMIN_CONTROLLER_DATA_SUCCESS,
	GET_WHITELIST_MODE_START,
	GET_WHITELIST_MODE_ERROR,
	GET_WHITELIST_MODE_SUCCESS,
	GET_PAUSE_KEEPERS_START,
	GET_PAUSE_KEEPERS_SUCCESS,
	GET_PAUSE_KEEPERS_ERROR,
	GET_MINTEREST_MODEL_DATA_START,
	GET_MINTEREST_MODEL_DATA_SUCCESS,
	GET_MINTEREST_MODEL_DATA_ERROR,
	GET_LOCKED_PRICES_START,
	GET_LOCKED_PRICES_ERROR,
	GET_LOCKED_PRICES_SUCCESS,
} from './types';
import API from '../services';
import { UNDERLYING_ASSETS_TYPES } from '../util/constants';

export const getControllerData = () => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: GET_ADMIN_CONTROLLER_DATA_START });

			const dataArray = await Promise.all(
				UNDERLYING_ASSETS_TYPES.map((asset) =>
					API.query.controller.controllerDates(asset)
				)
			);

			const initRates = UNDERLYING_ASSETS_TYPES.reduce(
				(old: any, item, index) => {
					old[item] = dataArray[index];
					return old;
				},
				{}
			);

			dispatch({
				type: GET_ADMIN_CONTROLLER_DATA_SUCCESS,
				payload: initRates,
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: GET_ADMIN_CONTROLLER_DATA_ERROR,
			});
		}
	};
};

export const getWhitelistMode = () => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: GET_WHITELIST_MODE_START });

			const mode = await API.query.controller.whitelistMode();

			dispatch({
				type: GET_WHITELIST_MODE_SUCCESS,
				payload: mode.toString(),
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: GET_WHITELIST_MODE_ERROR,
			});
		}
	};
};

export const getPauseKeepers = () => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: GET_PAUSE_KEEPERS_START });

			const dataArray = await Promise.all(
				UNDERLYING_ASSETS_TYPES.map((asset) =>
					API.query.controller.pauseKeepers(asset)
				)
			);

			const initFlag = UNDERLYING_ASSETS_TYPES.reduce(
				(old: any, item, index) => {
					old[item] = dataArray[index];
					return old;
				},
				{}
			);

			dispatch({
				type: GET_PAUSE_KEEPERS_SUCCESS,
				payload: initFlag,
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: GET_PAUSE_KEEPERS_ERROR,
			});
		}
	};
};

export const getMinterestModel = () => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: GET_MINTEREST_MODEL_DATA_START });

			const dataArray = await Promise.all(
				UNDERLYING_ASSETS_TYPES.map((asset) =>
					API.query.minterestModel.minterestModelDates(asset)
				)
			);

			const initRates = UNDERLYING_ASSETS_TYPES.reduce(
				(old: any, item, index) => {
					old[item] = dataArray[index];
					return old;
				},
				{}
			);

			dispatch({
				type: GET_MINTEREST_MODEL_DATA_SUCCESS,
				payload: initRates,
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: GET_MINTEREST_MODEL_DATA_ERROR,
			});
		}
	};
};

export const getLockedPrices = () => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: GET_LOCKED_PRICES_START });

			const dataArray = await Promise.all(
				UNDERLYING_ASSETS_TYPES.map((currencyId) =>
					API.query.prices.lockedPrice(currencyId)
				)
			);

			const prices = UNDERLYING_ASSETS_TYPES.reduce((old: any, item, index) => {
				old[item] = dataArray[index];
				return old;
			}, {});

			dispatch({
				type: GET_LOCKED_PRICES_SUCCESS,
				payload: prices,
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: GET_LOCKED_PRICES_ERROR,
			});
		}
	};
};