import React from 'react';
import { Grid, Table } from 'semantic-ui-react';
import classes from './LiquidationPoolsConfigurationData.module.scss';
import Loading from '../../util/Loading';
import { LiquidationPoolsConfigurationDataProps } from '../../containers/LiquidationAdmin/LiquidationAdmin.types';
import {
	formatData,
	formatBorrowCap,
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
		riskManagerParams,
		poolsBalance,
		currencies,
	} = props;

	if (
		!liquidationPoolsBalance ||
		!liquidationPoolsParams ||
		!riskManagerParams ||
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
		return currencies.map((asset, index) => {
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
				BigInt(
					riskManagerParams[asset]?.min_partial_liquidation_sum.toString()
				) /
				10n ** 18n;

			return (
				<Table.Row key={index}>
					<Table.Cell>{asset}</Table.Cell>
					<Table.Cell>{liquidationPoolAvailableLiquidity}</Table.Cell>
					<Table.Cell>
						{convertRateToPercent(
							liquidationPoolsParams[asset].balance_ratio,
							2
						)}{' '}
						%
					</Table.Cell>
					<Table.Cell>{idealValue?.toFixed(18)}</Table.Cell>
					<Table.Cell>
						{liquidationPoolsParams &&
							formatBorrowCap(
								liquidationPoolsParams[asset]['max_ideal_balance']['value']
							)}
					</Table.Cell>
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
						{riskManagerParams &&
							convertRateToPercent(
								riskManagerParams[asset].liquidation_fee,
								2
							)}{' '}
						%
					</Table.Cell>
					<Table.Cell>
						{riskManagerParams &&
							convertRateToPercent(riskManagerParams[asset].threshold, 2)}{' '}
						%
					</Table.Cell>
					<Table.Cell>
						{riskManagerParams[asset]?.max_attempts.toHuman()}
					</Table.Cell>
					<Table.Cell>{loanSizeThreshold.toString()} $</Table.Cell>
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
							<Table.HeaderCell key='MaxIdealState'>
								Max Ideal State
							</Table.HeaderCell>
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
						</Table.Row>
					</Table.Header>
					<Table.Body>{renderRow()}</Table.Body>
				</Table>
			</Grid.Column>
		</div>
	);
}
