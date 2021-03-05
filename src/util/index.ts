export const convertRate = (rate, toFixed) => {
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
				? b + '0.' + Array(1 - e - c.length).join(0) + c + d
				: b + c + d + Array(e - d.length + 1).join(0);
		}
	);
}

export function countDecimals(value) {
	if (Math.floor(+value) === +value) return 0;
	return +value.toString().split('.')[1].length || 0;
}

export function isInt(n) {
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
