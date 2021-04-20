import { DropdownOption, OperationInfo } from '../../util/types';

export interface BorrowOperationsProps {
	title?: string;
	defaultAssetId?: string;
	info?: Option[];
	keyring: any;
	account: string | null;
	borrow: any;
	isBorrowResponseRunning: boolean;
	currenciesOptions: DropdownOption[];
	borrowResponse: any;
	underlyingAssetId?: string;
	borrowAmount?: string;
	operationInfo?: OperationInfo;
	getOperationInfo: (
		account: string,
		operationType: string,
		params: any[]
	) => Promise<void>;
	resetOperationInfo: () => Promise<void>;
	isFormValid: boolean;
}

export interface Option {
	label: string;
	value: string;
}

export interface DepositOperationsProps {
	title?: string;
	defaultAssetId?: string;
	info?: Option[];
	keyring: any;
	account: string | null;
	currenciesOptions: DropdownOption[];
	depositUnderlying: any;
	isDepositUnderlyingResponseRunning: boolean;
	depositUnderlyingResponse: any;
	underlyingAssetId?: string;
	underlyingAmount?: string;
	operationInfo?: OperationInfo;
	getOperationInfo: (
		account: string,
		operationType: string,
		params: any[]
	) => Promise<void>;
	resetOperationInfo: () => Promise<void>;
	isFormValid: boolean;
}

export interface SendBorrowFormValues {
	underlyingAssetId: string;
	borrowAmount: string;
}

export interface DepositUnderlyingFormValues {
	underlyingAssetId: string;
	underlyingAmount: string;
}

export interface RedeemProps {
	title?: string;
	defaultAssetId?: string;
	info?: Option[];
	keyring: any;
	account: string | null;
	redeem: any;
	isRedeemResponseRunning: boolean;
	currenciesOptions: DropdownOption[];
	redeemResponse: any;
	underlyingAssetId?: string;
	operationInfo?: OperationInfo;
	getOperationInfo: (
		account: string,
		operationType: string,
		params: any[]
	) => Promise<void>;
	resetOperationInfo: () => Promise<void>;
	isFormValid: boolean;
}

export interface RedeemFormValues {
	underlyingAssetId: string;
}

export interface RedeemUnderlyingProps {
	title?: string;
	defaultAssetId?: string;
	info?: Option[];
	keyring: any;
	account: string | null;
	currenciesOptions: DropdownOption[];
	redeemUnderlying: any;
	isRedeemUnderlyingResponseRunning: boolean;
	redeemUnderlyingResponse: any;
	underlyingAssetId?: string;
	underlyingAmount?: string;
	operationInfo?: OperationInfo;
	getOperationInfo: (
		account: string,
		operationType: string,
		params: any[]
	) => Promise<void>;
	resetOperationInfo: () => Promise<void>;
	isFormValid: boolean;
}

export interface RedeemUnderlyingFormValues {
	underlyingAssetId: string;
	underlyingAmount: string;
}

export interface RedeemWrappedProps {
	title?: string;
	keyring: any;
	account: string | null;
	redeemWrapped: any;
	isRedeemWrappedResponseRunning: boolean;
	wrappedCurrenciesOptions: DropdownOption[];
	redeemWrappedResponse: any;
	wrappedId?: string;
	wrappedAmount?: string;
	operationInfo?: OperationInfo;
	getOperationInfo: (
		account: string,
		operationType: string,
		params: any[]
	) => Promise<void>;
	resetOperationInfo: () => Promise<void>;
	isFormValid: boolean;
}

export interface RedeemWrappedFormValues {
	wrappedId: string;
	wrappedAmount: string;
}

export interface RepayProps {
	title?: string;
	defaultAssetId?: string;
	info?: Option[];
	keyring: any;
	account: string | null;
	currenciesOptions: DropdownOption[];
	repay: any;
	isRepayResponseRunning: boolean;
	repayResponse: any;
	underlyingAssetId?: string;
	repayAmount?: string;
	operationInfo?: OperationInfo;
	getOperationInfo: (
		account: string,
		operationType: string,
		params: any[]
	) => Promise<void>;
	resetOperationInfo: () => Promise<void>;
	isFormValid: boolean;
}

export interface RepayFormValues {
	underlyingAssetId: string;
	repayAmount: string;
}

export interface RepayAllProps {
	title?: string;
	keyring: any;
	account: string | null;
	currenciesOptions: DropdownOption[];
	repayAll: any;
	isRepayAllResponseRunning: boolean;
	repayAllResponse: any;
	underlyingAssetId?: string;
	operationInfo?: OperationInfo;
	getOperationInfo: (
		account: string,
		operationType: string,
		params: any[]
	) => Promise<void>;
	resetOperationInfo: () => Promise<void>;
	isFormValid: boolean;
}

export interface RepayAllFormValues {
	underlyingAssetId: string;
}

export interface RepayOnBehalfProps {
	title?: string;
	keyring: any;
	account: string | null;
	repayOnBehalf: any;
	isRepayOnBehalfResponseRunning: boolean;
	currenciesOptions: DropdownOption[];
	repayOnBehalfResponse: any;
	underlyingAssetId?: string;
	borrower?: string;
	repayAmount?: string;
	operationInfo?: OperationInfo;
	getOperationInfo: (
		account: string,
		operationType: string,
		params: any[]
	) => Promise<void>;
	resetOperationInfo: () => Promise<void>;
	isFormValid: boolean;
}

export interface RepayOnBehalfFormValues {
	underlyingAssetId: string;
	borrower: string;
	repayAmount: string;
}

export interface TransferWrappedProps {
	title?: string;
	keyring: any;
	account: string | null;
	transferWrapped: any;
	isTransferWrappedResponseRunning: boolean;
	wrappedCurrenciesOptions: DropdownOption[];
	transferWrappedResponse: any;
	wrappedId?: string;
	receiver?: string;
	convertedAmount?: string;
	operationInfo?: OperationInfo;
	getOperationInfo: (
		account: string,
		operationType: string,
		params: any[]
	) => Promise<void>;
	resetOperationInfo: () => Promise<void>;
	isFormValid: boolean;
}

export interface TransferWrappedFormValues {
	receiver: string;
	wrappedId: string;
	convertedAmount: string;
}
