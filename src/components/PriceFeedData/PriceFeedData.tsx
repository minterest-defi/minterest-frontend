import React from 'react';
import { Grid, Table } from 'semantic-ui-react';
// @ts-ignore
import classes from './PriceFeedData.module.css';
import Loading from '../../util/Loading';
import { PriceFeedDataProps } from '../../containers/ProtocolAdmin/ProtocolAdmin.types';
import { toPlainString, convertRateToFraction } from '../../util';

export default function PriceFeedData(props: PriceFeedDataProps) {
	const { lockedPricesData, currencies } = props;

	if (!lockedPricesData) return <Loading />;

	const formatPrice = (price: any) => {
		if (price.value.toHuman() === null) return '-';
		return `${toPlainString(convertRateToFraction(price.value))} $`;
	};

	const renderTopRow = () => {
		return currencies.map((asset, index) => {
			return (
				<Table.Row key={index}>
					<Table.Cell>{asset}</Table.Cell>
					<Table.Cell>0</Table.Cell>
					<Table.Cell>
						{lockedPricesData && formatPrice(lockedPricesData[asset])}
					</Table.Cell>
				</Table.Row>
			);
		});
	};

	return (
		<div className={classes.economicParameters}>
			<Grid.Column>
				<h2>Price Feed</h2>
				<Table celled striped size='small'>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell key='Pool'>Pool</Table.HeaderCell>
							<Table.HeaderCell key='FreshestValue'>
								Freshest Value
							</Table.HeaderCell>
							<Table.HeaderCell key='LockedValue'>
								Locked Value
							</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>{renderTopRow()}</Table.Body>
				</Table>
			</Grid.Column>
		</div>
	);
}
