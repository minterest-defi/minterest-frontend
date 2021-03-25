import React from 'react';
import { Button } from 'semantic-ui-react';
import Loading from '../../util/Loading';
import { ProtocolOperationModeProps } from '../../containers/AdminPanel/AdminPanel.types';

export default function ProtocolOperationMode(
	props: ProtocolOperationModeProps
) {
	const {
		account,
		keyring,
		whitelistMode,
		switchMode,
		isSwitchModeResponseRunning,
	} = props;

	const handleSwitchMode = () => {
		if (account) switchMode(account, keyring);
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
