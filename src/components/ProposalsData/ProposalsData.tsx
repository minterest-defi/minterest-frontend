import React from 'react';
import { Grid, Table, Button } from 'semantic-ui-react';
import Loading from '../../util/Loading';
import './ProposalsData.scss';

interface Props {
	proposals: any;
}

function ProposalsData(props: Props) {
	const { proposals } = props;

	if (!proposals) return <Loading />;

	const renderRow = () => {
		return proposals.map((proposal: any, index: any) => {
			return (
				<Table.Row key={index}>
					<Table.Cell>{proposal.toHuman()}</Table.Cell>
					<Table.Cell>
						<Button>Vote</Button>
					</Table.Cell>
				</Table.Row>
			);
		});
	};

	return (
		<div className='proposal-data-list'>
			<Grid.Column>
				<Table celled striped size='small'>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell key='Proposal' colSpan='2'>
								Proposals
							</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>{renderRow()}</Table.Body>
				</Table>
			</Grid.Column>
		</div>
	);
}

export default ProposalsData;
