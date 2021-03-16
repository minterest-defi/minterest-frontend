import { isInt, countDecimals } from '../../util';
// 10b
const MAX_VALUE = 10 * 1000 * 1000 * 1000;
const MAX_DECIMAL_PRECISION = 15;
export const required = (value) => (value ? undefined : 'Required');

export const isInteger = (value) => {
	const convNum = Number(value);

	if (isNaN(convNum)) {
		return 'Should be number';
	}

	if (!isInt(convNum)) {
		return "Shouldn't be decimal";
	}

	if (convNum > MAX_VALUE) {
		return 'Number is too big';
	}
};
export const isDecimal = (value) => {
	const convDec = Number(value);
	if (!value) return;

	if (isNaN(convDec)) {
		return 'Should be number';
	}

	if (convDec > MAX_VALUE) {
		return 'Number is too big';
	}

	if (countDecimals(convDec) > MAX_DECIMAL_PRECISION) {
		return 'Precision is too high';
	}
};

export const isMax = (value) => {
	const convValue = Number(value);
	if (!value) return;

	if (convValue > 1000000) {
		return 'Exceeds the maximum value';
	}
};
