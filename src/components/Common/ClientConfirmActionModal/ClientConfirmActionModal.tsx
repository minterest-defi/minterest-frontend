import React, { ReactElement } from 'react';
import ReactModal from 'react-modal';
import './ClientConfirmActionModal.scss';

interface Props {
	isOpen: boolean;
	title: string;
	children: ReactElement<any, any>;
	onClose: () => void;
}

export default function ClientConfirmActionModal(props: Props) {
	const { isOpen, title, children, onClose } = props;

	return (
		<ReactModal
			isOpen={isOpen}
			shouldCloseOnOverlayClick={true}
			onRequestClose={onClose}
			className='modal'
		>
			<div className='block-header'>Confirm {title}</div>
			<div className='child'>{children}</div>
		</ReactModal>
	);
}
