import React from 'react';
import ReactTooltip from 'react-tooltip';
import { toLocale } from '../../../util';

interface Props {
	balance: number;
	title: string;
}

export default function BalanceTooltip(props: Props) {
	const { balance, title } = props;

	const fullBalance = balance.toFixed(8);

	return (
		<div className='balance-tooltip'>
			<div data-tip={fullBalance + ' $'}>
				<span className='text'>{title}</span> {toLocale(balance)} $
			</div>
			<ReactTooltip />
		</div>
	);
}
