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
		closeModal,
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
					<div className='field'>
						<Field
							key={name}
							name={`extrinsicParams[${index}]`}
							component={InputField}
							placeholder={name}
							validate={[required]}
						/>
					</div>
				);
			}
			case FORM_FIELD_TYPES.CurrencyId: {
				return (
					<div className='field'>
						<Field
							key={name}
							name={`extrinsicParams[${index}]`}
							component={CurrencyField}
							currenciesOptions={currenciesOptions}
							wrappedCurrenciesOptions={wrappedCurrenciesOptions}
							validate={[required]}
						/>
					</div>
				);
			}
			case FORM_FIELD_TYPES.Operation: {
				const operations = POOL_OPERATIONS.map((action) => ({
					key: action,
					text: action,
					value: action,
				}));
				return (
					<div className='field'>
						<Field
							key={name}
							name={`extrinsicParams[${index}]`}
							component={DropdownField}
							options={operations}
							placeholder='Operation'
							validate={[required]}
						/>
					</div>
				);
			}
			case FORM_FIELD_TYPES['Vec<(OracleKey,OracleValue)>']: {
				return (
					<div className='field field-list'>
						<FieldArray
							key={name}
							name={`extrinsicParams[${index}]`}
							component={FeedValue}
							currenciesOptions={currenciesOptions}
						/>
					</div>
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
				<div className='main-block'>
					<div className='field'>
						<Field
							name='threshold'
							component={InputField}
							validate={[required]}
							placeholder='threshold'
						/>
					</div>
					<div className='field'>
						<Field
							name='module'
							component={DropdownField}
							options={moduleNamesOptions}
							placeholder='Module name'
							className='dropdown-field'
							validate={required}
						/>
					</div>
					<div className='field'>
						<Field
							name='extrinsicName'
							component={DropdownField}
							options={moduleExtrinsicsList}
							placeholder='Module Extrinsic'
							className='dropdown-field'
							validate={required}
						/>
					</div>
				</div>
				<div className='dynamic-block'>{renderArgsFields()}</div>
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
				<Button role='button' onClick={closeModal}>
					Cancel
				</Button>
			</div>
		</form>
	);
}

export default reduxForm<{}, ProposeExtrinsicFormProps>({
	form: 'proposeExtrinsic',
})(ProposeExtrinsic);
