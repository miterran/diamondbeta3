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
var updateAgentOpenBetStatusAfterOrder = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(AgentId) {
		var agent, agentOpenBets, agentCreditPending, activePlayerCounter, straightBetCounter, parlayBetCounter, teaserBetCounter, reverseBetCounter, totalRisk, totalWin, agentCurrentStatus, agentOpenBetStatus;
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
						return _BetOrder.OpenBet.find({ 'owner.agent': _mongoose2.default.Types.ObjectId(AgentId) }, 'orderType wagerDetail wagerDetail owner');

					case 6:
						agentOpenBets = _context.sent;
						agentCreditPending = agentOpenBets.reduce(function (total, openBet) {
							return total + openBet.wagerDetail.winAmount;
						}, 0);
						activePlayerCounter = _lodash2.default.uniq(agentOpenBets.map(function (openBet) {
							return openBet.owner.player.toString();
						}));
						straightBetCounter = agentOpenBets.reduce(function (total, openBet) {
							return total + (openBet.orderType === 'Straight');
						}, 0);
						parlayBetCounter = agentOpenBets.reduce(function (total, openBet) {
							return total + (openBet.orderType === 'Parlay');
						}, 0);
						teaserBetCounter = agentOpenBets.reduce(function (total, openBet) {
							return total + (openBet.orderType === 'Teaser6040' || openBet.orderType === 'Teaser6545' || openBet.orderType === 'Teaser7050' || openBet.orderType === 'SuperTeaser');
						}, 0); // indexOf

						reverseBetCounter = agentOpenBets.reduce(function (total, openBet) {
							return total + (openBet.orderType === 'ActionReverse' || openBet.orderType === 'WinReverse');
						}, 0);
						totalRisk = agentOpenBets.reduce(function (total, openBet) {
							return total + Number(openBet.wagerDetail.riskAmount);
						}, 0);
						totalWin = agentOpenBets.reduce(function (total, openBet) {
							return total + Number(openBet.wagerDetail.winAmount);
						}, 0);
						agentCurrentStatus = {
							credit: agent.currentStatus.credit,
							creditPending: agentCreditPending,
							availableCredit: Number(agent.currentStatus.credit) - Number(agentCreditPending)
						};
						agentOpenBetStatus = {
							activePlayer: activePlayerCounter.length,
							straightBet: straightBetCounter || 0,
							parlayBet: parlayBetCounter || 0,
							teaserBet: teaserBetCounter || 0,
							reverseBet: reverseBetCounter || 0,
							totalBets: agentOpenBets.length || 0,
							totalRisk: totalRisk || 0,
							totalWin: totalWin || 0
						};
						_context.next = 19;
						return _Agent2.default.findOneAndUpdate({ _id: _mongoose2.default.Types.ObjectId(AgentId) }, { '$set': { currentStatus: agentCurrentStatus, openBetStatus: agentOpenBetStatus } }, { new: true }).then(function (agentUpdated) {
							console.log('update agent status ' + agentUpdated);
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

	return function updateAgentOpenBetStatusAfterOrder(_x) {
		return _ref.apply(this, arguments);
	};
}();

exports.default = updateAgentOpenBetStatusAfterOrder;
//# sourceMappingURL=updateAgentOpenBetStatusAfterOrder.js.map