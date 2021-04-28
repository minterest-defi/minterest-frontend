import React, { useState } from 'react';
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
		input: { onChange },
		// meta: { error, touched },
		currenciesOptions,
		wrappedCurrenciesOptions,
	}: Props = props;

	const [currencyType, setCurrencyType] = useState<any>('');
	const [currencyValue, setCurrencyValue] = useState<any>('');

	const handleTypeChange = (
		e: React.SyntheticEvent<HTMLElement>,
		_data: DropdownProps
	) => {
		setCurrencyType(_data.value);
		setCurrencyValue('');
		onChange('');
	};

	const handleCurrencyChange = (
		e: React.SyntheticEvent<HTMLElement>,
		_data: DropdownProps
	) => {
		setCurrencyValue(_data.value);

		if (currencyType && currencyValue) {
			onChange({
				[currencyType]: currencyValue,
			});
		}
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
