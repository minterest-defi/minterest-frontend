import React, { ReactElement } from 'react';
import ReactModal from 'react-modal';
import './ClientConfirmActionModal.scss';

interface Props {
	isOpen: boolean;
	title: string;
	children: ReactElement<any, any>;
	onClose: () => void;
	fee?: string;
}

export default function ClientConfirmActionModal(props: Props) {
	const { isOpen, title, children, onClose, fee } = props;

	return (
		<ReactModal
			isOpen={isOpen}
			shouldCloseOnOverlayClick={true}
			onRequestClose={onClose}
			className='modal'
		>
			<div className='block-header'>Confirm Action</div>
			<div className='title'>{title}</div>
			<div className='block-fee'>
				<div className='label'>Estimated fee:</div>
				<div className='value'>
					<span className='bold'>{fee}</span>
				</div>
			</div>
			<div className='child'>{children}</div>
		</ReactModal>
	);
}
