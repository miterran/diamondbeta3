'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _Player = require('../../../models/Player');

var _Player2 = _interopRequireDefault(_Player);

var _Agent = require('../../../models/Agent');

var _Agent2 = _interopRequireDefault(_Agent);

var _AgentTransaction = require('../../../models/AgentTransaction');

var _AgentTransaction2 = _interopRequireDefault(_AgentTransaction);

var _BetOrder = require('../../../models/BetOrder');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var fetchTransaction = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
		var weekNum, pendingTransactionList, newList, agentCredit, pendingCredit, transactionList;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						weekNum = req.body.weekNum;
						pendingTransactionList = [];
						newList = [];

						if (!(weekNum === 0)) {
							_context.next = 11;
							break;
						}

						agentCredit = req.user.currentStatus.credit;
						pendingCredit = 0;
						_context.next = 8;
						return _BetOrder.OpenBet.find({
							'owner.agent': req.user._id
						}, 'orderNumber orderType createdAt wagerDetail.riskAmount owner.player').populate({ path: 'owner.player', select: 'account.username' });

					case 8:
						pendingTransactionList = _context.sent;


						pendingTransactionList.sort(function (a, b) {
							return new Date(a.createdAt) - new Date(b.createdAt);
						});

						newList = pendingTransactionList.map(function (transaction, transactionIdx) {

							agentCredit -= transaction.wagerDetail.riskAmount;

							return {
								orderNumber: transaction.orderNumber,
								orderType: transaction.orderType,
								createdAt: transaction.createdAt,
								wagerDetail: transaction.wagerDetail,
								owner: transaction.owner,
								balance: agentCredit
							};
						});

					case 11:
						_context.next = 13;
						return _AgentTransaction2.default.find({
							'owner.agent': req.user._id,
							createdAt: { $gte: (0, _moment2.default)().subtract(weekNum, 'w').startOf('isoWeek'), $lte: (0, _moment2.default)().subtract(weekNum, 'w').endOf('isoWeek') }
						}).populate({ path: 'owner.agent', select: 'account.username' }).populate({ path: 'owner.player', select: 'account.username' });

					case 13:
						transactionList = _context.sent;


						res.json({ transactionList: transactionList, pendingTransactionList: newList });

					case 15:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function fetchTransaction(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

exports.default = fetchTransaction;

// response.data.pendingTransactionList.sort((a, b) => { return new Date(b.createdAt) - new Date(a.createdAt) })
//# sourceMappingURL=fetchTransaction.js.map