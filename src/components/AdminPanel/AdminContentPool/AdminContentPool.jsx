import React from 'react';
import { Table, Grid } from 'semantic-ui-react';
import { UNDERLYING_ASSETS_TYPES } from '../../../util/constants';
import TotalInsuranceRow from './TotalInsurance/TotalInsuranceRow';

function AdminContentPool() {
	return (
		<Grid.Column>
			<Table celled striped size='small'>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell key='headerAsset'>Asset</Table.HeaderCell>
						<Table.HeaderCell key='headerBalance'>
							Total Insurance for Pool
						</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{UNDERLYING_ASSETS_TYPES.map((asset, index) => (
						<Table.Row key={index + 123}>
							<Table.Cell key={index}>{asset}</Table.Cell>
							<Table.Cell key={index + 10}>
								<TotalInsuranceRow asset={asset} />
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</Grid.Column>
	);
}

export default AdminContentPool;
