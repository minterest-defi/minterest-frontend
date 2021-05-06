import { Metadata } from './types';
import config from '../config';

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

export function parseMetadata(metadata: any): Metadata {
	const rawMetadata = metadata.get('metadata');
	// @ts-ignore
	const metadataValue = rawMetadata.value;
	const modules = metadataValue.modules;
	let data = modules
		.toArray()
		.map((module: any, index: number) => ({
			id: index,
			name: module.name.toString(),
			extrinsics: module.calls.value,
		}))
		.sort((a: any, b: any) => {
			const nameA = a.name.toUpperCase();
			const nameB = b.name.toUpperCase();
			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}
			return 0;
		});

	data = data.map((item: any) => ({
		id: item.id,
		name: item.name,
		extrinsics: item.extrinsics.isEmpty
			? []
			: item.extrinsics.map((call: any) => ({
					moduleId: item.id,
					name: call.name.toString(),
					args: call.args.isEmpty
						? []
						: call.args.map((arg: any) => ({
								name: arg.name.toString(),
								type: arg.type.toString(),
						  })),
			  })),
	}));

	return {
		modules: data,
	};
}

export function calculateCurrentOverSupplyPercent(
	totalCollateral: number,
	totalBorrowed: number
) {
	if (!totalBorrowed) return 0;

	return (totalCollateral / totalBorrowed) * 100;
}

export function calculateSafeOverSupplyUSD(totalCollateral: number) {
	return (totalCollateral / 100) * config.SAFE_OVERSUPPLY_LIMIT;
}

export function calculateNewOversupplyPercent(
	totalCollateral: number,
	amountUSD: number,
	totalBorrowed: number
) {
	if (!totalBorrowed) return 0;

	return ((totalCollateral + amountUSD) / totalBorrowed) * 100;
}

export function calculateNewOversupplyUSD(
	totalCollateral: number,
	amountUSD: number
) {
	return ((totalCollateral + amountUSD) / 100) * config.SAFE_OVERSUPPLY_LIMIT;
}
