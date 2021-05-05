import React from 'react';
import { FieldArray, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import Loading from '../../../util/Loading';
import { FeedValuesProps } from '../Form.types';
import FeedValue from './FeedValue/FeedValue';

function FeedValues(props: FeedValuesProps) {
	const {
		handleSubmit,
		isLoading,
		isAccountReady,
		valid,
		pristine,
		currenciesOptions,
	} = props;

	return (
		<form onSubmit={handleSubmit}>
			<h4>Feed Prices</h4>
			<FieldArray
				name='values'
				component={FeedValue}
				currenciesOptions={currenciesOptions}
			/>
			{isLoading ? (
				<Loading />
			) : (
				<Button
					role='submit'
					color={isAccountReady ? 'green' : 'red'}
					disabled={!valid || !isAccountReady || pristine}
				>
					Feed
				</Button>
			)}
		</form>
	);
}

export default reduxForm<{}, FeedValuesProps>({
	form: 'feedValues',
})(FeedValues);
