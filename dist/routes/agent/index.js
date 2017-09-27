'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _updateDB = require('../../middleware/updateDB');

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

var _fetchPlayerStatus = require('./ctrls/fetchPlayerStatus');

var _fetchPlayerStatus2 = _interopRequireDefault(_fetchPlayerStatus);

var _editPlayerSetting = require('./ctrls/editPlayerSetting');

var _editPlayerSetting2 = _interopRequireDefault(_editPlayerSetting);

var _purchaseCredit = require('./ctrls/purchaseCredit');

var _purchaseCredit2 = _interopRequireDefault(_purchaseCredit);

var _checkNewPlayerUsername = require('./ctrls/checkNewPlayerUsername');

var _checkNewPlayerUsername2 = _interopRequireDefault(_checkNewPlayerUsername);

var _createNewPlayer = require('./ctrls/createNewPlayer');

var _createNewPlayer2 = _interopRequireDefault(_createNewPlayer);

var _agentAccountSetting = require('./ctrls/agentAccountSetting');

var _agentAccountSetting2 = _interopRequireDefault(_agentAccountSetting);

var _approveCancelOpenBet = require('./ctrls/approveCancelOpenBet');

var _approveCancelOpenBet2 = _interopRequireDefault(_approveCancelOpenBet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();


router.route('/sync-current-status').get(_updateDB.fullResultUpdateDB_MW, _syncCurrentStatus2.default);
router.route('/fetch-account').get(_fetchAccount2.default);
router.route('/fetch-open-bet').get(_fetchOpenBet2.default);
router.route('/fetch-history-bet').post(_fetchHistoryBet2.default);
router.route('/fetch-transaction').post(_fetchTransaction2.default);
router.route('/fetch-player-status').post(_fetchPlayerStatus2.default);
router.route('/edit-player-setting').post(_editPlayerSetting2.default);
router.route('/check-new-player-username').post(_checkNewPlayerUsername2.default);
router.route('/purchase-credit').post(_purchaseCredit2.default);
router.route('/create-new-player').post(_createNewPlayer2.default);
router.route('/agent-account-setting').post(_agentAccountSetting2.default);
router.route('/approve-cancel-open-bet').post(_approveCancelOpenBet2.default);

exports.default = router;
//# sourceMappingURL=index.js.map