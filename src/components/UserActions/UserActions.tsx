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
		currenciesOptions,
		wrappedCurrenciesOptions,

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
			<div>
				<DepositOperations
					keyring={keyring}
					account={account}
					currenciesOptions={currenciesOptions}
					depositUnderlying={depositUnderlying}
					isDepositUnderlyingResponseRunning={
						isDepositUnderlyingResponseRunning
					}
				/>
			</div>
			<div>
				<BorrowOperations
					keyring={keyring}
					account={account}
					currenciesOptions={currenciesOptions}
					borrow={borrow}
					isBorrowResponseRunning={isBorrowResponseRunning}
				/>
			</div>
			<div>
				<Redeem
					keyring={keyring}
					account={account}
					currenciesOptions={currenciesOptions}
					redeem={redeem}
					isRedeemResponseRunning={isRedeemResponseRunning}
				/>
			</div>
			<div>
				<RedeemUnderlying
					keyring={keyring}
					account={account}
					currenciesOptions={currenciesOptions}
					redeemUnderlying={redeemUnderlying}
					isRedeemUnderlyingResponseRunning={isRedeemUnderlyingResponseRunning}
				/>
			</div>
			<div>
				<RedeemWrapped
					keyring={keyring}
					account={account}
					wrappedCurrenciesOptions={wrappedCurrenciesOptions}
					redeemWrapped={redeemWrapped}
					isRedeemWrappedResponseRunning={isRedeemWrappedResponseRunning}
				/>
			</div>
			<div>
				<RepayAll
					keyring={keyring}
					account={account}
					currenciesOptions={currenciesOptions}
					repayAll={repayAll}
					isRepayAllResponseRunning={isRepayAllResponseRunning}
				/>
			</div>
			<div>
				<Repay
					keyring={keyring}
					account={account}
					currenciesOptions={currenciesOptions}
					repay={repay}
					isRepayResponseRunning={isRepayResponseRunning}
				/>
			</div>
			<div>
				<RepayOnBehalf
					keyring={keyring}
					account={account}
					currenciesOptions={currenciesOptions}
					repayOnBehalf={repayOnBehalf}
					isRepayOnBehalfResponseRunning={isRepayOnBehalfResponseRunning}
				/>
			</div>
			<div>
				<TransferWrapped
					keyring={keyring}
					account={account}
					wrappedCurrenciesOptions={wrappedCurrenciesOptions}
					transferWrapped={transferWrapped}
					isTransferWrappedResponseRunning={isTransferWrappedResponseRunning}
				/>
			</div>
		</div>
	);
}

export default UserActions;
