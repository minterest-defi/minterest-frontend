import React from 'react';
import { Grid, Table } from 'semantic-ui-react';
// @ts-ignore
import classes from './EconomicParameters.module.css';
import { UNDERLYING_ASSETS_TYPES } from '../../util/constants';
import Loading from '../../util/Loading';
import { EconomicParametersProps } from '../../containers/AdminPanel/AdminPanel.types';
import {
	formatData,
	toPlainString,
	convertRateToPercent,
	convertRateToFraction,
	convertRateToPercentPerYear,
} from '../../util';
import {
	getDeviation,
	getIdealValue,
	getThresholdValues,
} from '../../util/calculations';

export default function EconomicParameters(props: EconomicParametersProps) {
	const {
		minterestModelData,
		controllerData,
		riskManagerData,
		lockedPricesData,
		liquidationPoolsBalance,
		liquidationPoolBalancingPeriod,
		liquidationPoolsParams,
		poolsBalance,
	} = props;

	if (
		!minterestModelData ||
		!controllerData ||
		!riskManagerData ||
		!poolsBalance ||
		!lockedPricesData ||
		!liquidationPoolsBalance ||
		!liquidationPoolBalancingPeriod ||
		!liquidationPoolsParams
	)
		return <Loading />;

	const formatPrice = (price: any) => {
		if (price.value.toHuman() === null) return '-';
		return `${toPlainString(convertRateToFraction(price.value))} $`;
	};

	const formatBorrowCap = (price: any) => {
		if (price.toHuman() === null) return '-';
		return `${formatData(price)} $`;
	};

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

	const renderBottomRow = () => {
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

			return (
				<Table.Row key={index}>
					<Table.Cell>{asset}</Table.Cell>
					<Table.Cell>
						{minterestModelData &&
							convertRateToPercentPerYear(
								minterestModelData[asset].jump_multiplier_per_block,
								2
							)}{' '}
						%
					</Table.Cell>
					<Table.Cell>
						{minterestModelData &&
							convertRateToPercentPerYear(
								minterestModelData[asset].multiplier_per_block,
								2
							)}{' '}
						%
					</Table.Cell>
					<Table.Cell>
						{minterestModelData &&
							convertRateToPercentPerYear(
								minterestModelData[asset].base_rate_per_block,
								2
							)}{' '}
						%
					</Table.Cell>
					<Table.Cell>
						{minterestModelData &&
							convertRateToPercent(minterestModelData[asset].kink, 2)}{' '}
						%
					</Table.Cell>
					<Table.Cell>
						{controllerData &&
							convertRateToPercent(
								controllerData[asset].insurance_factor,
								2
							)}{' '}
						%
					</Table.Cell>
					<Table.Cell>
						{controllerData &&
							convertRateToFraction(controllerData[asset].collateral_factor, 2)}
					</Table.Cell>
					<Table.Cell>
						{riskManagerData &&
							convertRateToPercent(riskManagerData[asset].threshold, 2)}{' '}
						%
					</Table.Cell>
					<Table.Cell>
						{riskManagerData &&
							convertRateToPercent(
								riskManagerData[asset].liquidation_incentive,
								2
							)}{' '}
						%
					</Table.Cell>
					<Table.Cell>{liquidationPoolAvailableLiquidity}</Table.Cell>
					<Table.Cell>{idealValue?.toFixed(18)}</Table.Cell>
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
						{controllerData &&
							formatBorrowCap(controllerData[asset]['borrow_cap']['value'])}
					</Table.Cell>
				</Table.Row>
			);
		});
	};

	const renderTopRow = () => {
		return UNDERLYING_ASSETS_TYPES.map((asset, index) => {
			const loanSizeThreshold =
				BigInt(riskManagerData[asset]?.min_sum.toString()) / 10n ** 18n;

			return (
				<Table.Row key={index}>
					<Table.Cell>{asset}</Table.Cell>
					<Table.Cell>
						{riskManagerData[asset]?.max_attempts.toHuman()}
					</Table.Cell>
					<Table.Cell>{loanSizeThreshold.toString()} $</Table.Cell>
					<Table.Cell>
						{lockedPricesData && formatPrice(lockedPricesData[asset])}
					</Table.Cell>
					<Table.Cell>
						{convertRateToPercent(
							liquidationPoolsParams[asset].deviation_threshold
						)}{' '}
						%
					</Table.Cell>
					<Table.Cell>
						{convertRateToPercent(liquidationPoolsParams[asset].balance_ratio)}{' '}
						%
					</Table.Cell>
					<Table.Cell>{liquidationPoolBalancingPeriod.toHuman()}</Table.Cell>
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
							<Table.HeaderCell key='BalanceDeviationThreshold'>
								Balance Deviation Threshold
							</Table.HeaderCell>
							<Table.HeaderCell key='BalanceRatio'>
								Balance Ratio
							</Table.HeaderCell>
							<Table.HeaderCell key='BalancingPeriod'>
								Balancing Period
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
								Jump Multiplier Per Year
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
							<Table.HeaderCell key='Threshold'>Threshold</Table.HeaderCell>
							<Table.HeaderCell key='LiquidationFee'>
								Liquidation Fee
							</Table.HeaderCell>
							<Table.HeaderCell key='TotalAmount'>
								Liquidation Pools Balance (Total Amount)
							</Table.HeaderCell>
							<Table.HeaderCell key='IdealState'>Ideal State</Table.HeaderCell>
							<Table.HeaderCell key='Deviation'>Deviation</Table.HeaderCell>
							<Table.HeaderCell key='BorrowCap'>Borrow Cap</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>{renderBottomRow()}</Table.Body>
				</Table>
			</Grid.Column>
		</div>
	);
}
