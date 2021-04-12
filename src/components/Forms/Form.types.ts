export interface BaseFormProps {
	handleSubmit: any;
	isLoading: boolean;
	isAccountReady: boolean;
	valid: boolean;
}

export interface FeedValuesProps extends BaseFormProps {
	pristine: boolean;
}

export interface BorrowCapProps extends BaseFormProps {
	change: any;
}

export interface MaxIdealBalanceProps extends BaseFormProps {
	change: any;
}
