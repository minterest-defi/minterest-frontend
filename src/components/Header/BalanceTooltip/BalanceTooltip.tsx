import React from 'react';
import ReactTooltip from 'react-tooltip';

interface Props {
	balance: number;
	title: string;
}

export default function BalanceTooltip(props: Props) {
	const { balance, title } = props;

	const fullBalance = balance.toFixed(8);
	const shortBalance = balance.toFixed(2);

	return (
		<div className='balance-tooltip'>
			<div data-tip={fullBalance + ' $'}>
				<span className='text'>{title}</span> {shortBalance} $
			</div>
			<ReactTooltip />
		</div>
	);
}
