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
import { UserActionsProps } from './UserActions.types';

function UserActions(props: UserActionsProps) {
	const {
		keyring,
		account,

		depositUnderlying,
		isDepositUnderlyingResponseRunning,

		borrow,
		isBorrowResponseRunning,

		redeem,
		isRedeemResponseRunning,

		redeemUnderlying,
		isRedeemUnderlyingResponseRunning,

		redeemWrapped,
		isRedeemWrappedResponseRunning,

		repayAll,
		isRepayAllResponseRunning,

		repay,
		isRepayResponseRunning,

		repayOnBehalf,
		isRepayOnBehalfResponseRunning,

		transferWrapped,
		isTransferWrappedResponseRunning,
	} = props;

	return (
		<div>
			<DepositOperations
				keyring={keyring}
				account={account}
				depositUnderlying={depositUnderlying}
				isDepositUnderlyingResponseRunning={isDepositUnderlyingResponseRunning}
			/>
			<BorrowOperations
				keyring={keyring}
				account={account}
				borrow={borrow}
				isBorrowResponseRunning={isBorrowResponseRunning}
			/>
			<Redeem
				keyring={keyring}
				account={account}
				redeem={redeem}
				isRedeemResponseRunning={isRedeemResponseRunning}
			/>
			<RedeemUnderlying
				keyring={keyring}
				account={account}
				redeemUnderlying={redeemUnderlying}
				isRedeemUnderlyingResponseRunning={isRedeemUnderlyingResponseRunning}
			/>
			<RedeemWrapped
				keyring={keyring}
				account={account}
				redeemWrapped={redeemWrapped}
				isRedeemWrappedResponseRunning={isRedeemWrappedResponseRunning}
			/>
			<RepayAll
				keyring={keyring}
				account={account}
				repayAll={repayAll}
				isRepayAllResponseRunning={isRepayAllResponseRunning}
			/>
			<Repay
				keyring={keyring}
				account={account}
				repay={repay}
				isRepayResponseRunning={isRepayResponseRunning}
			/>
			<RepayOnBehalf
				keyring={keyring}
				account={account}
				repayOnBehalf={repayOnBehalf}
				isRepayOnBehalfResponseRunning={isRepayOnBehalfResponseRunning}
			/>
			<TransferWrapped
				keyring={keyring}
				account={account}
				transferWrapped={transferWrapped}
				isTransferWrappedResponseRunning={isTransferWrappedResponseRunning}
			/>
		</div>
	);
}

export default UserActions;
