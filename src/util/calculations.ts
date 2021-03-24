export function getIdealValue(
	liquidityPoolValue: number,
	liquidityPoolBalanceRatio: number
) {
	return liquidityPoolValue * liquidityPoolBalanceRatio;
}

export function getDeviation(
	liquidation_pool_available_liquidity: number,
	ideal_value: number
) {
	return liquidation_pool_available_liquidity - ideal_value;
}

export function getThresholdValues(
	ideal_value: number,
	deviation_threshold: number
) {
	const thresholdValue = ideal_value * deviation_threshold;
	return {
		upperThreshold: ideal_value + thresholdValue,
		lowerThreshold: ideal_value - thresholdValue,
	};
}
