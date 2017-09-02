'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// import fetchSportLeague from './ctrls/fetchSportLeague'
// import fetchEventOdd from './ctrls/fetchEventOdd'
// import fetchOpenBet from './ctrls/fetchOpenBet'
// import fetchHistoryBet from './ctrls/fetchHistoryBet'
// import submitSingleBetOrder from './ctrls/submitSingleBetOrder'
// import submitRadioBetOrder from './ctrls/submitRadioBetOrder'

router.route('/sync-current-status').get(_syncCurrentStatus2.default);
router.route('/fetch-account').get(_fetchAccount2.default);
router.route('/fetch-open-bet').get(_fetchOpenBet2.default);
router.route('/fetch-history-bet').get(_fetchHistoryBet2.default);
// router.route('/fetch-sport-league-list').get(fetchAllEventOdds_MW, buildSportLeagueTable_MW, fetchSportLeague)

// router.route('/fetch-eventodd-list').post(fetchEventOdd)

// router.route('/fetch-open-bet').get(fullResultUpdateDB_MW, fetchOpenBet)

// router.route('/fetch-history-bet').post(fullResultUpdateDB_MW, fetchHistoryBet)

// router.route('/submit-single-bet-order').post(fetchAllEventOdds_MW, submitSingleBetOrder)

// router.route('/submit-radio-bet-order').post(fetchAllEventOdds_MW, submitRadioBetOrder)

exports.default = router;
//# sourceMappingURL=index.js.map