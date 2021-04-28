import { Metadata } from './types';
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
	let data = modules.toArray().map((module: any, index: number) => ({
		id: index,
		name: module.name.toString(),
		extrinsics: module.calls.value,
	}));

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
