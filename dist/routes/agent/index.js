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

var _fetchTransaction = require('./ctrls/fetchTransaction');

var _fetchTransaction2 = _interopRequireDefault(_fetchTransaction);

var _fetchPlayerSetting = require('./ctrls/fetchPlayerSetting');

var _fetchPlayerSetting2 = _interopRequireDefault(_fetchPlayerSetting);

var _purchaseCredit = require('./ctrls/purchaseCredit');

var _purchaseCredit2 = _interopRequireDefault(_purchaseCredit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/sync-current-status').get(_syncCurrentStatus2.default);
router.route('/fetch-account').get(_fetchAccount2.default);
router.route('/fetch-open-bet').get(_fetchOpenBet2.default);
router.route('/fetch-history-bet').post(_fetchHistoryBet2.default);
router.route('/fetch-transaction').post(_fetchTransaction2.default);
router.route('/fetch-player-setting').post(_fetchPlayerSetting2.default);

router.route('/purchase-credit').post(_purchaseCredit2.default);

exports.default = router;
//# sourceMappingURL=index.js.map