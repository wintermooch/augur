import activePage from './modules/app/selectors/active-page';
import loginAccount from './modules/auth/selectors/login-account';
import links from './modules/link/selectors/links';
import url from './modules/link/selectors/url';

import authForm from './modules/auth/selectors/auth-form';

import marketsHeader from './modules/markets/selectors/markets-header';
import markets from './modules/markets/selectors/markets';
import allMarkets from './modules/markets/selectors/markets-all';
import favoriteMarkets from './modules/markets/selectors/markets-favorite';
import filteredMarkets from './modules/markets/selectors/markets-filtered';
import unpaginatedMarkets from './modules/markets/selectors/markets-unpaginated';
import marketsTotals from './modules/markets/selectors/markets-totals';
import pagination from './modules/markets/selectors/pagination';
import selectedOutcome from './modules/outcome/selectors/selected-outcome';

import market from './modules/market/selectors/market';
import sideOptions from './modules/trade/selectors/side-options';

import filters from './modules/markets/selectors/filters';
import searchSort from './modules/markets/selectors/search-sort';
import keywords from './modules/markets/selectors/keywords';

import portfolio from './modules/portfolio/selectors/portfolio';

import transactions from './modules/transactions/selectors/transactions';
import transactionsTotals from './modules/transactions/selectors/transactions-totals';
import isTransactionsWorking from './modules/transactions/selectors/is-transactions-working';

import createMarketForm from './modules/create-market/selectors/create-market-form';

const selectors = {
	activePage,
	loginAccount,
	links,
	url,

	authForm,
	createMarketForm,

	marketsHeader,
	markets,
	allMarkets,
	favoriteMarkets,
	filteredMarkets,
	unpaginatedMarkets,
	marketsTotals,
	pagination,
	selectedOutcome,

	market,
	sideOptions,

	filters,
	searchSort,
	keywords,

	portfolio,

	transactions,
	transactionsTotals,
	isTransactionsWorking
};

module.exports = {};

Object.keys(selectors).forEach(selectorKey =>
 Object.defineProperty(module.exports,
		selectorKey,
		{ get: selectors[selectorKey], enumerable: true }
));
