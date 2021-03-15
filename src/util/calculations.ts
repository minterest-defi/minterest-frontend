export function getIdealValue(liquidityPoolValue, liquidityPoolBalanceRatio) {
	return liquidityPoolValue * liquidityPoolBalanceRatio;
}

export function getDeviation(
	liquidation_pool_available_liquidity,
	ideal_value
) {
	return liquidation_pool_available_liquidity * ideal_value;
}

export function getThresholdValues(ideal_value, deviation_threshold) {
	const thresholdValue = ideal_value * deviation_threshold;
	return {
		upperThreshold: ideal_value + thresholdValue,
		lowerThreshold: ideal_value - thresholdValue,
	};
}
