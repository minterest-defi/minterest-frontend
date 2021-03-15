import React from 'react';
import { Grid, Table } from 'semantic-ui-react';
// @ts-ignore
import classes from './EconomicParameters.module.css';
import { UNDERLYING_ASSETS_TYPES } from '../../../util/constants';
import Loading from '../../../util/Loading';
import { convertRate, toPlainString } from '../../../util';
import {
	getDeviation,
	getIdealValue,
	getThresholdValues,
} from '../../../util/calculations';
import { formatData, convertBalanceDeviationThreshold } from '../../../util';

interface Props {
	minterestModelData: any;
	controllerData: any;
	riskManagerData: any;
	lockedPricesData: any;
	liquidationPoolsBalance: any;
	liquidationPoolsParameters: any;
	poolsBalance: any;
}

export default function EconomicParameters(props: Props) {
	const {
		minterestModelData,
		controllerData,
		riskManagerData,
		lockedPricesData,
		liquidationPoolsBalance,
		liquidationPoolsParameters,
		poolsBalance,
	} = props;

	if (
		!minterestModelData ||
		!controllerData ||
		!riskManagerData ||
		!poolsBalance
	)
		return <Loading />;

	const formatPrice = (price) => {
		if (price.value.toHuman() === null) return '-';
		return `${toPlainString(convertRate(price.value))} $`;
	};

	const getDeviationColorStyle = (
		deviation,
		deviationRangeBottom,
		deviationRangeTop
	) => {
		if (deviation > deviationRangeTop) {
			return classes.deviationGreenCell;
		}
		if (deviation < deviationRangeBottom) {
			return classes.deviationGreenCell;
		}
	};

	const renderBottomRow = () => {
		return UNDERLYING_ASSETS_TYPES.map((asset, index) => {
			const jumpMultiplierPerBlock = toPlainString(
				convertRate(minterestModelData[asset]?.jump_multiplier_per_block)
			);
			const multiplierPerBlock = toPlainString(
				convertRate(minterestModelData[asset]?.multiplier_per_block)
			);
			const baseRatePerBlock = toPlainString(
				convertRate(minterestModelData[asset]?.base_rate_per_block)
			);

			console.log(liquidationPoolsParameters);

			const liquidityPoolAvailableLiquidity = formatData(
				poolsBalance[asset]?.free
			);
			const liquidationPoolAvailableLiquidity = formatData(
				liquidationPoolsBalance[asset]?.free
			);
			const liquidationPoolBalanceRatio = convertRate(
				liquidationPoolsParameters[asset]?.balance_ratio
			);
			const liquidationPoolDeviationThreshold = convertRate(
				liquidationPoolsParameters[asset]?.deviation_threshold
			);

			const idealValue = getIdealValue(
				liquidityPoolAvailableLiquidity,
				liquidationPoolBalanceRatio
			);
			const deviation = getDeviation(
				liquidationPoolAvailableLiquidity,
				idealValue
			);
			const thresholdValues = getThresholdValues(
				idealValue,
				liquidationPoolDeviationThreshold
			);

			return (
				<Table.Row key={index}>
					<Table.Cell>{asset}</Table.Cell>
					<Table.Cell>{jumpMultiplierPerBlock}</Table.Cell>
					<Table.Cell>{multiplierPerBlock}</Table.Cell>
					<Table.Cell>{baseRatePerBlock}</Table.Cell>
					<Table.Cell>
						{convertRate(minterestModelData[asset]?.kink)}
					</Table.Cell>
					<Table.Cell>
						{convertRate(controllerData[asset]?.insurance_factor, 2)}
					</Table.Cell>
					<Table.Cell>
						{convertRate(controllerData[asset]?.collateral_factor, 2)}
					</Table.Cell>
					<Table.Cell>
						{convertRate(riskManagerData[asset]?.threshold, 2)}
					</Table.Cell>
					<Table.Cell>
						{convertRate(riskManagerData[asset]?.liquidation_incentive, 2)}
					</Table.Cell>
					<Table.Cell>{liquidityPoolAvailableLiquidity}</Table.Cell>
					<Table.Cell>{idealValue}</Table.Cell>
					<Table.Cell
						className={getDeviationColorStyle(
							deviation,
							thresholdValues.lowerThreshold,
							thresholdValues.upperThreshold
						)}
					>
						{deviation}
					</Table.Cell>
				</Table.Row>
			);
		});
	};

	const renderTopRow = () => {
		return UNDERLYING_ASSETS_TYPES.map((asset, index) => {
			return (
				<Table.Row key={index}>
					<Table.Cell>{asset}</Table.Cell>
					<Table.Cell>
						{riskManagerData[asset]?.max_attempts.toHuman()}
					</Table.Cell>
					<Table.Cell>
						{riskManagerData[asset]?.min_sum.toString()} $
					</Table.Cell>
					<Table.Cell>
						{lockedPricesData && formatPrice(lockedPricesData[asset])}
					</Table.Cell>
					<Table.Cell>
						{liquidationPoolsBalance &&
							formatData(liquidationPoolsBalance[asset]['free'])}
					</Table.Cell>
					<Table.Cell>
						{liquidationPoolsParameters &&
							convertBalanceDeviationThreshold(
								liquidationPoolsParameters[asset].deviation_threshold
							)}{' '}
						%
					</Table.Cell>
					<Table.Cell>
						{liquidationPoolsParameters &&
							convertBalanceDeviationThreshold(
								liquidationPoolsParameters[asset].balance_ratio
							)}{' '}
						%
					</Table.Cell>
				</Table.Row>
			);
		});
	};

	return (
		<div className={classes.economicParameters}>
			<Grid.Column>
				<h2>Economic Parameters</h2>
				<Table celled striped size='small'>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell key='AssetTop'>Asset</Table.HeaderCell>
							<Table.HeaderCell key='LiquidationMaxAttempt'>
								Liquidations Max Attempts
							</Table.HeaderCell>
							<Table.HeaderCell key='LoanSizeLiquidationThreshold'>
								Loan size liquidation threshold
							</Table.HeaderCell>
							<Table.HeaderCell key='LockedPrices'>
								Locked Prices
							</Table.HeaderCell>
							<Table.HeaderCell key='LiquidationPoolsBalance'>
								Liquidation Pools Balance
							</Table.HeaderCell>
							<Table.HeaderCell key='BalanceDeviationThreshold'>
								Balance Deviation Threshold
							</Table.HeaderCell>
							<Table.HeaderCell key='BalanceRatio'>
								Balance Ratio
							</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>{renderTopRow()}</Table.Body>
				</Table>
				<Table celled striped size='small'>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell key='AssetBottom'>Asset</Table.HeaderCell>
							<Table.HeaderCell key='JumpModifierPerYear'>
								Jump Modifier Per Year
							</Table.HeaderCell>
							<Table.HeaderCell key='MultiplierRatePerYear'>
								Multiplier Rate Per Year
							</Table.HeaderCell>
							<Table.HeaderCell key='BaseRatePerYear'>
								Base Rate Per Year
							</Table.HeaderCell>
							<Table.HeaderCell key='Kink'>Kink</Table.HeaderCell>
							<Table.HeaderCell key='InsuranceFactor'>
								Insurance Factor
							</Table.HeaderCell>
							<Table.HeaderCell key='CollateralFactor'>
								Collateral Factor
							</Table.HeaderCell>
							<Table.HeaderCell key='CollateralThreshold'>
								Collateral Threshold
							</Table.HeaderCell>
							<Table.HeaderCell key='LiquidationFee'>
								Liquidation Fee
							</Table.HeaderCell>
							<Table.HeaderCell key='TotalAmount'>
								Total Amount
							</Table.HeaderCell>
							<Table.HeaderCell key='IdealState'>Ideal State</Table.HeaderCell>
							<Table.HeaderCell key='Deviation'>Deviation</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>{renderBottomRow()}</Table.Body>
				</Table>
			</Grid.Column>
		</div>
	);
}
