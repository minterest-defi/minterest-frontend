import React from 'react';
import { Grid, Table } from 'semantic-ui-react';
import Loading from '../../util/Loading';
import { UNDERLYING_ASSETS_TYPES } from '../../util/constants';
// @ts-ignore
import classes from './PoolOperationsStatuses.module.css';
import { PoolOperationsStatusesProps } from '../../containers/AdminPanel/AdminPanel.types';

// TODO refactoring types
export default function PoolOperationsStatuses(
	props: PoolOperationsStatusesProps
) {
	const { pauseKeepers } = props;

	if (!pauseKeepers) return <Loading />;

	const renderRow = () => {
		return UNDERLYING_ASSETS_TYPES.map((asset, index) => {
			return (
				<Table.Row key={index}>
					<Table.Cell>{asset}</Table.Cell>
					<Table.Cell>
						{pauseKeepers && pauseKeepers[asset]['deposit_paused'].toString()}
					</Table.Cell>
					<Table.Cell>
						{pauseKeepers && pauseKeepers[asset]['redeem_paused'].toString()}
					</Table.Cell>
					<Table.Cell>
						{pauseKeepers && pauseKeepers[asset]['borrow_paused'].toString()}
					</Table.Cell>
					<Table.Cell>
						{pauseKeepers && pauseKeepers[asset]['repay_paused'].toString()}
					</Table.Cell>
					<Table.Cell>
						{pauseKeepers && pauseKeepers[asset]['transfer_paused'].toString()}
					</Table.Cell>
				</Table.Row>
			);
		});
	};

	return (
		<div className={classes.poolOperations}>
			<Grid.Column>
				<h2>Pool operations</h2>
				<Table celled striped size='small'>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell key='headerAsset'>Asset</Table.HeaderCell>
							<Table.HeaderCell key='headerDeposit'>Deposit</Table.HeaderCell>
							<Table.HeaderCell key='headerRedeem'>Redeem</Table.HeaderCell>
							<Table.HeaderCell key='headerBorrow'>Borrow</Table.HeaderCell>
							<Table.HeaderCell key='headerRepay'>Repay</Table.HeaderCell>
							<Table.HeaderCell key='headerTreansfer'>
								Transfer
							</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>{renderRow()}</Table.Body>
				</Table>
			</Grid.Column>
		</div>
	);
}
