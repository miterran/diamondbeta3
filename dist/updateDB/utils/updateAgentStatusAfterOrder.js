'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Agent = require('../../models/Agent');

var _Agent2 = _interopRequireDefault(_Agent);

var _Player = require('../../models/Player');

var _Player2 = _interopRequireDefault(_Player);

var _BetOrder = require('../../models/BetOrder');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// update agent current status every time order changed
var updateAgentStatusAfterOrder = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(AgentId) {
		var agent, agentOpenBets, agentHistoryBets, agentCreditSpent, existedPlayer, agentCreditPending, activePlayerCounter, agentCurrentStatus;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						_context.next = 3;
						return _Agent2.default.findOne({ _id: _mongoose2.default.Types.ObjectId(AgentId) }, 'currentStatus');

					case 3:
						agent = _context.sent;
						_context.next = 6;
						return _BetOrder.OpenBet.find({ 'owner.agent': _mongoose2.default.Types.ObjectId(AgentId) }, 'orderType wagerDetail.riskAmount wagerDetail.winAmount owner.player');

					case 6:
						agentOpenBets = _context.sent;
						_context.next = 9;
						return _BetOrder.HistoryBet.find({ 'owner.agent': _mongoose2.default.Types.ObjectId(AgentId), 'status': 'Lost' }, 'resultAmount');

					case 9:
						agentHistoryBets = _context.sent;
						agentCreditSpent = agentHistoryBets.reduce(function (total, historyBet) {
							return total + historyBet.resultAmount;
						}, 0);
						_context.next = 13;
						return _Player2.default.find({ agent: _mongoose2.default.Types.ObjectId(AgentId) }, '_id');

					case 13:
						existedPlayer = _context.sent;
						agentCreditPending = agentOpenBets.reduce(function (total, openBet) {
							return total + openBet.wagerDetail.riskAmount;
						}, 0);
						activePlayerCounter = _lodash2.default.uniqBy([].concat.apply([], agentOpenBets.map(function (openBet) {
							return openBet.owner.player.toString();
						})));
						agentCurrentStatus = {
							existedPlayer: existedPlayer.length,
							activePlayer: activePlayerCounter.length,
							credit: 100000 + agentCreditSpent,
							creditPending: agentCreditPending,
							availableCredit: 100000 + (agentCreditSpent - agentCreditPending)
						};
						_context.next = 19;
						return _Agent2.default.findOneAndUpdate({ _id: _mongoose2.default.Types.ObjectId(AgentId) }, { '$set': { currentStatus: agentCurrentStatus } }, { new: true }).then(function (result) {
							console.log(result);
						});

					case 19:
						_context.next = 24;
						break;

					case 21:
						_context.prev = 21;
						_context.t0 = _context['catch'](0);
						throw _context.t0;

					case 24:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 21]]);
	}));

	return function updateAgentStatusAfterOrder(_x) {
		return _ref.apply(this, arguments);
	};
}();

exports.default = updateAgentStatusAfterOrder;
//# sourceMappingURL=updateAgentStatusAfterOrder.js.map