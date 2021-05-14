export default function validation(values: any, props: any) {
	const errors: any = {};
	const { walletBalance } = props;
	if (!values.underlyingAmount) {
		errors.underlyingAmount = 'Required';
	} else if (
		typeof walletBalance === 'number' &&
		values.underlyingAmount > walletBalance
	) {
		errors.underlyingAmount = 'Not enough wallet balance';
	}

	return errors;
}
