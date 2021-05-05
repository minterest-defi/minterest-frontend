import React, { useState } from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import {
	DropdownOption,
	ExtrinsicConfig,
	Metadata,
	State,
} from '../../../util/types';
import ProposeExtrinsic from '../../Forms/ProposeExtrinsic/ProposeExtrinsic';
import { proposeExtrinsic } from '../../../actions/governanceUpdates';
import { getProposals } from '../../../actions/governanceData';
import ClientConfirmActionModal from '../../Common/ClientConfirmActionModal/ClientConfirmActionModal';
import { Button } from 'semantic-ui-react';
import './ProposeExtrinsicBlock.scss';
import { useAPIResponse } from '../../../util';

interface Props {
	metadata: Metadata;
	proposeExtrinsic: (
		keyring: any,
		account: string,
		threshold: number,
		extrinsicConfig: ExtrinsicConfig,
		lengthBound?: number
	) => Promise<void>;
	keyring: any;
	currentAccount: string;
	module?: string;
	extrinsicName?: string;
	currenciesOptions: DropdownOption[];
	wrappedCurrenciesOptions: DropdownOption[];
	isProposeExtrinsicRequestRunning: boolean;
	proposeExtrinsicResponse: any;
	getProposals: () => Promise<void>;
}

function ProposeExtrinsicBlock(props: Props) {
	const {
		metadata,
		proposeExtrinsic,
		module,
		extrinsicName,
		currentAccount,
		currenciesOptions,
		wrappedCurrenciesOptions,
		keyring,
		isProposeExtrinsicRequestRunning,
		proposeExtrinsicResponse,
		getProposals,
	} = props;

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const moduleNamesOptions = metadata.modules.map((mod) => ({
		key: mod.name,
		text: mod.name,
		value: mod.name,
	}));

	const selectedModule = metadata.modules.find((mod) => mod.name === module);

	const moduleExtrinsicsList = selectedModule
		? selectedModule.extrinsics.map((ext) => ({
				key: ext.name,
				text: ext.name,
				value: ext.name,
		  }))
		: [];

	const selectedExtrinsic = selectedModule
		? selectedModule.extrinsics.find((ext) => ext.name === extrinsicName)
		: null;

	const extrinsicArgs = selectedExtrinsic ? selectedExtrinsic.args : [];

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	const handleSubmit = (form: any) => {
		const { threshold, module, extrinsicName, extrinsicParams } = form;

		proposeExtrinsic(keyring, currentAccount, threshold, {
			module,
			extrinsicName,
			extrinsicParams,
		});
	};

	const showError = (message: string) => alert(message);

	const handleSuccess = () => {
		getProposals();
		closeModal();
	};

	useAPIResponse(
		[isProposeExtrinsicRequestRunning, proposeExtrinsicResponse],
		handleSuccess,
		showError
	);

	const metadataOptions = {
		moduleNamesOptions,
		moduleExtrinsicsList,
		extrinsicArgs,
	};

	return (
		<div className='propose-extrinsic-block'>
			<Button onClick={openModal} disabled={!currentAccount}>
				Propose Extrinsic
			</Button>
			<ClientConfirmActionModal
				isOpen={isModalOpen}
				title='Propose Extrinsic'
				onClose={closeModal}
				className='propose-extrinsic'
			>
				{/*@ts-ignore*/}
				<ProposeExtrinsic
					onSubmit={handleSubmit}
					metadataOptions={metadataOptions}
					isAccountReady={!!currentAccount}
					currenciesOptions={currenciesOptions}
					wrappedCurrenciesOptions={wrappedCurrenciesOptions}
					closeModal={closeModal}
					isLoading={isProposeExtrinsicRequestRunning}
				/>
			</ClientConfirmActionModal>
		</div>
	);
}

const selector = formValueSelector('proposeExtrinsic');

const mapStateToProps = (state: State) => ({
	keyring: state.account.keyring,
	currentAccount: state.account.currentAccount,
	module: selector(state, 'module'),
	extrinsicName: selector(state, 'extrinsicName'),
	currenciesOptions: state.protocolData.currenciesOptions,
	wrappedCurrenciesOptions: state.protocolData.wrappedCurrenciesOptions,
	isProposeExtrinsicRequestRunning:
		state.governanceUpdates.isProposeExtrinsicRequestRunning,
	proposeExtrinsicResponse: state.governanceUpdates.proposeExtrinsicResponse,
});

const mapDispatchToProps = {
	proposeExtrinsic,
	getProposals,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
	// @ts-ignore
)(ProposeExtrinsicBlock);
