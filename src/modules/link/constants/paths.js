import { ACCOUNT, MARKETS, MAKE, MY_POSITIONS, MY_MARKETS, MY_REPORTS, TRANSACTIONS, M } from '../../app/constants/pages';
import { NEW_REGISTER, REGISTER, LOGIN } from '../../auth/constants/auth-types';

export const PATHS_PAGES = {
	'/': MARKETS,
	'/make': MAKE,
	'/my-positions': MY_POSITIONS,
	'/my-markets': MY_MARKETS,
	'/my-reports': MY_REPORTS,
	'/transactions': TRANSACTIONS,
	'/register': REGISTER,
	'/login': LOGIN,
	'/m': M,
	'/account': ACCOUNT,
	'/newRegister': NEW_REGISTER
};

export const PAGES_PATHS = Object.keys(PATHS_PAGES).reduce(
	(finalObj, key) => {
		finalObj[PATHS_PAGES[key]] = key;
		return finalObj;
	}, {});

export const PATHS_AUTH = {
	'/register': REGISTER,
	'/login': LOGIN,
	'/newRegister': NEW_REGISTER,
};

export const AUTH_PATHS = Object.keys(PATHS_AUTH).reduce(
	(finalObj, key) => {
		finalObj[PATHS_AUTH[key]] = key;
		return finalObj;
	}, {});
