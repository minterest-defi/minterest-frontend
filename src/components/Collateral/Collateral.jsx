import React, { useState } from 'react';
import { useSubstrate } from '../../substrate-lib';
import { Table, Grid } from 'semantic-ui-react';
import { UNDERLYING_ASSETS_TYPES } from '../../util/constants';
import ButtonEnable from './ButtonEnable';

function Collateral({ account }) {
	const { api } = useSubstrate();

	const setCurrentState = () => {
		return UNDERLYING_ASSETS_TYPES.map((currency) => {
			return { currency: currency, flag: '-' };
		});
	};

	const [currencyFlag, setFlag] = useState(setCurrentState());

	const currencyFlagTemp = [];

	const fetchData = async () => {
		if (account) {
			for (const currency of UNDERLYING_ASSETS_TYPES) {
				const data = await api.query.liquidityPools.poolUserDates(
					account,
					currency
				);
				currencyFlagTemp.push({
					currency: currency,
					flag: account ? data.collateral.toHuman() : '-',
				});
			}
			setFlag(currencyFlagTemp);
		} else if (currencyFlag.some((f) => f.flag !== '-')) {
			setFlag(setCurrentState());
		}
	};
	fetchData();

	return (
		<Grid.Column>
			<h2>Collateral</h2>
			<Table celled striped size='small'>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell key='headerAsset'>Asset</Table.HeaderCell>
						<Table.HeaderCell key='headerFlag'>Flag</Table.HeaderCell>
						<Table.HeaderCell key='headerButtons'>Buttons</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{currencyFlag.map((collateral, index) => (
						<Table.Row key={collateral.currency}>
							<Table.Cell key={`currency-${collateral.currency}`}>
								{collateral.currency}
							</Table.Cell>
							<Table.Cell key={index}>{collateral.flag.toString()}</Table.Cell>
							<Table.Cell key={index + 100}>
								<ButtonEnable account={account} asset={collateral.currency} />
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</Grid.Column>
	);
}

export default Collateral;
