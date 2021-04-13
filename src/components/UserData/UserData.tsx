import React from 'react';
import { Table, Grid, Button } from 'semantic-ui-react';
import { formatData } from '../../util';
import Loading from '../../util/Loading';

interface Props {
	account: string | null;
	keyring: any;
	usersBalance: any;
	poolUserParams: any;
	disableIsCollateral: any;
	isDisableCollateralResponseRunning: any;
	enableIsCollateral: any;
	isEnableAsCollateralResponseRunning: any;
	disableIsCollateralResponse: any;
	enableIsCollateralResponse: any;
	userBalanceUSD: any;
	wrappedCurrencies: string[];
	currencies: string[];
}

function UserData(props: Props) {
	const {
		account,
		keyring,
		usersBalance,
		poolUserParams,
		disableIsCollateral,
		isDisableCollateralResponseRunning,
		enableIsCollateral,
		isEnableAsCollateralResponseRunning,
		disableIsCollateralResponse,
		enableIsCollateralResponse,
		userBalanceUSD,
		wrappedCurrencies,
		currencies,
	} = props;

	const getValue = (balance: string) => {
		if (balance) {
			return Number(formatData(balance)).toFixed(8) + ' $';
		}
		return '-';
	};

	const renderRow = () => {
		return currencies.map((asset, index) => {
			const wrapAsset = wrappedCurrencies[index];

			const poolId = asset;

			const handleDisableIsCollateral = () => {
				disableIsCollateral(account, keyring, poolId);
			};

			const handleEnableIsCollateral = () => {
				enableIsCollateral(account, keyring, poolId);
			};

			const asCollateral = () => {
				if (
					poolUserParams &&
					poolUserParams[asset]['is_collateral'].toString() === 'true'
				) {
					return isDisableCollateralResponseRunning &&
						disableIsCollateralResponse.poolId === asset ? (
						<Loading />
					) : (
						<Button onClick={handleDisableIsCollateral} color='green'>
							Disable
						</Button>
					);
				} else {
					return isEnableAsCollateralResponseRunning &&
						enableIsCollateralResponse.poolId === asset ? (
						<Loading />
					) : (
						<Button
							onClick={handleEnableIsCollateral}
							color='grey'
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
						{poolUserParams &&
							formatData(poolUserParams[asset]['total_borrowed'])}{' '}
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
				<div>
					<div>Supplier balance: {getValue(userBalanceUSD?.total_supply)}</div>
					<div>Borrow balance: {getValue(userBalanceUSD?.total_borrowed)}</div>
				</div>
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
