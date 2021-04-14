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
		depositUnderlyingResponse,

		borrow,
		isBorrowResponseRunning,
		borrowResponse,

		redeem,
		isRedeemResponseRunning,
		redeemResponse,

		redeemUnderlying,
		isRedeemUnderlyingResponseRunning,
		redeemUnderlyingResponse,

		redeemWrapped,
		isRedeemWrappedResponseRunning,
		redeemWrappedResponse,

		repayAll,
		isRepayAllResponseRunning,
		repayAllResponse,

		repay,
		isRepayResponseRunning,
		repayResponse,

		repayOnBehalf,
		isRepayOnBehalfResponseRunning,
		repayOnBehalfResponse,

		transferWrapped,
		isTransferWrappedResponseRunning,
		transferWrappedResponse,
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
					depositUnderlyingResponse={depositUnderlyingResponse}
				/>
			</div>
			<div>
				<BorrowOperations
					keyring={keyring}
					account={account}
					currenciesOptions={currenciesOptions}
					borrow={borrow}
					isBorrowResponseRunning={isBorrowResponseRunning}
					borrowResponse={borrowResponse}
				/>
			</div>
			<div>
				<Redeem
					keyring={keyring}
					account={account}
					currenciesOptions={currenciesOptions}
					redeem={redeem}
					isRedeemResponseRunning={isRedeemResponseRunning}
					redeemResponse={redeemResponse}
				/>
			</div>
			<div>
				<RedeemUnderlying
					keyring={keyring}
					account={account}
					currenciesOptions={currenciesOptions}
					redeemUnderlying={redeemUnderlying}
					isRedeemUnderlyingResponseRunning={isRedeemUnderlyingResponseRunning}
					redeemUnderlyingResponse={redeemUnderlyingResponse}
				/>
			</div>
			<div>
				<RedeemWrapped
					keyring={keyring}
					account={account}
					wrappedCurrenciesOptions={wrappedCurrenciesOptions}
					redeemWrapped={redeemWrapped}
					isRedeemWrappedResponseRunning={isRedeemWrappedResponseRunning}
					redeemWrappedResponse={redeemWrappedResponse}
				/>
			</div>
			<div>
				<RepayAll
					keyring={keyring}
					account={account}
					currenciesOptions={currenciesOptions}
					repayAll={repayAll}
					isRepayAllResponseRunning={isRepayAllResponseRunning}
					repayAllResponse={repayAllResponse}
				/>
			</div>
			<div>
				<Repay
					keyring={keyring}
					account={account}
					currenciesOptions={currenciesOptions}
					repay={repay}
					isRepayResponseRunning={isRepayResponseRunning}
					repayResponse={repayResponse}
				/>
			</div>
			<div>
				<RepayOnBehalf
					keyring={keyring}
					account={account}
					currenciesOptions={currenciesOptions}
					repayOnBehalf={repayOnBehalf}
					isRepayOnBehalfResponseRunning={isRepayOnBehalfResponseRunning}
					repayOnBehalfResponse={repayOnBehalfResponse}
				/>
			</div>
			<div>
				<TransferWrapped
					keyring={keyring}
					account={account}
					wrappedCurrenciesOptions={wrappedCurrenciesOptions}
					transferWrapped={transferWrapped}
					isTransferWrappedResponseRunning={isTransferWrappedResponseRunning}
					transferWrappedResponse={transferWrappedResponse}
				/>
			</div>
		</div>
	);
}

export default UserActions;
