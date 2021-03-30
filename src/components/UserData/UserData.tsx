import React from 'react';
import { Table, Grid, Button } from 'semantic-ui-react';
import {
	UNDERLYING_ASSETS_TYPES,
	WRAP_TOKEN_TYPES,
} from '../../util/constants';
import { formatData } from '../../util';
import Loading from '../../util/Loading';

interface Props {
	account: string | null;
	keyring: any;
	usersBalance: any;
	poolUserDates: any;
	disableCollateral: any;
	isDisableCollateralResponseRunning: any;
	enableAsCollateral: any;
	isEnableAsCollateralResponseRunning: any;
	disableCollateralResponse: any;
	enableAsCollateralResponse: any;
}

function UserData(props: Props) {
	const {
		account,
		keyring,
		usersBalance,
		poolUserDates,
		disableCollateral,
		isDisableCollateralResponseRunning,
		enableAsCollateral,
		isEnableAsCollateralResponseRunning,
		disableCollateralResponse,
		enableAsCollateralResponse,
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

			const asCollateral = () => {
				if (
					poolUserDates &&
					poolUserDates[asset]['collateral'].toString() === 'true'
				) {
					return isDisableCollateralResponseRunning &&
						disableCollateralResponse.poolId === asset ? (
						<Loading />
					) : (
						<Button onClick={handleDisableCollateral} color='green'>
							Disable
						</Button>
					);
				} else {
					return isEnableAsCollateralResponseRunning &&
						enableAsCollateralResponse.poolId === asset ? (
						<Loading />
					) : (
						<Button
							onClick={handleEnableAsCollateral}
							color='red'
							disabled={!account}
						>
							Enable
						</Button>
					);
				}
			};

			return (
				<Table.Row key={index}>
					<Table.Cell>
						{usersBalance && formatData(usersBalance[asset]['free'])} {asset}
					</Table.Cell>
					<Table.Cell>
						{usersBalance && formatData(usersBalance[wrapAsset]['free'])}{' '}
						{wrapAsset}
					</Table.Cell>
					<Table.Cell>
						{poolUserDates &&
							formatData(poolUserDates[asset]['total_borrowed'])}{' '}
						{asset}
					</Table.Cell>
					<Table.Cell>{asCollateral()}</Table.Cell>
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
							<Table.HeaderCell key='ExternalBalance'>
								External Balance
							</Table.HeaderCell>
							<Table.HeaderCell key='DepositValue'>
								Deposit Value
							</Table.HeaderCell>
							<Table.HeaderCell key='BorrowValue'>
								Borrow Value
							</Table.HeaderCell>
							<Table.HeaderCell key='AsCollateral'>
								As Collateral
							</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>{renderRow()}</Table.Body>
				</Table>
			</Grid.Column>
		</div>
	);
}

export default UserData;
