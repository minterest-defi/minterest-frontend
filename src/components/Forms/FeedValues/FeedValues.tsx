import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';

import { UNDERLYING_ASSETS_TYPES } from '../../../util/constants';
import Loading from '../../../util/Loading';

import InputField from '../Fields/InputField/InputField';
import DropdownField from '../Fields/DropdownField/DropdownField';

import { required, isDecimal } from '../validators';

interface FeedValuesProps {
	handleSubmit: any;
	isLoading: boolean;
	isAccountReady: boolean;
	valid: boolean;
	pristine: boolean;
}

const assets = UNDERLYING_ASSETS_TYPES.map((currency) => ({
	key: currency,
	text: currency,
	value: currency,
}));

const renderFeedValuesForm = ({
	fields,
	meta: { error, submitFailed },
}: any) => (
	<ul>
		<div>
			<Button type='button' onClick={() => fields.push({})}>
				Add Form
			</Button>
			{submitFailed && error && <span>{error}</span>}
		</div>
		{fields.map((value: any, index: number) => (
			<div key={index}>
				<h4>Form #{index + 1}</h4>
				<Field
					name={`${value}.currencyId`}
					component={DropdownField}
					options={assets}
					placeholder='Asset'
					validate={required}
				/>
				<Field
					name={`${value}.price`}
					component={InputField}
					placeholder='Enter the price'
					validate={[required, isDecimal]}
				/>
				<Button type='button' onClick={() => fields.remove(index)}>
					Delete Form
				</Button>
			</div>
		))}
	</ul>
);

function FeedValues(props: FeedValuesProps) {
	const { handleSubmit, isLoading, isAccountReady, valid, pristine } = props;

	return (
		<form onSubmit={handleSubmit}>
			<h4>Feed the external value</h4>
			<FieldArray name='values' component={renderFeedValuesForm} />
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

export default reduxForm({
	form: 'feedValues',
	// @ts-ignore
})(FeedValues);
