import React from 'react';
import { Table, Grid } from 'semantic-ui-react';
import {
	UNDERLYING_ASSETS_TYPES,
	WRAP_TOKEN_TYPES,
} from '../../util/constants';
import { formatData } from '../../util';
import Collateral from './Collateral/Collateral';

// TODO refactoring any
interface Props {
	account: string;
	keyring: any;
	usersBalance: any;
	poolUserDates: any;
	disableCollateral: any;
	isDisableCollateralResponseRunning: any;
	enableAsCollateral: any;
	isEnableAsCollateralResponseRunning: any;
}

function ContentUser(props: Props) {
	const {
		account,
		keyring,
		usersBalance,
		poolUserDates,
		disableCollateral,
		isDisableCollateralResponseRunning,
		enableAsCollateral,
		isEnableAsCollateralResponseRunning,
	} = props;

	const renderRow = () => {
		return UNDERLYING_ASSETS_TYPES.map((asset, index) => {
			const wrapAsset = WRAP_TOKEN_TYPES[index];
			return (
				<Table.Row key={index}>
					<Table.Cell>{asset}</Table.Cell>
					<Table.Cell>
						{usersBalance && formatData(usersBalance[asset]['free'])}
					</Table.Cell>
					<Table.Cell>
						{poolUserDates &&
							formatData(poolUserDates[asset]['total_borrowed'])}
					</Table.Cell>
					<Table.Cell>
						{poolUserDates && poolUserDates[asset]['collateral'].toString()}
						<Collateral
							account={account}
							keyring={keyring}
							disableCollateral={disableCollateral}
							isDisableCollateralResponseRunning={
								isDisableCollateralResponseRunning
							}
							enableAsCollateral={enableAsCollateral}
							isEnableAsCollateralResponseRunning={
								isEnableAsCollateralResponseRunning
							}
							asset={asset}
						/>
					</Table.Cell>
					<Table.Cell>{wrapAsset}</Table.Cell>
					<Table.Cell>
						{usersBalance && formatData(usersBalance[wrapAsset]['free'])}
					</Table.Cell>
				</Table.Row>
			);
		});
	};

	return (
		<div>
			<Grid.Column>
				<h2>User Data</h2>
				<Table celled striped size='small'>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell key='headerAsset'>Asset</Table.HeaderCell>
							<Table.HeaderCell key='headerBalance'>Balance</Table.HeaderCell>
							<Table.HeaderCell key='headerBorrow'>
								Borrow Balance
							</Table.HeaderCell>
							<Table.HeaderCell key='headerCollateral'>
								Collateral
							</Table.HeaderCell>
							<Table.HeaderCell key='headerWrappedAsset'>
								Wrapped Asset
							</Table.HeaderCell>
							<Table.HeaderCell key='headerBalanceWrappedAsset'>
								Balance Wrapped Asset
							</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>{renderRow()}</Table.Body>
				</Table>
			</Grid.Column>
		</div>
	);
}

export default ContentUser;
