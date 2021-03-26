import React from 'react';
// @ts-ignore
import classes from './PriceFeedUpdate.module.css';
import {
	PriceFeedUpdateProps,
	LockPriceFormValues,
	UnlockPriceFormValues,
	FeedValuesFormValues,
} from '../../containers/ProtocolAdmin/ProtocolAdmin.types';

import LockPrice from '../Forms/LockPrice/LockPrice';
import UnlockPrice from '../Forms/UnlockPrice/UnlockPrice';
import FeedValues from '../Forms/FeedValues/FeedValues';

export default function PriceFeedUpdate(props: PriceFeedUpdateProps) {
	const {
		account,
		keyring,

		lockPrice,
		isLockPriceResponseRunning,

		unlockPrice,
		isUnlockPriceResponseRunning,

		feedValues,
		isFeedValuesResponseRunning,
	} = props;

	const handleLockPrice = (form: LockPriceFormValues) => {
		const { currencyId } = form;
		if (account) lockPrice(account, keyring, currencyId);
	};

	const handleUnlockPrice = (form: UnlockPriceFormValues) => {
		const { currencyId } = form;
		if (account) unlockPrice(account, keyring, currencyId);
	};

	const handleFeedValues = (form: FeedValuesFormValues) => {
		const { values } = form;
		if (account) feedValues(account, keyring, values);
	};

	return (
		<div className={classes.wrapper}>
			<LockPrice
				// @ts-ignore
				onSubmit={handleLockPrice}
				// @ts-ignore
				isLoading={isLockPriceResponseRunning}
				isAccountReady={!!account}
			/>
			<UnlockPrice
				// @ts-ignore
				onSubmit={handleUnlockPrice}
				// @ts-ignore
				isLoading={isUnlockPriceResponseRunning}
				isAccountReady={!!account}
			/>
			<FeedValues
				// @ts-ignore
				onSubmit={handleFeedValues}
				// @ts-ignore
				isLoading={isFeedValuesResponseRunning}
				isAccountReady={!!account}
			/>
		</div>
	);
}
