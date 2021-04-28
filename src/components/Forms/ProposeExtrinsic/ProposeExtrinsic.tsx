import React from 'react';
import { Button } from 'semantic-ui-react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import Loading from '../../../util/Loading';
import { FORM_FIELD_TYPES, POOL_OPERATIONS } from '../../../util/constants';
import { ProposeExtrinsicFormProps } from '../Form.types';
import InputField from '../Fields/InputField/InputField';
import FeedValue from '../FeedValues/FeedValue/FeedValue';
import { required } from '../validators';
import DropdownField from '../Fields/DropdownField/DropdownField';
import './ProposeExtrinsic.scss';
import { Argument } from '../../../util/types';
import CurrencyField from '../Fields/CurrencyField/CurrencyField';

function ProposeExtrinsic(props: ProposeExtrinsicFormProps) {
	const {
		handleSubmit,
		isLoading,
		isAccountReady,
		valid,
		metadataOptions: {
			moduleNamesOptions,
			moduleExtrinsicsList,
			extrinsicArgs,
		},
		currenciesOptions,
		wrappedCurrenciesOptions,
	} = props;

	const renderArgsFields = () => extrinsicArgs.map(getFieldByType);

	const getFieldByType = (arg: Argument, index: number) => {
		const { type, name } = arg;

		switch (type) {
			//INPUT
			case FORM_FIELD_TYPES['Option<Balance>']:
			case FORM_FIELD_TYPES.LookupSource:
			case FORM_FIELD_TYPES.Balance:
			case FORM_FIELD_TYPES.Rate:
			case FORM_FIELD_TYPES.u128:
			case FORM_FIELD_TYPES.u8:
			case FORM_FIELD_TYPES.u32: {
				return (
					<Field
						key={name}
						name={`extrinsicParams[${index}]`}
						component={InputField}
						placeholder={name}
						validate={[required]}
					/>
				);
			}
			case FORM_FIELD_TYPES.CurrencyId: {
				return (
					<Field
						key={name}
						name={`extrinsicParams[${index}]`}
						component={CurrencyField}
						currenciesOptions={currenciesOptions}
						wrappedCurrenciesOptions={wrappedCurrenciesOptions}
						validate={[required]}
					/>
				);
			}
			case FORM_FIELD_TYPES.Operation: {
				const operations = POOL_OPERATIONS.map((action) => ({
					key: action,
					text: action,
					value: action,
				}));
				return (
					<Field
						key={name}
						name={`extrinsicParams[${index}]`}
						component={DropdownField}
						options={operations}
						placeholder='Operation'
						validate={[required]}
					/>
				);
			}
			case FORM_FIELD_TYPES['Vec<(OracleKey,OracleValue)>']: {
				return (
					<FieldArray
						key={name}
						name={`extrinsicParams[${index}]`}
						component={FeedValue}
						currenciesOptions={currenciesOptions}
					/>
				);
			}
			default: {
				break;
			}
		}
	};

	return (
		<form onSubmit={handleSubmit} className='propose-extrinsic-form'>
			<div className='fields'>
				<Field
					name='threshold'
					component={InputField}
					validate={[required]}
					placeholder='threshold'
				/>
				<Field
					name='module'
					component={DropdownField}
					options={moduleNamesOptions}
					placeholder='Module name'
					className='dropdown-field'
					validate={required}
				/>
				<Field
					name='extrinsicName'
					component={DropdownField}
					options={moduleExtrinsicsList}
					placeholder='Module Extrinsic'
					className='dropdown-field'
					validate={required}
				/>
				{renderArgsFields()}
			</div>
			<div className='actions'>
				{isLoading ? (
					<div>
						<Loading />
					</div>
				) : (
					<Button role='submit' disabled={!valid || !isAccountReady}>
						Confirm
					</Button>
				)}
			</div>
		</form>
	);
}

export default reduxForm<{}, ProposeExtrinsicFormProps>({
	form: 'proposeExtrinsic',
})(ProposeExtrinsic);
