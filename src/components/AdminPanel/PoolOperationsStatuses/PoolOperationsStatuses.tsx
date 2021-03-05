import React, { useEffect, useState } from 'react';
import { Table, Grid } from 'semantic-ui-react';

import { UNDERLYING_ASSETS_TYPES } from '../../../util/constants';
// @ts-ignore
import classes from './PoolOperationsStatuses.module.css';
interface Flag {
	currency: string;
	deposit: string;
	redeem: string;
	borrow: string;
	repay: string;
}
// TODO refactoring types
function PoolOperationsStatuses(props) {
	const { poolOperationData } = props;
	const [flag, setFlag] = useState<Flag[]>([]);

	useEffect(() => {
		convertData();
	}, [poolOperationData]);

	const convertData = () => {
		const flagTemp: Flag[] = [];
		poolOperationData.forEach((data, index) => {
			flagTemp.push({
				currency: UNDERLYING_ASSETS_TYPES[index],
				deposit: data.toHuman().deposit_paused,
				redeem: data.toHuman().redeem_paused,
				borrow: data.toHuman().borrow_paused,
				repay: data.toHuman().repay_paused,
			});
		});
		setFlag(flagTemp);
	};

	return (
		<div className={classes.table}>
			<Grid.Column>
				<Table celled striped size='small'>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell key='headerAsset'>Asset</Table.HeaderCell>
							<Table.HeaderCell key='headerDeposit'>Deposit</Table.HeaderCell>
							<Table.HeaderCell key='headerRedeem'>Redeem</Table.HeaderCell>
							<Table.HeaderCell key='headerBorrow'>Borrow</Table.HeaderCell>
							<Table.HeaderCell key='headerRepay'>Repay</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{flag.map((flag, index) => (
							<Table.Row key={index + 123}>
								<Table.Cell key={index}>{flag.currency}</Table.Cell>
								<Table.Cell key={index + 10}>
									{flag.deposit.toString()}
								</Table.Cell>
								<Table.Cell key={index + 100}>
									{flag.redeem.toString()}
								</Table.Cell>
								<Table.Cell key={index + 1000}>
									{flag.borrow.toString()}
								</Table.Cell>
								<Table.Cell key={index + 10000}>
									{flag.repay.toString()}
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			</Grid.Column>
		</div>
	);
}

export default PoolOperationsStatuses;
