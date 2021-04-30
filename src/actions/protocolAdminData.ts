import { Dispatch, GetState } from '../util/types';
import {
	GET_WHITELIST_MODE_START,
	GET_WHITELIST_MODE_ERROR,
	GET_WHITELIST_MODE_SUCCESS,
	GET_CONTROLLER_PARAMS_START,
	GET_CONTROLLER_PARAMS_ERROR,
	GET_CONTROLLER_PARAMS_SUCCESS,
	GET_MINTEREST_MODEL_PARAMS_START,
	GET_MINTEREST_MODEL_PARAMS_SUCCESS,
	GET_MINTEREST_MODEL_PARAMS_ERROR,
	GET_PAUSE_KEEPERS_START,
	GET_PAUSE_KEEPERS_SUCCESS,
	GET_PAUSE_KEEPERS_ERROR,
	GET_MNT_SPEED_START,
	GET_MNT_SPEED_SUCCESS,
	GET_MNT_SPEED_ERROR,
	GET_MNT_RATE_START,
	GET_MNT_RATE_SUCCESS,
	GET_MNT_RATE_ERROR,
	GET_ADMIN_LOCKED_PRICES_START,
	GET_ADMIN_LOCKED_PRICES_SUCCESS,
	GET_ADMIN_LOCKED_PRICES_ERROR,
	GET_ADMIN_FRESH_PRICES_START,
	GET_ADMIN_FRESH_PRICES_SUCCESS,
	GET_ADMIN_FRESH_PRICES_ERROR,
} from './types';
import API from '../services';
import { toUnderlyingCurrencyIdAPI } from '../util/cast';

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

export const getControllerParams = () => {
	return async (dispatch: Dispatch, getState: GetState) => {
		try {
			const {
				protocolData: { currencies },
			} = getState();
			dispatch({ type: GET_CONTROLLER_PARAMS_START });

			const dataArray = await Promise.all(
				currencies.map((currencyId) =>
					API.query.controller.controllerParams(
						toUnderlyingCurrencyIdAPI(currencyId)
					)
				)
			);

			const initRates = currencies.reduce((old: any, item, index) => {
				old[item] = dataArray[index];
				return old;
			}, {});

			dispatch({
				type: GET_CONTROLLER_PARAMS_SUCCESS,
				payload: initRates,
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: GET_CONTROLLER_PARAMS_ERROR,
			});
		}
	};
};

export const getMinterestModelParams = () => {
	return async (dispatch: Dispatch, getState: GetState) => {
		try {
			const {
				protocolData: { currencies },
			} = getState();
			dispatch({ type: GET_MINTEREST_MODEL_PARAMS_START });

			const dataArray = await Promise.all(
				currencies.map((currencyId) =>
					API.query.minterestModel.minterestModelParams(
						toUnderlyingCurrencyIdAPI(currencyId)
					)
				)
			);

			const initRates = currencies.reduce((old: any, item, index) => {
				old[item] = dataArray[index];
				return old;
			}, {});

			dispatch({
				type: GET_MINTEREST_MODEL_PARAMS_SUCCESS,
				payload: initRates,
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: GET_MINTEREST_MODEL_PARAMS_ERROR,
			});
		}
	};
};

export const getPauseKeepers = () => {
	return async (dispatch: Dispatch, getState: GetState) => {
		try {
			const {
				protocolData: { currencies },
			} = getState();
			dispatch({ type: GET_PAUSE_KEEPERS_START });

			const dataArray = await Promise.all(
				currencies.map((currencyId) =>
					API.query.controller.pauseKeepers(
						toUnderlyingCurrencyIdAPI(currencyId)
					)
				)
			);

			const initFlag = currencies.reduce((old: any, item, index) => {
				old[item] = dataArray[index];
				return old;
			}, {});

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

export const getAdminLockedPrices = () => {
	return async (dispatch: Dispatch, getState: GetState) => {
		try {
			dispatch({ type: GET_ADMIN_LOCKED_PRICES_START });

			const {
				protocolData: { currencies },
			} = getState();

			// @ts-ignore
			const data = await API.rpc.prices.getAllLockedPrices();

			const convertedData: any = {};

			data.forEach((el: any, index: number) => {
				convertedData[currencies[index]] = el[1];
			});

			dispatch({
				type: GET_ADMIN_LOCKED_PRICES_SUCCESS,
				payload: convertedData,
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: GET_ADMIN_LOCKED_PRICES_ERROR,
			});
		}
	};
};

export const getAdminFreshPrices = () => {
	return async (dispatch: Dispatch, getState: GetState) => {
		try {
			dispatch({ type: GET_ADMIN_FRESH_PRICES_START });
			const {
				protocolData: { currencies },
			} = getState();

			// @ts-ignore
			const data = await API.rpc.prices.getFreshValues();

			const convertedValues: any = {};
			data.forEach((el: any, index: number) => {
				convertedValues[currencies[index]] = el[1];
			});

			dispatch({
				type: GET_ADMIN_FRESH_PRICES_SUCCESS,
				payload: convertedValues,
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: GET_ADMIN_FRESH_PRICES_ERROR,
			});
		}
	};
};

export const getMNTSpeeds = () => {
	return async (dispatch: Dispatch, getState: GetState) => {
		try {
			const {
				protocolData: { currencies },
			} = getState();
			dispatch({ type: GET_MNT_SPEED_START });

			const speeds = await Promise.all(
				currencies.map((currencyId) =>
					API.query.mntToken.mntSpeeds(toUnderlyingCurrencyIdAPI(currencyId))
				)
			);
			const data = currencies.reduce((old: any, item, index) => {
				old[item] = speeds[index];
				return old;
			}, {});

			dispatch({
				type: GET_MNT_SPEED_SUCCESS,
				payload: data,
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: GET_MNT_SPEED_ERROR,
			});
		}
	};
};

export const getMNTRate = () => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: GET_MNT_RATE_START });

			const rate = await API.query.mntToken.mntRate();

			dispatch({
				type: GET_MNT_RATE_SUCCESS,
				payload: rate,
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: GET_MNT_RATE_ERROR,
			});
		}
	};
};
