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

var _fetchSportLeague = require('./ctrls/fetchSportLeague');

var _fetchSportLeague2 = _interopRequireDefault(_fetchSportLeague);

var _fetchEventOdd = require('./ctrls/fetchEventOdd');

var _fetchEventOdd2 = _interopRequireDefault(_fetchEventOdd);

var _fetchOpenBet = require('./ctrls/fetchOpenBet');

var _fetchOpenBet2 = _interopRequireDefault(_fetchOpenBet);

var _fetchHistoryBet = require('./ctrls/fetchHistoryBet');

var _fetchHistoryBet2 = _interopRequireDefault(_fetchHistoryBet);

var _submitSingleBetOrder = require('./ctrls/submitSingleBetOrder');

var _submitSingleBetOrder2 = _interopRequireDefault(_submitSingleBetOrder);

var _submitRadioBetOrder = require('./ctrls/submitRadioBetOrder');

var _submitRadioBetOrder2 = _interopRequireDefault(_submitRadioBetOrder);

var _requestCancelOpenBet = require('./ctrls/requestCancelOpenBet');

var _requestCancelOpenBet2 = _interopRequireDefault(_requestCancelOpenBet);

var _userAccountSetting = require('./ctrls/userAccountSetting');

var _userAccountSetting2 = _interopRequireDefault(_userAccountSetting);

var _updateDB = require('../../middleware/updateDB');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/sync-current-status').get(_updateDB.fullResultUpdateDB_MW, _syncCurrentStatus2.default);

router.route('/fetch-account').get(_fetchAccount2.default);

router.route('/fetch-sport-league-list').get(_updateDB.fetchAllEventOdds_MW, _updateDB.buildSportLeagueTable_MW, _fetchSportLeague2.default);

router.route('/fetch-eventodd-list').post(_fetchEventOdd2.default);

router.route('/fetch-open-bet').get(_fetchOpenBet2.default);

router.route('/fetch-history-bet').post(_fetchHistoryBet2.default);

router.route('/submit-single-bet-order').post(_updateDB.fetchAllEventOdds_MW, _submitSingleBetOrder2.default);

router.route('/submit-radio-bet-order').post(_updateDB.fetchAllEventOdds_MW, _submitRadioBetOrder2.default);

router.route('/request-cancel-open-bet').post(_requestCancelOpenBet2.default);

router.route('/user-account-setting').post(_userAccountSetting2.default);

exports.default = router;
//# sourceMappingURL=index.js.map