import React from 'react';

interface Props {
	proposals: any;
}

function ProposalsData(props: Props) {
	const { proposals } = props;
	return <div>{proposals}</div>;
}

export default ProposalsData;
