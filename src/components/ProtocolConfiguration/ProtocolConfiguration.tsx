import React from 'react';
import { Grid, Table } from 'semantic-ui-react';
// @ts-ignore
import classes from './ProtocolConfiguration.module.css';
import { UNDERLYING_ASSETS_TYPES } from '../../util/constants';
import Loading from '../../util/Loading';
import { ProtocolConfigurationProps } from '../../containers/ProtocolAdmin/ProtocolAdmin.types';
import {
	formatData,
	convertRateToPercent,
	convertRateToFraction,
	convertRateToPercentPerYear,
} from '../../util';

export default function ProtocolConfiguration(
	props: ProtocolConfigurationProps
) {
	const { minterestModelData, controllerData } = props;

	if (!minterestModelData || !controllerData) return <Loading />;

	const formatBorrowCap = (price: any) => {
		if (price.toHuman() === null) return '-';
		return `${formatData(price)} $`;
	};

	const renderRow = () => {
		return UNDERLYING_ASSETS_TYPES.map((asset, index) => {
			return (
				<Table.Row key={index}>
					<Table.Cell>{asset}</Table.Cell>
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
						{minterestModelData &&
							convertRateToPercentPerYear(
								minterestModelData[asset].base_rate_per_block,
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
							convertRateToPercent(minterestModelData[asset].kink, 2)}{' '}
						%
					</Table.Cell>
					<Table.Cell>
						{minterestModelData &&
							convertRateToPercentPerYear(
								minterestModelData[asset].jump_multiplier_per_block,
								2
							)}{' '}
						%
					</Table.Cell>
					<Table.Cell>
						{controllerData &&
							formatBorrowCap(controllerData[asset]['borrow_cap']['value'])}
					</Table.Cell>
				</Table.Row>
			);
		});
	};

	return (
		<div className={classes.protocol_configuration}>
			<Grid.Column>
				<h2>Protocol Configuration</h2>
				<Table celled striped size='small'>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell key='Pool'>Pool</Table.HeaderCell>
							<Table.HeaderCell key='InsuranceFactor'>
								Insurance Factor
							</Table.HeaderCell>
							<Table.HeaderCell key='CollateralFactor'>
								Collateral Factor
							</Table.HeaderCell>
							<Table.HeaderCell key='BaseRatePerYear'>
								Base Rate Per Year
							</Table.HeaderCell>
							<Table.HeaderCell key='MultiplierRatePerYear'>
								Multiplier Rate Per Year
							</Table.HeaderCell>
							<Table.HeaderCell key='Kink'>Kink</Table.HeaderCell>
							<Table.HeaderCell key='JumpModifierPerYear'>
								Jump Multiplier Per Year
							</Table.HeaderCell>
							<Table.HeaderCell key='BorrowCap'>Borrow Cap</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>{renderRow()}</Table.Body>
				</Table>
			</Grid.Column>
		</div>
	);
}
