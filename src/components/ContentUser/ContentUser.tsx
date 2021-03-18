import React from 'react';
import { Table, Grid, Button } from 'semantic-ui-react';
import {
	UNDERLYING_ASSETS_TYPES,
	WRAP_TOKEN_TYPES,
} from '../../util/constants';
import { formatData } from '../../util';
import Loading from '../../util/Loading';

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

			const poolId = asset;

			const handleDisableCollateral = () => {
				disableCollateral(account, keyring, poolId);
			};

			const handleEnableAsCollateral = () => {
				enableAsCollateral(account, keyring, poolId);
			};

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
						{isDisableCollateralResponseRunning ? (
							<Loading />
						) : (
							<Button onClick={handleDisableCollateral}>Disable</Button>
						)}
						{isEnableAsCollateralResponseRunning ? (
							<Loading />
						) : (
							<Button onClick={handleEnableAsCollateral}>Enable</Button>
						)}
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
