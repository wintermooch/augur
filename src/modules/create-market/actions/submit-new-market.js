import makeDescription from '../../../utils/make-description';
import { BRANCH_ID } from '../../app/constants/network';
import { BINARY, CATEGORICAL, SCALAR } from '../../markets/constants/market-types';
import { SUCCESS, FAILED, CREATING_MARKET } from '../../transactions/constants/statuses';

import AugurJS from '../../../services/augurjs';

import { updateExistingTransaction } from '../../transactions/actions/update-existing-transaction';
import { addCreateMarketTransaction } from '../../transactions/actions/add-create-market-transaction';

import { selectTransactionsLink } from '../../link/selectors/links';

import { submitGenerateOrderBook } from '../../create-market/actions/generate-order-book';

import { clearMakeInProgress } from '../../create-market/actions/update-make-in-progress';

export function submitNewMarket(newMarket) {
	return dispatch => {
		selectTransactionsLink(dispatch).onClick();
		dispatch(addCreateMarketTransaction(newMarket));
	};
}

export function createMarket(transactionID, newMarket) {
	return dispatch => {
		if (newMarket.type === BINARY) {
			newMarket.minValue = 1;
			newMarket.maxValue = 2;
			newMarket.numOutcomes = 2;
		} else if (newMarket.type === SCALAR) {
			newMarket.minValue = newMarket.scalarSmallNum;
			newMarket.maxValue = newMarket.scalarBigNum;
			newMarket.numOutcomes = 2;
		} else if (newMarket.type === CATEGORICAL) {
			newMarket.minValue = 1;
			newMarket.maxValue = 2;
			newMarket.numOutcomes = newMarket.outcomes.length;
			newMarket.formattedDescription = makeDescription(newMarket);
		} else {
			console.warn('createMarket unsupported type:', newMarket.type);
			return;
		}

		dispatch(updateExistingTransaction(transactionID, { status: 'sending...' }));

		AugurJS.createMarket(BRANCH_ID, newMarket, (err, res) => {
			if (err) {
				dispatch(
					updateExistingTransaction(
						transactionID,
						{ status: FAILED, message: err.message }
					)
				);
				return;
			}
			if (res.status === CREATING_MARKET) {
				dispatch(updateExistingTransaction(transactionID, { status: CREATING_MARKET }));
			} else {
				dispatch(updateExistingTransaction(transactionID, { status: res.status }));

				if (res.status === SUCCESS) {
					dispatch(clearMakeInProgress());

					const updatedNewMarket = {
						...newMarket,
						id: res.marketID,
						tx: res.tx
					};

					dispatch(submitGenerateOrderBook(updatedNewMarket));
				}
			}
		});
	};
}
