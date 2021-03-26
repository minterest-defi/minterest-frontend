import React from 'react';
import { Grid, Table } from 'semantic-ui-react';
// @ts-ignore
import classes from './LiquidationPoolsConfigurationData.module.css';
import { UNDERLYING_ASSETS_TYPES } from '../../util/constants';
import Loading from '../../util/Loading';
import { LiquidationPoolsConfigurationDataProps } from '../../containers/LiquidationAdmin/LiquidationAdmin.types';
import {
	formatData,
	convertRateToPercent,
	convertRateToFraction,
} from '../../util';
import {
	getDeviation,
	getIdealValue,
	getThresholdValues,
} from '../../util/calculations';

export default function LiquidationPoolsConfigurationData(
	props: LiquidationPoolsConfigurationDataProps
) {
	const {
		liquidationPoolsBalance,
		liquidationPoolsParams,
		riskManagerData,
		liquidationPoolBalancingPeriod,
		poolsBalance,
	} = props;

	if (
		!liquidationPoolsBalance ||
		!liquidationPoolsParams ||
		!riskManagerData ||
		!liquidationPoolBalancingPeriod ||
		!poolsBalance
	)
		return <Loading />;

	const getDeviationColorStyle = (
		deviation: number,
		deviationRangeBottom: number,
		deviationRangeTop: number
	) => {
		if (deviation > deviationRangeTop) {
			return classes.deviationGreenCell;
		}
		if (deviation < deviationRangeBottom) {
			return classes.deviationGreenCell;
		}
	};

	const renderRow = () => {
		return UNDERLYING_ASSETS_TYPES.map((asset, index) => {
			const liquidityPoolAvailableLiquidity = formatData(
				poolsBalance[asset]?.free
			);
			const liquidationPoolAvailableLiquidity = formatData(
				liquidationPoolsBalance[asset]?.free
			);
			const liquidationPoolBalanceRatio = convertRateToFraction(
				liquidationPoolsParams[asset]?.balance_ratio
			);
			const liquidationPoolDeviationThreshold = convertRateToFraction(
				liquidationPoolsParams[asset]?.deviation_threshold
			);

			const idealValue = getIdealValue(
				+liquidityPoolAvailableLiquidity,
				+liquidationPoolBalanceRatio
			);
			const deviation = getDeviation(
				+liquidationPoolAvailableLiquidity,
				idealValue
			);
			const thresholdValues = getThresholdValues(
				idealValue,
				+liquidationPoolDeviationThreshold
			);
			const loanSizeThreshold =
				BigInt(riskManagerData[asset]?.min_sum.toString()) / 10n ** 18n;

			return (
				<Table.Row key={index}>
					<Table.Cell>{asset}</Table.Cell>
					<Table.Cell>{liquidationPoolAvailableLiquidity}</Table.Cell>
					<Table.Cell>
						{convertRateToPercent(liquidationPoolsParams[asset].balance_ratio)}{' '}
						%
					</Table.Cell>
					<Table.Cell>{idealValue?.toFixed(18)}</Table.Cell>
					<Table.Cell>
						{convertRateToPercent(
							liquidationPoolsParams[asset].deviation_threshold
						)}{' '}
						%
					</Table.Cell>
					<Table.Cell
						className={getDeviationColorStyle(
							deviation,
							thresholdValues.lowerThreshold,
							thresholdValues.upperThreshold
						)}
					>
						{deviation?.toFixed(18)}
					</Table.Cell>
					<Table.Cell>
						{riskManagerData &&
							convertRateToPercent(
								riskManagerData[asset].liquidation_incentive,
								2
							)}{' '}
						%
					</Table.Cell>
					<Table.Cell>
						{riskManagerData &&
							convertRateToPercent(riskManagerData[asset].threshold, 2)}{' '}
						%
					</Table.Cell>
					<Table.Cell>
						{riskManagerData[asset]?.max_attempts.toHuman()}
					</Table.Cell>
					<Table.Cell>{loanSizeThreshold.toString()} $</Table.Cell>
					<Table.Cell>{liquidationPoolBalancingPeriod.toHuman()}</Table.Cell>
				</Table.Row>
			);
		});
	};

	return (
		<div className={classes.economicParameters}>
			<Grid.Column>
				<h2>Liquidation Pools Configuration</h2>
				<Table celled striped size='small'>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell key='Pool'>Pool</Table.HeaderCell>
							<Table.HeaderCell key='Balance'>Balance</Table.HeaderCell>
							<Table.HeaderCell key='BalanceRatio'>
								Balance Ratio
							</Table.HeaderCell>
							<Table.HeaderCell key='IdealState'>Ideal State</Table.HeaderCell>
							<Table.HeaderCell key='DeviationThreshold'>
								Deviation Threshold
							</Table.HeaderCell>
							<Table.HeaderCell key='Deviation'>Deviation</Table.HeaderCell>
							<Table.HeaderCell key='LiquidationFee'>
								Liquidation Fee
							</Table.HeaderCell>
							<Table.HeaderCell key='Threshold'>Threshold</Table.HeaderCell>
							<Table.HeaderCell key='LiquidationMaxAttempts'>
								Liquidation Max Attempts
							</Table.HeaderCell>
							<Table.HeaderCell key='LoanSizeLiquidationThreshold'>
								Loan Size Liquidation Threshold
							</Table.HeaderCell>
							<Table.HeaderCell key='BalancingPeriod'>
								Balancing Period
							</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>{renderRow()}</Table.Body>
				</Table>
			</Grid.Column>
		</div>
	);
}
