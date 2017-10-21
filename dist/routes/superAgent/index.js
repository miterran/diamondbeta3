'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _fetchAccount = require('./ctrls/fetchAccount');

var _fetchAccount2 = _interopRequireDefault(_fetchAccount);

var _checkNewAgentUsername = require('./ctrls/checkNewAgentUsername');

var _checkNewAgentUsername2 = _interopRequireDefault(_checkNewAgentUsername);

var _createNewAgent = require('./ctrls/createNewAgent');

var _createNewAgent2 = _interopRequireDefault(_createNewAgent);

var _fetchAgentStatus = require('./ctrls/fetchAgentStatus');

var _fetchAgentStatus2 = _interopRequireDefault(_fetchAgentStatus);

var _addCredit = require('./ctrls/addCredit');

var _addCredit2 = _interopRequireDefault(_addCredit);

var _fetchOpenBet = require('./ctrls/fetchOpenBet');

var _fetchOpenBet2 = _interopRequireDefault(_fetchOpenBet);

var _fetchHistoryBet = require('./ctrls/fetchHistoryBet');

var _fetchHistoryBet2 = _interopRequireDefault(_fetchHistoryBet);

var _addGame = require('./ctrls/addGame');

var _addGame2 = _interopRequireDefault(_addGame);

var _updateDB = require('../../middleware/updateDB');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/fetch-account').get(_fetchAccount2.default);
router.route('/check-new-agent-username').post(_checkNewAgentUsername2.default);
router.route('/create-new-agent').post(_createNewAgent2.default);
router.route('/fetch-agent-status').post(_fetchAgentStatus2.default);
router.route('/add-credit').post(_addCredit2.default);
router.route('/fetch-open-bet').get(_updateDB.fullResultUpdateDB_MW, _fetchOpenBet2.default);
router.route('/fetch-history-bet').get(_updateDB.fullResultUpdateDB_MW, _fetchHistoryBet2.default);
router.route('/add-game').post(_addGame2.default);

exports.default = router;
//# sourceMappingURL=index.js.map