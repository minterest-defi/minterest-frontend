import React from 'react';
import { Button } from 'semantic-ui-react';
import Loading from '../../../util/Loading';

export default function ProtocolOperationMode(props) {
	const {
		account,
		keyring,
		whitelistMode,
		switchMode,
		isSwitchModeResponseRunning,
	} = props;

	const handleSwitchMode = () => {
		switchMode(account, keyring);
	};

	if (isSwitchModeResponseRunning) return <Loading />;

	return (
		<div>
			<h2>Protocol Operation Mode</h2>
			<div>{whitelistMode}</div>
			<Button onClick={handleSwitchMode}>
				{whitelistMode === 'false' ? 'On' : 'Off'}
			</Button>
		</div>
	);
}
