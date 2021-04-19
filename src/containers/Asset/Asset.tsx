import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { AssetProps, AssetParams } from './Asset.types';
import './Asset.scss';
import { State } from '../../util/types';
import {
	disableIsCollateral,
	enableIsCollateral,
	depositUnderlying,
	redeemUnderlying,
	repay,
	borrow,
} from '../../actions/dashboardUpdates';

function Asset(props: AssetProps) {
	const {
		disableIsCollateral,
		enableIsCollateral,
		depositUnderlying,
		redeemUnderlying,
		repay,
		borrow,
	} = props;
	let { assetId } = useParams<AssetParams>();
	useEffect(() => {
		return () => {};
	});

	const isCollateralEnabled = false;

	const asCollateralActionText = isCollateralEnabled ? 'No' : 'Yes';

	const handleCollateralClick = () => {};
	const handleDepositClick = () => {};
	const handleWithdrawClick = () => {};
	const handleRepayClick = () => {};
	const handleBorrowClick = () => {};

	return (
		<div className='asset-page'>
			<div className='main-title'>Asset: {assetId}</div>
			<div className='header-actions'>
				<div className='question'>Use as Collateral?</div>
				<Button onClick={handleCollateralClick}>
					{asCollateralActionText}
				</Button>
			</div>
			<div className='info-block'>
				<div className='title'>Your information</div>
				<div className='content-block'>
					<div className='block-header'>
						<div className='type'>Supply</div>
						<div className='actions'>
							<Button className='action'>Supply</Button>
							<Button className='action'>Withdraw</Button>
						</div>
					</div>
					<div className='block-body'>
						<div className='text-row'>
							<div className='label'>Wallet Balance</div>
							<div className='value'>
								<span className='bold'>100.00</span> DOT
							</div>
						</div>
						<div className='text-row'>
							<div className='label'>Supplied</div>
							<div className='value'>
								<span className='bold'>50.00 </span>DOT
							</div>
						</div>
					</div>
				</div>
				<div className='divider' />
				<div className='content-block'>
					<div className='block-header'>
						<div className='type'>Borrows</div>
						<div className='actions'>
							<Button className='action'>Repay</Button>
							<Button className='action'>Borrow</Button>
						</div>
					</div>
					<div className='block-body'>
						<div className='text-row'>
							<div className='label'>Borrowed</div>
							<div className='value'>
								<span className='bold'>20.00</span> DOT
							</div>
						</div>
						<div className='text-row'>
							<div className='label'>Available to Borrow</div>
							<div className='value'>
								<span className='bold'>50.00</span> DOT
							</div>
						</div>
						<div className='text-row'>
							<div className='label'>Loan to Value</div>
							<div className='value'>
								<span className='bold'>30</span> %
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state: State) => ({});

const mapDispatchToProps = {
	disableIsCollateral,
	enableIsCollateral,
	depositUnderlying,
	redeemUnderlying,
	repay,
	borrow,
};

export default connect(mapStateToProps, mapDispatchToProps)(Asset);
