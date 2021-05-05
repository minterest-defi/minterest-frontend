import React from 'react';
import { Grid, Table } from 'semantic-ui-react';
import Loading from '../../util/Loading';
import './ProposalsData.scss';
import { useHistory } from 'react-router-dom';

interface Props {
	proposals: any;
}

function ProposalsData(props: Props) {
	const { proposals } = props;
	const history = useHistory();

	const handleProposalClick = (hash: string) => () => {
		history.push(`/governance-proposal/${hash}`);
	};

	const renderRow = () => {
		return proposals.map((proposal: any, index: any) => {
			return (
				<Table.Row
					key={index}
					onClick={handleProposalClick(proposal.toString())}
				>
					<Table.Cell>{proposal.toHuman()}</Table.Cell>
				</Table.Row>
			);
		});
	};

	if (!proposals) return <Loading />;

	return (
		<div className='proposal-data-list'>
			<Grid.Column>
				<Table celled striped selectable size='small'>
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
