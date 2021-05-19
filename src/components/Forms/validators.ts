import { isInt, countDecimals } from '../../util';
// 10b
const MAX_VALUE = 10 * 1000 * 1000 * 1000;
const MAX_DECIMAL_PRECISION = 15;
export const required = (value: any) => (value ? undefined : 'Required');

export const isInteger = (value: any) => {
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
export const isDecimal = (value: any) => {
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

export const isMax = (value: any) => {
	const convValue = Number(value);
	if (!value) return;

	if (convValue > 1000000) {
		return 'Exceeds the maximum value';
	}
};

export const isMin = (value: any) => {
	const convValue = Number(value);
	if (!value) return;

	if (convValue < 0) {
		return 'The value cannot be less than 0';
	} else if (convValue === 0) {
		return 'Transaction with zero balance is not allowed.';
	}
};
