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
				<div>Method:</div>
				<div>{proposal.method}</div>
			</div>
			<div className='info'>
				<div>Module:</div>
				<div>{proposal.section}</div>
			</div>
			<div className='args'>{renderArgs()}</div>
		</div>
	);
}
