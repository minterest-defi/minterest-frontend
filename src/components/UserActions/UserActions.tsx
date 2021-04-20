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

		redeemUnderlying,
		isRedeemUnderlyingResponseRunning,
		redeemUnderlyingResponse,

		redeemWrapped,
		isRedeemWrappedResponseRunning,
		redeemWrappedResponse,

		repayAll,
		isRepayAllResponseRunning,
		repayAllResponse,

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
				<DepositOperations />
			</div>
			<div>
				<BorrowOperations />
			</div>
			<div>
				<Redeem />
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
				<Repay />
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
