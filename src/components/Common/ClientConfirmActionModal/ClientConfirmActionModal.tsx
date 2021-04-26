import React, { ReactElement } from 'react';
import ReactModal from 'react-modal';
import './ClientConfirmActionModal.scss';
import { Option } from '../../UserActions/UserActions.types';
import { formatData, toPlainString } from '../../../util';

interface Props {
	isOpen: boolean;
	title: string;
	children: ReactElement<any, any>;
	onClose: () => void;
	fee?: string;
	newLoanToValue?: string;
	info?: Option[];
}

export default function ClientConfirmActionModal(props: Props) {
	const { isOpen, title, children, onClose, fee, info, newLoanToValue } = props;

	return (
		<ReactModal
			isOpen={isOpen}
			shouldCloseOnOverlayClick={true}
			onRequestClose={onClose}
			className='modal'
		>
			<div className='block-header'>Confirm {title}</div>
			<div className='block-fee'>
				<div className='label'>Estimated gas fee:</div>
				<div className='value'>
					<span className='bold'>
						{fee ? toPlainString(formatData(fee)) : 'N/A'}
					</span>
				</div>
			</div>
			<div className='block-info'>
				<div className='label'>New loan to value:</div>
				<div className='value'>
					<span className='bold'>
						{newLoanToValue ? newLoanToValue : 'N/A'}
					</span>
				</div>
			</div>
			{info &&
				info.map((infoBlock) => (
					<div className='block-info' key={infoBlock.label}>
						<div className='label'>{infoBlock.label}</div>
						<div className='value'>
							<span className='bold'>{infoBlock.value}</span>
						</div>
					</div>
				))}

			<div className='child'>{children}</div>
		</ReactModal>
	);
}
