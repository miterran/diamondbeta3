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
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(AgentId, changeAmount) {
		var agent, agentOpenBets, agentCreditPending, activePlayerCounter, agentCurrentStatus;
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
						agentCreditPending = agentOpenBets.reduce(function (total, openBet) {
							return total + openBet.wagerDetail.riskAmount;
						}, 0);
						activePlayerCounter = _lodash2.default.uniqBy([].concat.apply([], agentOpenBets.map(function (openBet) {
							return openBet.owner.player;
						})));
						agentCurrentStatus = {
							activePlayer: activePlayerCounter.length,
							credit: agent.currentStatus.credit + changeAmount,
							creditPending: agentCreditPending,
							availableCredit: agent.currentStatus.credit + changeAmount - agentCreditPending
						};
						_context.next = 12;
						return _Agent2.default.findOneAndUpdate({ _id: _mongoose2.default.Types.ObjectId(AgentId) }, { '$set': { currentStatus: agentCurrentStatus } });

					case 12:
						_context.next = 17;
						break;

					case 14:
						_context.prev = 14;
						_context.t0 = _context['catch'](0);
						throw _context.t0;

					case 17:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 14]]);
	}));

	return function updateAgentStatusAfterOrder(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

exports.default = updateAgentStatusAfterOrder;
//# sourceMappingURL=updateAgentStatusAfterOrder.js.map