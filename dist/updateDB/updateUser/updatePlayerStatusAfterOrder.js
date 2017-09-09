'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Player = require('../../models/Player');

var _Player2 = _interopRequireDefault(_Player);

var _BetOrder = require('../../models/BetOrder');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// update player current status every time order changed
var updatePlayerStatusAfterOrder = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(playerId) {
		var player, playerOpenBets, playerHistoryBets, playerCreditPending, playerCurrentBalance, straightBetCounter, parlayBetCounter, teaserBetCounter, reverseBetCounter, totalRisk, totalWin, playerCurrentStatus, playerOpenBetStatus;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						_context.next = 3;
						return _Player2.default.findOne({ _id: _mongoose2.default.Types.ObjectId(playerId) }, 'defaultSetting.weeklyStartCredit agent').populate({ path: 'agent', select: 'account.username' });

					case 3:
						player = _context.sent;
						_context.next = 6;
						return _BetOrder.OpenBet.find({ 'owner.player': _mongoose2.default.Types.ObjectId(playerId) }, 'orderType wagerDetail.riskAmount wagerDetail.winAmount');

					case 6:
						playerOpenBets = _context.sent;
						_context.next = 9;
						return _BetOrder.HistoryBet.find({ 'owner.player': _mongoose2.default.Types.ObjectId(playerId), 'closedAt': { $gte: (0, _moment2.default)().startOf('isoWeek'), $lte: (0, _moment2.default)().endOf('isoWeek') } }, 'closedAt resultAmount');

					case 9:
						playerHistoryBets = _context.sent;
						playerCreditPending = playerOpenBets.reduce(function (total, openBet) {
							return total + openBet.wagerDetail.riskAmount;
						}, 0);
						playerCurrentBalance = playerHistoryBets.reduce(function (total, historyBet) {
							return total + historyBet.resultAmount;
						}, 0);
						straightBetCounter = playerOpenBets.reduce(function (total, openBet) {
							return total + (openBet.orderType === 'Straight');
						}, 0);
						parlayBetCounter = playerOpenBets.reduce(function (total, openBet) {
							return total + (openBet.orderType === 'Parlay');
						}, 0);
						teaserBetCounter = playerOpenBets.reduce(function (total, openBet) {
							return total + (openBet.orderType === 'Teaser6040' || openBet.orderType === 'Teaser6545' || openBet.orderType === 'Teaser7050' || openBet.orderType === 'SuperTeaser');
						}, 0);
						reverseBetCounter = playerOpenBets.reduce(function (total, openBet) {
							return total + (openBet.orderType === 'ActionReverse' || openBet.orderType === 'WinReverse');
						}, 0);
						totalRisk = playerOpenBets.reduce(function (total, openBet) {
							return total + Number(openBet.wagerDetail.riskAmount);
						}, 0);
						totalWin = playerOpenBets.reduce(function (total, openBet) {
							return total + Number(openBet.wagerDetail.winAmount);
						}, 0);
						playerCurrentStatus = {
							creditPending: playerCreditPending,
							currentBalance: playerCurrentBalance,
							availableCredit: Number(player.defaultSetting.weeklyStartCredit) - Number(playerCreditPending) + Number(playerCurrentBalance)
						};
						playerOpenBetStatus = {
							straightBet: straightBetCounter || 0,
							parlayBet: parlayBetCounter || 0,
							teaserBet: teaserBetCounter || 0,
							reverseBet: reverseBetCounter || 0,
							totalBets: playerOpenBets.length || 0,
							totalRisk: totalRisk || 0,
							totalWin: totalWin || 0
						};
						_context.next = 22;
						return _Player2.default.findOneAndUpdate({ _id: _mongoose2.default.Types.ObjectId(playerId) }, { '$set': { currentStatus: playerCurrentStatus, openBetStatus: playerOpenBetStatus } }, { new: true }).then(function (result) {
							console.log(result);
						});

					case 22:
						return _context.abrupt('return', player.agent._id);

					case 25:
						_context.prev = 25;
						_context.t0 = _context['catch'](0);
						throw _context.t0;

					case 28:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 25]]);
	}));

	return function updatePlayerStatusAfterOrder(_x) {
		return _ref.apply(this, arguments);
	};
}();

exports.default = updatePlayerStatusAfterOrder;

// const playerOpenBets = await OpenBet.find({ 'owner.player': req.user._id }, 'orderType wagerDetail.riskAmount wagerDetail.winAmount')
// const playerHistoryBets = await HistoryBet.find({ 'owner.player': req.user._id, 'closedAt': {$gte: moment().startOf('isoWeek'), $lte: moment().endOf('isoWeek')} }, 'closedAt resultAmount')
// const playerCreditPending = playerOpenBets.reduce((total, openBet) => total + openBet.wagerDetail.riskAmount, 0)
// const playerCurrentBalance = playerHistoryBets.reduce((total, historyBet) => total + historyBet.resultAmount ,0)

// const playerCurrentStatus = {
// 	creditPending: playerCreditPending,
// 	currentBalance: playerCurrentBalance,
// 	availableCredit: Number(req.user.defaultSetting.weeklyStartCredit) - Number(playerCreditPending) + Number(playerCurrentBalance)
// }
// await Player.findOneAndUpdate({ _id: req.user._id }, {'$set': { currentStatus: playerCurrentStatus }})

// // const totalWin = playerOpenBets.reduce((total, openBet) => total + Number(openBet.wagerDetail.winAmount), 0)
// // const totalRisk = playerOpenBets.reduce((total, openBet) => total + Number(openBet.wagerDetail.riskAmount), 0)
// // const straightBetCounter = playerOpenBets.reduce((total, openBet) => total + ( openBet.orderType === 'Straight' ), 0)
// // const parlayBetCounter = playerOpenBets.reduce((total, openBet) => total + ( openBet.orderType === 'Parlay' ), 0)
// // const teaserBetCounter = playerOpenBets.reduce((total, openBet) => total + ( openBet.orderType === 'Teaser6040' || openBet.orderType === 'Teaser6545' || openBet.orderType === 'Teaser7050' || openBet.orderType === 'SuperTeaser' ), 0)  // indexOf
// // const reverseBetCounter = playerOpenBets.reduce((total, openBet) => total + ( openBet.orderType === 'ActionReverse' || openBet.orderType === 'WinReverse' ), 0)

// const playerAccount = {
// 	openBetStatus: {
// 		straightBet: straightBetCounter || 0,
// 		parlayBet: parlayBetCounter || 0,
// 		teaserBet: teaserBetCounter || 0,
// 		reverseBet: reverseBetCounter || 0,
// 		totalBets: playerOpenBets.length || 0,
// 		totalRisk: totalRisk || 0,
// 		totalWin: totalWin || 0
// 	},
// 	thisWeekHistoryBetList: playerHistoryBets
// }
//# sourceMappingURL=updatePlayerStatusAfterOrder.js.map