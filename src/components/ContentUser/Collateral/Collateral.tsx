import React from 'react';
import { Button } from 'semantic-ui-react';
import Loading from '../../../util/Loading';

function Collateral(props: any) {
	const {
		account,
		keyring,
		asset,
		disableCollateral,
		isDisableCollateralResponseRunning,
		enableAsCollateral,
		isEnableAsCollateralResponseRunning,
	} = props;

	const poolId = asset;

	const handleDisableCollateral = () => {
		disableCollateral(account, keyring, poolId);
	};

	const handleEnableAsCollateral = () => {
		enableAsCollateral(account, keyring, poolId);
	};

	if (isDisableCollateralResponseRunning || isEnableAsCollateralResponseRunning)
		return <Loading />;

	return (
		<div>
			<Button onClick={handleDisableCollateral}>Disable</Button>
			<Button onClick={handleEnableAsCollateral}>Enable</Button>
		</div>
	);
}

export default Collateral;
