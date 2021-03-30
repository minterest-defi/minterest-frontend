import React from 'react';
import { Button, Grid, Table } from 'semantic-ui-react';
import Loading from '../../util/Loading';
import { UNDERLYING_ASSETS_TYPES } from '../../util/constants';
// @ts-ignore
import classes from './MNTTokenEconomy.module.css';
import {
	MNTRateProps,
	MNTRateForSideFormValues,
} from '../../containers/ProtocolAdmin/ProtocolAdmin.types';
import SetMNTRateForSide from '../Forms/SetMNTRateForSide/SetMNTRateForSide';

export default function MNTTokenEconomy(props: MNTRateProps) {
	const {
		account,
		keyring,
		MNTRate,
		MNTSpeeds,
		enableMNTMinting,
		disableMNTMinting,
		setMNTRateForSide,
		isSetMNTRateRequestRunning,
		isToggleMNTMintingRequestRunning,
		mintToggleCurrencyId,
	} = props;

	const isAccountReady = !!account;

	const handleSubmitMNTRateForSide = (form: MNTRateForSideFormValues) => {
		const { rateForSide } = form;

		if (account) setMNTRateForSide(account, keyring, rateForSide);
	};

	const handleEnableMNTMinting = (currencyId: string) => {
		return () => {
			if (account) enableMNTMinting(account, keyring, currencyId);
		};
	};

	const handleDisableMNTMinting = (currencyId: string) => {
		return () => {
			if (account) disableMNTMinting(account, keyring, currencyId);
		};
	};

	if (!MNTRate || !MNTSpeeds) return <Loading />;

	const renderRow = () => {
		return UNDERLYING_ASSETS_TYPES.map((asset, index) => {
			const isEnabledMinting = MNTSpeeds[asset] && !MNTSpeeds[asset].isEmpty;

			const requestingToggleThisCurrency = asset === mintToggleCurrencyId;

			return (
				<Table.Row key={index}>
					<Table.Cell>{asset}</Table.Cell>
					<Table.Cell>{MNTSpeeds[asset]?.toString()}</Table.Cell>
					<Table.Cell>
						{isToggleMNTMintingRequestRunning &&
						requestingToggleThisCurrency ? (
							<Loading />
						) : (
							<React.Fragment>
								{isEnabledMinting ? (
									<Button
										role='button'
										color={isAccountReady ? 'green' : 'red'}
										disabled={!isAccountReady}
										onClick={handleDisableMNTMinting(asset)}
									>
										Disable
									</Button>
								) : (
									<Button
										role='button'
										color={isAccountReady ? 'green' : 'red'}
										disabled={!isAccountReady}
										onClick={handleEnableMNTMinting(asset)}
									>
										Enable
									</Button>
								)}
							</React.Fragment>
						)}
					</Table.Cell>
				</Table.Row>
			);
		});
	};

	return (
		<div className={classes.MNTTokenEconomy}>
			<h2>MNT token economy</h2>
			<div className={classes.table}>
				<Grid.Column>
					<Table celled striped size='small'>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell key='headerPool'>Pool</Table.HeaderCell>
								<Table.HeaderCell key='headerMNTSpeed'>
									MNT Speed
								</Table.HeaderCell>
								<Table.HeaderCell key='headerDistributionEnabled'>
									Distribution enabled
								</Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>{renderRow()}</Table.Body>
					</Table>
				</Grid.Column>
			</div>
			<div className={classes.data}>
				<div className={classes.text}>
					MNT Rate for side: {MNTRate.toString()}
				</div>
				<div className={classes.text}>
					Total MNT Rate: {MNTRate.toString() * 2}
				</div>
				<div className={classes.text}>Tokens minted: NO VALUE</div>
			</div>
			<div className={classes.form}>
				<SetMNTRateForSide
					// @ts-ignore
					onSubmit={handleSubmitMNTRateForSide}
					isLoading={isSetMNTRateRequestRunning}
					isAccountReady={isAccountReady}
				/>
			</div>
		</div>
	);
}
