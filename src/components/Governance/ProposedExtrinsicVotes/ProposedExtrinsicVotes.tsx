import React from 'react';
import './ProposedExtrinsicVotes.scss';

interface Props {
	proposalVoting: any;
}

export default function ProposedExtrinsicVotes(props: Props) {
	const { proposalVoting } = props;

	return (
		<div className='proposed-extrinsic-votes'>
			<div className='info-wrapper'>
				<div className='label'>Threshold:</div>
				<div className='value'>{proposalVoting.threshold}</div>
			</div>
			<div className='info-wrapper'>
				<div className='label'>Ayes:</div>
				<div className='value'>{proposalVoting.ayes.length}</div>
			</div>
			<div className='info-wrapper'>
				<div className='label'>Nays:</div>
				<div className='value'>{proposalVoting.nays.length}</div>
			</div>
			<div className='info-wrapper'>
				<div className='label'>End (block number):</div>
				<div className='value'>{proposalVoting.end}</div>
			</div>
		</div>
	);
}
