'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Agent = require('../../../models/Agent');

var _Agent2 = _interopRequireDefault(_Agent);

var _BetOrder = require('../../../models/BetOrder');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var fetchAccount = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
		var agentOpenBets, agentHistoryBets, agentCreditPending, activePlayerCounter, agentCurrentStatus, totalWin, totalRisk, straightBetCounter, parlayBetCounter, teaserBetCounter, reverseBetCounter, agentAccount;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						_context.next = 3;
						return _BetOrder.OpenBet.find({ 'owner.agent': req.user._id }, 'orderType wagerDetail.riskAmount wagerDetail.winAmount owner');

					case 3:
						agentOpenBets = _context.sent;
						_context.next = 6;
						return _BetOrder.HistoryBet.find({ 'owner.agent': req.user._id, 'closedAt': { $gte: (0, _moment2.default)().startOf('isoWeek'), $lte: (0, _moment2.default)().endOf('isoWeek') } }, 'closedAt resultAmount');

					case 6:
						agentHistoryBets = _context.sent;
						agentCreditPending = agentOpenBets.reduce(function (total, openBet) {
							return total + openBet.wagerDetail.riskAmount;
						}, 0);
						activePlayerCounter = _lodash2.default.uniqBy([].concat.apply([], agentOpenBets.map(function (openBet) {
							return openBet.owner.player;
						})));
						agentCurrentStatus = {
							activePlayer: activePlayerCounter.length,
							credit: req.user.currentStatus.credit,
							creditPending: agentCreditPending,
							availableCredit: req.user.currentStatus.credit - agentCreditPending
						};
						_context.next = 12;
						return _Agent2.default.findOneAndUpdate({ _id: req.user._id }, { '$set': { currentStatus: agentCurrentStatus } });

					case 12:
						totalWin = agentOpenBets.reduce(function (total, openBet) {
							return total + Number(openBet.wagerDetail.winAmount);
						}, 0);
						totalRisk = agentOpenBets.reduce(function (total, openBet) {
							return total + Number(openBet.wagerDetail.riskAmount);
						}, 0);
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
						agentAccount = {
							openBetStatus: {
								straightBet: straightBetCounter || 0,
								parlayBet: parlayBetCounter || 0,
								teaserBet: teaserBetCounter || 0,
								reverseBet: reverseBetCounter || 0,
								totalBets: agentOpenBets.length || 0,
								totalRisk: totalRisk || 0,
								totalWin: totalWin || 0
							},
							thisWeekHistoryBetList: agentHistoryBets
						};


						res.json(agentAccount);

						_context.next = 25;
						break;

					case 22:
						_context.prev = 22;
						_context.t0 = _context['catch'](0);
						throw _context.t0;

					case 25:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 22]]);
	}));

	return function fetchAccount(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

exports.default = fetchAccount;
//# sourceMappingURL=fetchAccount.js.map