import { formatBalance } from '@polkadot/util';
import { Dispatch } from './types';

import API from '../services';

export const convertRate = (rate, toFixed?: number) => {
	if (toFixed) {
		return (rate.toHuman().split(',').join('') / 10 ** 18).toFixed(toFixed);
	}
	return rate.toHuman().split(',').join('') / 10 ** 18;
};

// avoid scientific notation "1.2e-5"
export function toPlainString(num) {
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

export function convertToTokenValue(value) {
	let multiplier = 10n ** 18n;
	const decimalCount = countDecimals(value);

	if (decimalCount) {
		const convertedValue = BigInt(value * 10 ** decimalCount);
		return (convertedValue * multiplier) / BigInt(10 ** decimalCount);
	} else {
		return BigInt(value) * multiplier;
	}
}

export const txCallback = (types: string[], dispatch: Dispatch) => {
	const [successType, errorType] = types;
	return ({ events = [], status }) => {
		console.log(6);
		if (status.isFinalized) {
			events.forEach(
				({
					event: {
						method,
						section,
						// @ts-ignore
						data: [error],
					},
				}) => {
					console.log(7, method, section, error);
					if (section === 'system' && method === 'ExtrinsicSuccess') {
						console.log(8);
						dispatch({
							type: successType,
						});
						// @ts-ignore
					} else if (method === 'ExtrinsicFailed' && error.isModule) {
						console.log(9);
						// @ts-ignore
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

export const formatData = (data) => {
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

export const convertBalanceDeviationThreshold = (value: any) => {
	return (value.toHuman().split(',').join('') / 10 ** 18) * 100;
};
