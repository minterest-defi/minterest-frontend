import { useEffect, useRef } from 'react';
import { formatBalance } from '@polkadot/util';
import { Dispatch } from './types';
import { BLOCKS_PER_YEAR } from './constants';

import API from '../services';

export const convertRateToPercent = (rate: any, toFixed?: number) => {
	if (!rate) return 'ERROR';
	if (toFixed) {
		return ((rate.toHuman().split(',').join('') / 10 ** 18) * 100).toFixed(
			toFixed
		);
	}
	return (rate.toHuman().split(',').join('') / 10 ** 18) * 100;
};

export const convertRateToFraction = (rate: any, toFixed?: number) => {
	if (!rate) return 'ERROR';
	if (toFixed) {
		return (rate.toHuman().split(',').join('') / 10 ** 18).toFixed(toFixed);
	}
	return rate.toHuman().split(',').join('') / 10 ** 18;
};

export const convertRateToPercentPerYear = (rate: any, toFixed?: number) => {
	if (!rate) return 'ERROR';
	if (toFixed) {
		return (
			(rate.toHuman().split(',').join('') / 10 ** 18) *
			BLOCKS_PER_YEAR *
			100
		).toFixed(toFixed);
	}
	return (
		(rate.toHuman().split(',').join('') / 10 ** 18) * BLOCKS_PER_YEAR * 100
	);
};

// avoid scientific notation "1.2e-5"
export function toPlainString(num: string | number) {
	return ('' + +num).replace(
		/(-?)(\d*)\.?(\d*)e([+-]\d+)/,
		function (a, b, c, d, e) {
			return e < 0
				? b + '0.' + Array(1 - e - c.length).join('0') + c + d
				: b + c + d + Array(e - d.length + 1).join('0');
		}
	);
}

export function countDecimals(value: number | string) {
	if (Math.floor(+value) === +value) return 0;
	return +value.toString().split('.')[1].length || 0;
}

export function isInt(n: number) {
	return n % 1 === 0;
}

export function convertToTokenValue(value: string) {
	let multiplier = 10n ** 18n;
	const decimalCount = countDecimals(value);

	if (decimalCount) {
		// @ts-ignore
		const convertedValue = BigInt(value * 10 ** decimalCount);
		return (convertedValue * multiplier) / BigInt(10 ** decimalCount);
	} else {
		return BigInt(value) * multiplier;
	}
}

export function convertInputToPercent(value: string) {
	let multiplier = 10n ** 18n;
	const decimalCount = countDecimals(value);

	if (decimalCount) {
		// @ts-ignore
		const convertedValue = BigInt(value * 10 ** decimalCount);
		return (convertedValue * multiplier) / BigInt(10 ** decimalCount) / 100n;
	} else {
		return (BigInt(value) * multiplier) / 100n;
	}
}

export const txCallback = (types: string[], dispatch: Dispatch) => {
	const [successType, errorType] = types;
	return ({ events = [], status }: any) => {
		if (status.isFinalized) {
			events.forEach(
				({
					event: {
						method,
						section,
						data: [error],
					},
				}: any) => {
					if (section === 'system' && method === 'ExtrinsicSuccess') {
						dispatch({
							type: successType,
						});
					} else if (method === 'ExtrinsicFailed' && error.isModule) {
						const decoded = API.registry.findMetaError(error.asModule);
						const { documentation } = decoded;
						dispatch({
							type: errorType,
							payload: documentation.join(' '),
						});
					}
				}
			);
		}
	};
};

export const formatData = (data: any) => {
	const decimals = 18;
	const updatedData = formatBalance(data, { withSi: false, forceUnit: '-' }, 0)
		.split('.', 1)
		.join('')
		.split(',')
		.join('');
	if (updatedData.length > decimals) {
		return `${
			updatedData.slice(0, updatedData.length - decimals) || '0'
		}.${updatedData.slice(updatedData.length - decimals)}`;
	} else if (updatedData.length <= decimals) {
		// @ts-ignore
		return updatedData / 10 ** decimals;
	} else {
		return updatedData;
	}
};

export function useInterval(callback: Function, delay: number) {
	const savedCallback = useRef<Function>();

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval.
	useEffect(() => {
		function tick() {
			if (savedCallback.current) savedCallback.current();
		}
		if (delay !== null) {
			let id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);
}

export const formatBorrowCap = (price: any) => {
	if (price.toHuman() === null) return '-';
	return `${formatData(price)} $`;
};

export function useAPIResponse(
	propsToTrack: [boolean, any],
	onSuccess?: Function,
	onError?: Function
) {
	const [isRunning, response] = propsToTrack;
	useEffect(() => {
		if (isRunning || !response) return;

		const { isError, errorMessage } = response;

		if (isError) {
			if (onError) {
				onError(errorMessage);
			}
		} else {
			if (onSuccess) {
				onSuccess();
			}
		}
	}, [isRunning, response]);
}
