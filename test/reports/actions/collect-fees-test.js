import {
	assert
} from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import testState from '../../testState';

describe('modules/reports/actions/collect-fees.js', () => {
	proxyquire.noPreserveCache().noCallThru();
	const middlewares = [thunk];
	const mockStore = configureMockStore(middlewares);
	let store, action, out;
	let state = Object.assign({}, testState);
	store = mockStore(state);
	let mockAugurJS = {};
	let mockUpdateAssets = {};

	mockAugurJS.collectFees = sinon.stub().yields(null, 'test');
	mockUpdateAssets.updateAssets = sinon.stub().returns({
		type: 'UPDATE_ASSETS'
	});

	action = proxyquire('../../../src/modules/reports/actions/collect-fees', {
		'../../../services/augurjs': mockAugurJS,
		'../../auth/actions/update-assets': mockUpdateAssets
	});

	beforeEach(() => {
		store.clearActions();
	});

	afterEach(() => {
		store.clearActions();
	});

	it('should dispatch an updateAssets action after called collectFees from AugurJS', () => {
		out = [{
			type: 'UPDATE_ASSETS'
		}];

		store.dispatch(action.collectFees());
		assert(mockAugurJS.collectFees.calledOnce, `Didn't call AugurJS.collectFees() only once as expected.`);
		assert(mockUpdateAssets.updateAssets.calledOnce, `Didn't call updateAssets() only once as expected.`);
		assert.deepEqual(store.getActions(), out, `Didn't dispatch the correct action objects`);
	});

});
