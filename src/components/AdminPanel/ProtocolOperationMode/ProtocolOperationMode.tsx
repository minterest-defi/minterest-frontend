import React from 'react';

export default function ProtocolOperationMode(props) {
	const { whitelistMode } = props;

	return (
		<div>
			<h2>Protocol Operation Mode</h2>
			<div>{whitelistMode}</div>
		</div>
	);
}
