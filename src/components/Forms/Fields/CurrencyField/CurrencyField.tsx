import React from 'react';
import { CURRENCIES_TYPES } from '../../../../util/constants';
import './CurrencyField.scss';
import { DropdownProps, Dropdown } from 'semantic-ui-react';
import { DropdownOption } from '../../../../util/types';

interface Props {
	input: any;
	meta: any;
	currenciesOptions: DropdownOption[];
	wrappedCurrenciesOptions: DropdownOption[];
}

export default function CurrencyField(props: Props) {
	const {
		input: { value, onChange },
		// meta: { error, touched },
		currenciesOptions,
		wrappedCurrenciesOptions,
	}: Props = props;

	const currencyType = Object.keys(value)[0];
	const currencyValue = currencyType ? value[currencyType] : null;

	const handleTypeChange = (
		e: React.SyntheticEvent<HTMLElement>,
		_data: DropdownProps
	) => {
		onChange({
			// @ts-ignore
			[_data.value]: null,
		});
	};

	const handleCurrencyChange = (
		e: React.SyntheticEvent<HTMLElement>,
		_data: DropdownProps
	) => {
		onChange({
			// @ts-ignore
			[currencyType]: _data.value,
		});
	};

	const getCurrenciesOptions = () => {
		switch (currencyType) {
			case CURRENCIES_TYPES.Native: {
				return [...currenciesOptions, ...wrappedCurrenciesOptions];
			}
			case CURRENCIES_TYPES.UnderlyingAsset: {
				return currenciesOptions;
			}
			case CURRENCIES_TYPES.WrappedToken: {
				return wrappedCurrenciesOptions;
			}
			default: {
				return [];
			}
		}
	};

	const typesOptions = Object.values(CURRENCIES_TYPES).map((action) => ({
		key: action,
		text: action,
		value: action,
	}));

	const cOptions = getCurrenciesOptions();

	// TODO error message
	return (
		<div className='currency-field'>
			<div className='type-field-wrapper'>
				<Dropdown
					compact
					placeholder='type'
					search
					selection
					options={typesOptions}
					onChange={handleTypeChange}
					value={currencyType}
				/>
			</div>
			<div className='currency-field-wrapper'>
				<Dropdown
					compact
					placeholder='currency'
					search
					selection
					options={cOptions}
					onChange={handleCurrencyChange}
					value={currencyValue}
				/>
			</div>
		</div>
	);
}
