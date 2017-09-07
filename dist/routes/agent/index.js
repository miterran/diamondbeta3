'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _syncCurrentStatus = require('./ctrls/syncCurrentStatus');

var _syncCurrentStatus2 = _interopRequireDefault(_syncCurrentStatus);

var _fetchAccount = require('./ctrls/fetchAccount');

var _fetchAccount2 = _interopRequireDefault(_fetchAccount);

var _fetchOpenBet = require('./ctrls/fetchOpenBet');

var _fetchOpenBet2 = _interopRequireDefault(_fetchOpenBet);

var _fetchHistoryBet = require('./ctrls/fetchHistoryBet');

var _fetchHistoryBet2 = _interopRequireDefault(_fetchHistoryBet);

var _purchaseCredit = require('./ctrls/purchaseCredit');

var _purchaseCredit2 = _interopRequireDefault(_purchaseCredit);

var _fetchTransaction = require('./ctrls/fetchTransaction');

var _fetchTransaction2 = _interopRequireDefault(_fetchTransaction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); //import moment from 'moment';


// import fetchSportLeague from './ctrls/fetchSportLeague'
// import fetchEventOdd from './ctrls/fetchEventOdd'
// import fetchOpenBet from './ctrls/fetchOpenBet'
// import fetchHistoryBet from './ctrls/fetchHistoryBet'
// import submitSingleBetOrder from './ctrls/submitSingleBetOrder'
// import submitRadioBetOrder from './ctrls/submitRadioBetOrder'

router.route('/sync-current-status').get(_syncCurrentStatus2.default);
router.route('/fetch-account').get(_fetchAccount2.default);
router.route('/fetch-open-bet').get(_fetchOpenBet2.default);
router.route('/fetch-history-bet').post(_fetchHistoryBet2.default);
router.route('/purchase-credit').post(_purchaseCredit2.default);
router.route('/fetch-transaction').post(_fetchTransaction2.default);
// router.route('/fetch-sport-league-list').get(fetchAllEventOdds_MW, buildSportLeagueTable_MW, fetchSportLeague)

// router.route('/fetch-eventodd-list').post(fetchEventOdd)

// router.route('/fetch-open-bet').get(fullResultUpdateDB_MW, fetchOpenBet)

// router.route('/fetch-history-bet').post(fullResultUpdateDB_MW, fetchHistoryBet)

// router.route('/submit-single-bet-order').post(fetchAllEventOdds_MW, submitSingleBetOrder)

// router.route('/submit-radio-bet-order').post(fetchAllEventOdds_MW, submitRadioBetOrder)

exports.default = router;
//# sourceMappingURL=index.js.map