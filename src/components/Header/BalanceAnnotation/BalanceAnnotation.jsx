import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Label } from 'semantic-ui-react';

function BalanceAnnotation(props) {
	const { api, account } = props;

	const [accountBalance, setAccountBalance] = useState(0);

	const fetchData = async () => {
		if (account) {
			const data = await api.query.system.account(account);
			const balance = data.data.free.toHuman();
			setAccountBalance(balance);
		} else if (accountBalance !== 0) {
			setAccountBalance(0);
		}
	};
	fetchData();

	return <Label>{accountBalance}</Label>;
}

const mapStateToProps = (state) => ({
	api: state.substrate.api,
});

export default connect(mapStateToProps, null)(BalanceAnnotation);
