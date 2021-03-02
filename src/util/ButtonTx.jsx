import React from 'react';
import { Button } from 'semantic-ui-react';

// TODO refactoring
function ButtonTx({ isInvalid, buttonLabel, onClick, color }) {
	return (
		<Button color={color} onClick={onClick} disabled={isInvalid}>
			{buttonLabel}
		</Button>
	);
}

export default ButtonTx;
