'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Player = require('../../../models/Player');

var _Player2 = _interopRequireDefault(_Player);

var _BetOrder = require('../../../models/BetOrder');

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var fetchPlayerStatus = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
		var player, thisWeekHistoryBetList, playerStatus;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;


						if (req.body.playerId === '') {
							res.json('');
						}

						_context.next = 4;
						return _Player2.default.findOne({ '_id': _mongoose2.default.Types.ObjectId(req.body.playerId) }, 'account.username account.activate defaultSetting currentStatus openBetStatus createdAt lastOnline');

					case 4:
						player = _context.sent;
						_context.next = 7;
						return _BetOrder.HistoryBet.find({ 'owner.player': _mongoose2.default.Types.ObjectId(req.body.playerId), 'closedAt': { $gte: (0, _moment2.default)().startOf('isoWeek'), $lte: (0, _moment2.default)().endOf('isoWeek') } }, 'closedAt resultAmount');

					case 7:
						thisWeekHistoryBetList = _context.sent;
						playerStatus = {
							account: player.account,
							defaultSetting: player.defaultSetting,
							currentStatus: player.currentStatus,
							openBetStatus: player.openBetStatus,
							thisWeekHistoryBetList: thisWeekHistoryBetList,
							createdAt: player.createdAt,
							lastOnline: player.lastOnline
						};

						res.json(playerStatus);
						_context.next = 15;
						break;

					case 12:
						_context.prev = 12;
						_context.t0 = _context['catch'](0);
						throw _context.t0;

					case 15:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 12]]);
	}));

	return function fetchPlayerStatus(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

exports.default = fetchPlayerStatus;
//# sourceMappingURL=fetchPlayerStatus.js.map