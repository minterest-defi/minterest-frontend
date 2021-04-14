import React, { ReactElement } from 'react';
import ReactModal from 'react-modal';

interface Props {
	isOpen: boolean;
	title: string;
	children: ReactElement<any, any>;
	onClose: () => void;
}

const customStyles = {
	content: {
		padding: '20px',
		height: '200px',
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

export default function ClientConfirmActionModal(props: Props) {
	const { isOpen, title, children, onClose } = props;

	return (
		<div>
			<ReactModal
				isOpen={isOpen}
				style={customStyles}
				shouldCloseOnOverlayClick={true}
				onRequestClose={onClose}
			>
				<div>Confirm Action</div>
				<div>{title}</div>
				<div>{children}</div>
			</ReactModal>
		</div>
	);
}
