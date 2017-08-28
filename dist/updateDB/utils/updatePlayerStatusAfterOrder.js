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
		var player, playerOpenBets, playerHistoryBets, playerCreditPending, playerCurrentBalance, playerCurrentStatus;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						_context.next = 3;
						return _Player2.default.findOne({ _id: _mongoose2.default.Types.ObjectId(playerId) }, 'defaultSetting.weeklyStartCredit');

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
						playerCurrentStatus = {
							creditPending: playerCreditPending,
							currentBalance: playerCurrentBalance,
							availableCredit: player.defaultSetting.weeklyStartCredit - playerCreditPending + playerCurrentBalance
						};
						_context.next = 15;
						return _Player2.default.findOneAndUpdate({ _id: _mongoose2.default.Types.ObjectId(playerId) }, { '$set': { currentStatus: playerCurrentStatus } }, { new: true }).then(function (result) {
							console.log(result);
						});

					case 15:
						_context.next = 20;
						break;

					case 17:
						_context.prev = 17;
						_context.t0 = _context['catch'](0);
						throw _context.t0;

					case 20:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 17]]);
	}));

	return function updatePlayerStatusAfterOrder(_x) {
		return _ref.apply(this, arguments);
	};
}();

exports.default = updatePlayerStatusAfterOrder;
//# sourceMappingURL=updatePlayerStatusAfterOrder.js.map