import { Argument, DropdownOption } from '../../util/types';

export interface BaseFormProps {
	handleSubmit: any;
	isLoading: boolean;
	isAccountReady: boolean;
	valid: boolean;
	onCancel?: () => void;
}

export interface FeedValuesProps extends BaseFormProps {
	pristine: boolean;
	currenciesOptions: DropdownOption[];
}

export interface ProposeExtrinsicFormProps extends BaseFormProps {
	metadataOptions: {
		moduleNamesOptions: DropdownOption[];
		moduleExtrinsicsList: DropdownOption[];
		extrinsicArgs: Argument[];
	};
	currenciesOptions: DropdownOption[];
	wrappedCurrenciesOptions: DropdownOption[];
	closeModal: () => void;
}

export interface BorrowCapProps extends BaseFormProps {
	change: any;
	currenciesOptions: DropdownOption[];
}

export interface CurrenciesOptionsForm extends BaseFormProps {
	currenciesOptions: DropdownOption[];
}

export interface SendBorrowForm extends CurrenciesOptionsForm {
	formActionInfoBlock: any;
	disableCurrencySelection: boolean;
	availableToBorrow: any;
}

export interface SendDepositUnderlyingFormProps extends CurrenciesOptionsForm {
	formActionInfoBlock: any;
	disableCurrencySelection: boolean;
}

export interface RepayFormProps extends CurrenciesOptionsForm {
	handleAllCase: boolean;
	formActionInfoBlock: any;
	disableCurrencySelection: boolean;
}

export interface SendRedeemUnderlyingFormProps extends CurrenciesOptionsForm {
	handleAllCase: boolean;
	formActionInfoBlock: any;
	disableCurrencySelection: boolean;
}

export interface WrappedCurrenciesOptionsForm extends BaseFormProps {
	wrappedCurrenciesOptions: DropdownOption[];
}
