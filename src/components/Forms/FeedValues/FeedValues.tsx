import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import Loading from '../../../util/Loading';
import { FeedValuesProps } from '../Form.types';
import InputField from '../Fields/InputField/InputField';
import DropdownField from '../Fields/DropdownField/DropdownField';
import { required, isDecimal } from '../validators';

const renderFeedValuesForm = ({
	fields,
	meta: { error, submitFailed },
	currenciesOptions,
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
					options={currenciesOptions}
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
				component={renderFeedValuesForm}
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
