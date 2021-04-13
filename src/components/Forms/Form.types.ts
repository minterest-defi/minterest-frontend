import { DropdownOption } from '../../util/types';

export interface BaseFormProps {
	handleSubmit: any;
	isLoading: boolean;
	isAccountReady: boolean;
	valid: boolean;
}

export interface FeedValuesProps extends BaseFormProps {
	pristine: boolean;
	currenciesOptions: DropdownOption[];
}

export interface BorrowCapProps extends BaseFormProps {
	change: any;
	currenciesOptions: DropdownOption[];
}

export interface CurrenciesOptionsForm extends BaseFormProps {
	currenciesOptions: DropdownOption[];
}

export interface WrappedCurrenciesOptionsForm extends BaseFormProps {
	wrappedCurrenciesOptions: DropdownOption[];
}
