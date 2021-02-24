import React from 'react';
import { Grid, Table } from 'semantic-ui-react';
import classes from './EconomicParameters.module.css';
import { UNDERLYING_ASSETS_TYPES } from '../../../util/constants';
import Loading from '../../../util/Loading';

export default function EconomicParameters(props) {
	const { minterestModelData, controllerData, riskManagerData } = props;

	if (!minterestModelData || !controllerData || !riskManagerData)
		return <Loading />;

	const renderRow = () => {
		return UNDERLYING_ASSETS_TYPES.map((asset, index) => (
			<Table.Row key={index}>
				<Table.Cell>{asset}</Table.Cell>
				<Table.Cell>
					{minterestModelData[asset]?.jump_multiplier_per_block.toHuman()}
				</Table.Cell>
				<Table.Cell>
					{minterestModelData[asset]?.multiplier_per_block.toHuman()}
				</Table.Cell>
				<Table.Cell>
					{minterestModelData[asset]?.base_rate_per_block.toHuman()}
				</Table.Cell>
				<Table.Cell>{minterestModelData[asset]?.kink.toHuman()}</Table.Cell>
				<Table.Cell>
					{controllerData[asset]?.insurance_factor.toHuman()}
				</Table.Cell>
				<Table.Cell>
					{controllerData[asset]?.collateral_factor.toHuman()}
				</Table.Cell>
				<Table.Cell>
					{riskManagerData[asset]?.liquidation_fee.toHuman()}
				</Table.Cell>
				<Table.Cell>{riskManagerData[asset]?.threshold.toHuman()}</Table.Cell>
				<Table.Cell>
					{riskManagerData[asset]?.max_attempts.toHuman()}
				</Table.Cell>
			</Table.Row>
		));
	};

	return (
		<div className={classes.economicParameters}>
			<Grid.Column>
				<h2>Economic Parameters</h2>
				<Table celled striped size='small'>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell key='Asset'>Asset</Table.HeaderCell>
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
							<Table.HeaderCell key='LiquidationMaxAttempt'>
								Liquidations Max Attempts
							</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>{renderRow()}</Table.Body>
				</Table>
			</Grid.Column>
		</div>
	);
}
