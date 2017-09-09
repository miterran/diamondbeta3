'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _BetOrder = require('../../../models/BetOrder');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _Agent = require('../../../models/Agent');

var _Agent2 = _interopRequireDefault(_Agent);

var _AgentTransaction = require('../../../models/AgentTransaction');

var _AgentTransaction2 = _interopRequireDefault(_AgentTransaction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var saveNewHistoryBet = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(openBet, betOrderStatus, resultAmount) {
		var newHistoryBet, agent, newAgentTransaction;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						newHistoryBet = new _BetOrder.HistoryBet({
							orderNumber: openBet.orderNumber,
							orderType: openBet.orderType,
							owner: openBet.owner,
							wagerDetail: openBet.wagerDetail,
							status: betOrderStatus,
							resultAmount: resultAmount,
							eventOdds: openBet.eventOdds,
							createdAt: openBet.createdAt,
							closedAt: (0, _moment2.default)()
						});
						_context.next = 4;
						return newHistoryBet.save();

					case 4:
						console.log('saved history straight bet' + newHistoryBet.orderNumber);
						_context.next = 7;
						return _BetOrder.OpenBet.findOneAndRemove({ _id: openBet._id });

					case 7:
						console.log('deleted openbet ' + openBet.orderNumber);

						if (!(betOrderStatus === 'Lost')) {
							_context.next = 17;
							break;
						}

						_context.next = 11;
						return _Agent2.default.findOneAndUpdate({ _id: openBet.owner.agent }, { '$inc': { 'currentStatus.credit': resultAmount, 'currentStatus.availableCredit': resultAmount } });

					case 11:
						agent = _context.sent;

						console.log('player lost game, updated agent status credit');
						newAgentTransaction = new _AgentTransaction2.default({
							owner: {
								player: openBet.owner.player,
								superAgent: openBet.owner.superAgent,
								agent: openBet.owner.agent
							},
							orderType: openBet.orderType,
							transactionType: 'out',
							creditAmount: resultAmount,
							resultAmount: agent.currentStatus.credit + resultAmount,
							orderNumber: openBet.orderNumber,
							createdAt: (0, _moment2.default)()
						});
						_context.next = 16;
						return newAgentTransaction.save();

					case 16:
						console.log('saved new agent transaction');

					case 17:
						_context.next = 22;
						break;

					case 19:
						_context.prev = 19;
						_context.t0 = _context['catch'](0);
						throw _context.t0;

					case 22:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 19]]);
	}));

	return function saveNewHistoryBet(_x, _x2, _x3) {
		return _ref.apply(this, arguments);
	};
}();

exports.default = saveNewHistoryBet;
//# sourceMappingURL=saveNewHistoryBet.js.map