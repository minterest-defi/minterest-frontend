import { DropdownOption } from '../../util/types';

export interface BorrowOperationsProps {
	keyring: any;
	account: string | null;
	borrow: any;
	isBorrowResponseRunning: boolean;
	currenciesOptions: DropdownOption[];
}

export interface DepositOperationsProps {
	keyring: any;
	account: string | null;
	currenciesOptions: DropdownOption[];
	depositUnderlying: any;
	isDepositUnderlyingResponseRunning: boolean;
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
	keyring: any;
	account: string | null;
	redeem: any;
	isRedeemResponseRunning: boolean;
	currenciesOptions: DropdownOption[];
}

export interface RedeemFormValues {
	underlyingAssetId: string;
}

export interface RedeemUnderlyingProps {
	keyring: any;
	account: string | null;
	currenciesOptions: DropdownOption[];
	redeemUnderlying: any;
	isRedeemUnderlyingResponseRunning: boolean;
}

export interface RedeemUnderlyingFormValues {
	underlyingAssetId: string;
	underlyingAmount: string;
}

export interface RedeemWrappedProps {
	keyring: any;
	account: string | null;
	redeemWrapped: any;
	isRedeemWrappedResponseRunning: boolean;
	wrappedCurrenciesOptions: DropdownOption[];
}

export interface RedeemWrappedFormValues {
	wrappedId: string;
	wrappedAmount: string;
}

export interface RepayProps {
	keyring: any;
	account: string | null;
	currenciesOptions: DropdownOption[];
	repay: any;
	isRepayResponseRunning: boolean;
}

export interface RepayFormValues {
	underlyingAssetId: string;
	repayAmount: string;
}

export interface RepayAllProps {
	keyring: any;
	account: string | null;
	currenciesOptions: DropdownOption[];
	repayAll: any;
	isRepayAllResponseRunning: boolean;
}

export interface RepayAllFormValues {
	underlyingAssetId: string;
}

export interface RepayOnBehalfProps {
	keyring: any;
	account: string | null;
	repayOnBehalf: any;
	isRepayOnBehalfResponseRunning: boolean;
	currenciesOptions: DropdownOption[];
}

export interface RepayOnBehalfFormValues {
	underlyingAssetId: string;
	borrower: string;
	repayAmount: string;
}

export interface TransferWrappedProps {
	keyring: any;
	account: string | null;
	transferWrapped: any;
	isTransferWrappedResponseRunning: boolean;
	wrappedCurrenciesOptions: DropdownOption[];
}

export interface TransferWrappedFormValues {
	receiver: string;
	wrappedId: string;
	convertedAmount: string;
}

export interface UserActionsProps {
	keyring: any;
	account: string | null;
	currenciesOptions: DropdownOption[];
	wrappedCurrenciesOptions: DropdownOption[];

	depositUnderlying: any;
	isDepositUnderlyingResponseRunning: boolean;

	borrow: any;
	isBorrowResponseRunning: boolean;

	redeem: any;
	isRedeemResponseRunning: boolean;

	redeemUnderlying: any;
	isRedeemUnderlyingResponseRunning: boolean;

	redeemWrapped: any;
	isRedeemWrappedResponseRunning: boolean;

	repayAll: any;
	isRepayAllResponseRunning: boolean;

	repay: any;
	isRepayResponseRunning: boolean;

	repayOnBehalf: any;
	isRepayOnBehalfResponseRunning: boolean;

	transferWrapped: any;
	isTransferWrappedResponseRunning: boolean;
}
