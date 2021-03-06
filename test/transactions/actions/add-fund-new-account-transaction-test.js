import {
	assert
} from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import testState from '../../testState';

describe(`modules/transactions/actions/add-fund-new-account-transactions.js`, () => {
	proxyquire.noPreserveCache();
	const middlewares = [thunk];
	const mockStore = configureMockStore(middlewares);
	const store = mockStore(testState);
	const fakeFundNewAccount = { fundNewAccount: () => {} };
	const fakeAddTransactions = { addTransaction: () => {} };

	sinon.stub(fakeFundNewAccount, 'fundNewAccount', (transID, address) => {
		return { type: 'FUND_NEW_ACCOUNT', transID, address };
	});

	sinon.stub(fakeAddTransactions, 'addTransaction', (data) => {
		return { type: 'ADD_TRANSACTION', ...data };
	});

	beforeEach(() => {
		store.clearActions();
	});

	afterEach(() => {
		store.clearActions();
	});

	const action = proxyquire('../../../src/modules/transactions/actions/add-fund-new-account-transaction', {
		'../../transactions/actions/add-transactions': fakeAddTransactions,
		'../../auth/actions/fund-new-account': fakeFundNewAccount
	});

	it('should fund a new account', () => {
		store.dispatch(action.addFundNewAccount('testAddress123'));

		store.getActions()[0].action('testTransactionID');

		const expectedOutput = [
			{
				type: 'fund_account',
	    	address: 'testAddress123',
	    	message: 'Preparing to sending a request to fund your account.',
	    	action:  store.getActions()[0].action
			},
			{
				type: 'FUND_NEW_ACCOUNT',
	    	transID: 'testTransactionID',
	    	address: 'testAddress123'
			}
		];

		assert.deepEqual(store.getActions(), expectedOutput, `actions dispatched didn't match up with expected dispatched actions`);

		assert(fakeFundNewAccount.fundNewAccount.calledOnce, `fundNewAccount wasn't called once as expected`);
		assert(fakeAddTransactions.addTransaction.calledOnce, `addTransaction wasn't called once as expected`);
	});

});
