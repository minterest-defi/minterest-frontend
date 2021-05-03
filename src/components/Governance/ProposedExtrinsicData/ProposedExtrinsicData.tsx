import React from 'react';

import './ProposedExtrinsicData.scss';

interface Props {
	proposal: any;
}

export default function ProposedExtrinsicData(props: Props) {
	const { proposal } = props;

	// TODO types
	const renderArgs = () => {
		return proposal.args.map((arg: any, index: number) => (
			<div key={index} className='arg'>
				{JSON.stringify(arg)}
			</div>
		));
	};

	return (
		<div className='proposed-extrinsic-data'>
			<div className='info'>
				<div className='label'>Method:</div>
				<div className='value'>{proposal.method}</div>
			</div>
			<div className='info'>
				<div className='label'>Module:</div>
				<div className='value'>{proposal.section}</div>
			</div>
			<div className='args'>
				<div className='label'>Args:</div>
				{renderArgs()}
			</div>
		</div>
	);
}
