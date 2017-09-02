'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Player = require('../../../models/Player');

var _Player2 = _interopRequireDefault(_Player);

var _BetOrder = require('../../../models/BetOrder');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var fetchAccount = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
		var _thisWeekSummary, playerOpenBets, playerHistoryBets, playerCurrentBalance, totalWin, totalRisk, straightBetCounter, parlayBetCounter, teaserBetCounter, reverseBetCounter, playerAccount;

		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						_context.next = 3;
						return _BetOrder.OpenBet.find({ 'owner.player': req.user._id }, 'orderType wagerDetail.riskAmount wagerDetail.winAmount');

					case 3:
						playerOpenBets = _context.sent;
						_context.next = 6;
						return _BetOrder.HistoryBet.find({ 'owner.player': req.user._id, 'closedAt': { $gte: (0, _moment2.default)().startOf('isoWeek'), $lte: (0, _moment2.default)().endOf('isoWeek') } }, 'closedAt resultAmount');

					case 6:
						playerHistoryBets = _context.sent;
						playerCurrentBalance = playerHistoryBets.reduce(function (total, historyBet) {
							return total + Number(historyBet.resultAmount);
						}, 0);
						totalWin = playerOpenBets.reduce(function (total, openBet) {
							return total + Number(openBet.wagerDetail.winAmount);
						}, 0);
						totalRisk = playerOpenBets.reduce(function (total, openBet) {
							return total + Number(openBet.wagerDetail.riskAmount);
						}, 0);
						straightBetCounter = playerOpenBets.reduce(function (total, openBet) {
							return total + (openBet.orderType === 'Straight');
						}, 0);
						parlayBetCounter = playerOpenBets.reduce(function (total, openBet) {
							return total + (openBet.orderType === 'Parlay');
						}, 0);
						teaserBetCounter = playerOpenBets.reduce(function (total, openBet) {
							return total + (openBet.orderType === 'Teaser6040' || openBet.orderType === 'Teaser6545' || openBet.orderType === 'Teaser7050' || openBet.orderType === 'SuperTeaser');
						}, 0); // indexOf

						reverseBetCounter = playerOpenBets.reduce(function (total, openBet) {
							return total + (openBet.orderType === 'ActionReverse' || openBet.orderType === 'WinReverse');
						}, 0);
						playerAccount = {
							openBetStatus: {
								straightBet: straightBetCounter || 0,
								parlayBet: parlayBetCounter || 0,
								teaserBet: teaserBetCounter || 0,
								reverseBet: reverseBetCounter || 0,
								totalBets: playerOpenBets.length || 0,
								totalRisk: totalRisk || 0,
								totalWin: totalWin || 0
							},
							thisWeekSummary: (_thisWeekSummary = {}, _defineProperty(_thisWeekSummary, (0, _moment2.default)().startOf('isoWeek').add(0, 'd').format('MMM DD'), { bets: 0, amount: 0 }), _defineProperty(_thisWeekSummary, (0, _moment2.default)().startOf('isoWeek').add(1, 'd').format('MMM DD'), { bets: 0, amount: 0 }), _defineProperty(_thisWeekSummary, (0, _moment2.default)().startOf('isoWeek').add(2, 'd').format('MMM DD'), { bets: 0, amount: 0 }), _defineProperty(_thisWeekSummary, (0, _moment2.default)().startOf('isoWeek').add(3, 'd').format('MMM DD'), { bets: 0, amount: 0 }), _defineProperty(_thisWeekSummary, (0, _moment2.default)().startOf('isoWeek').add(4, 'd').format('MMM DD'), { bets: 0, amount: 0 }), _defineProperty(_thisWeekSummary, (0, _moment2.default)().startOf('isoWeek').add(5, 'd').format('MMM DD'), { bets: 0, amount: 0 }), _defineProperty(_thisWeekSummary, (0, _moment2.default)().startOf('isoWeek').add(6, 'd').format('MMM DD'), { bets: 0, amount: 0 }), _thisWeekSummary)
						};


						if (!_lodash2.default.isEmpty(playerHistoryBets)) {
							playerHistoryBets.forEach(function (historyBet) {
								playerAccount.thisWeekSummary[(0, _moment2.default)(historyBet.closedAt).format('MMM DD')].amount += Number(historyBet.resultAmount);
								playerAccount.thisWeekSummary[(0, _moment2.default)(historyBet.closedAt).format('MMM DD')].bets++;
							});
						}

						res.json(playerAccount);

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

	return function fetchAccount(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

exports.default = fetchAccount;
//# sourceMappingURL=fetchAccount.js.map