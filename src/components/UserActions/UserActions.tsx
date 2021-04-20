import React from 'react';

import DepositOperations from './DepositOperations/DepositOperations';
import BorrowOperations from './BorrowOperations/BorrowOperations';
import Redeem from './Redeem/Redeem';
import RedeemUnderlying from './RedeemUnderlying/RedeemUnderlying';
import RedeemWrapped from './RedeemWrapped/RedeemWrapped';
import RepayAll from './RepayAll/RepayAll';
import Repay from './Repay/Repay';
import RepayOnBehalf from './RepayOnBehalf/RepayOnBehalf';
import TransferWrapped from './TransferWrapped/TransferWrapped';

function UserActions() {
	return (
		<div>
			<div>
				<DepositOperations />
			</div>
			<div>
				<BorrowOperations />
			</div>
			<div>
				<Redeem />
			</div>
			<div>
				<RedeemUnderlying />
			</div>
			<div>
				<RedeemWrapped />
			</div>
			<div>
				<RepayAll />
			</div>
			<div>
				<Repay />
			</div>
			<div>
				<RepayOnBehalf />
			</div>
			<div>
				<TransferWrapped />
			</div>
		</div>
	);
}

export default UserActions;
