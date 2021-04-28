import React from 'react';
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
}

function ProposeExtrinsicBlock(props: Props) {
	const {
		metadata,
		proposeExtrinsic,
		module,
		extrinsicName,
		currentAccount,
		currenciesOptions,
		keyring,
	} = props;

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

	// TODO
	const handleSubmit = (form: any) => {
		const { threshold, module, extrinsicName, extrinsicParams } = form;
		console.log(form);
		proposeExtrinsic(keyring, currentAccount, threshold, {
			module,
			extrinsicName,
			extrinsicParams,
		});
	};

	const metadataOptions = {
		moduleNamesOptions,
		moduleExtrinsicsList,
		extrinsicArgs,
	};

	return (
		<div className='propose-extrinsic-block'>
			Test + FORM
			{/*@ts-ignore*/}
			<ProposeExtrinsic
				onSubmit={handleSubmit}
				metadataOptions={metadataOptions}
				isAccountReady={!!currentAccount}
				currenciesOptions={currenciesOptions}
			/>
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
});

const mapDispatchToProps = {
	proposeExtrinsic,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
	// @ts-ignore
)(ProposeExtrinsicBlock);
