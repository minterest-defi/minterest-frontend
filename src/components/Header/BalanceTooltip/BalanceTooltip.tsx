import React from 'react';
import ReactTooltip from 'react-tooltip';
import { toLocale } from '../../../util';
import './BalanceTooltip.scss';

interface Props {
	balance: number;
	title: string;
	currency: string;
}

export default function BalanceTooltip(props: Props) {
	const { balance, title, currency } = props;

	const fullBalance = balance.toFixed(8);

	return (
		<div className='balance-tooltip'>
			<div data-tip={fullBalance + ` ${currency}`}>
				<span className='text'>{title}</span> {currency}
				{toLocale(balance)}
			</div>
			<ReactTooltip />
		</div>
	);
}
