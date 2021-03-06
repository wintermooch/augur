import {
	assert
} from 'chai';
import {
	UPDATE_LOGIN_ACCOUNT,
	CLEAR_LOGIN_ACCOUNT
} from '../../../src/modules/auth/actions/update-login-account';
import reducer from '../../../src/modules/auth/reducers/login-account';
import testState from '../../testState';

describe(`modules/auth/reducers/login-account.js`, () => {
	let action;
	let thisTestState = Object.assign({}, testState);

	it(`should updated the logged in account`, () => {
		action = {
			type: UPDATE_LOGIN_ACCOUNT,
			data: {
				ether: 5,
				rep: 15,
				realEther: 25
			}
		};

		const expectedOutput = Object.assign({}, thisTestState.loginAccount, {
			ether: 5,
			rep: 15,
			realEther: 25
		});

		assert.deepEqual(reducer(thisTestState.loginAccount, action), expectedOutput, `didn't return the expected loginAccount information`);
	});

	it(`should clear the logged in account`, () => {
		action = {
			type: CLEAR_LOGIN_ACCOUNT
		};
		const expectedOutput = {};
		assert.deepEqual(reducer(thisTestState.loginAccount, action), expectedOutput, `Didn't clear account as expected`);
	});
});
