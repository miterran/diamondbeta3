'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Player = require('../../../models/Player');

var _Player2 = _interopRequireDefault(_Player);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _updatePlayerStatusAfterOrder = require('../../../updateDB/updateUser/updatePlayerStatusAfterOrder');

var _updatePlayerStatusAfterOrder2 = _interopRequireDefault(_updatePlayerStatusAfterOrder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var editPlayerSetting = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
		var _req$body, playerId, maxParlay, maxWin, maxWager, minRisk, weeklyStartCredit, playerPass, amountGap, playerNewState, player;

		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						_req$body = req.body, playerId = _req$body.playerId, maxParlay = _req$body.maxParlay, maxWin = _req$body.maxWin, maxWager = _req$body.maxWager, minRisk = _req$body.minRisk, weeklyStartCredit = _req$body.weeklyStartCredit, playerPass = _req$body.playerPass;
						amountGap = 10;
						_context.t0 = true;
						_context.next = _context.t0 === maxWager <= 500 ? 6 : _context.t0 === (maxWager > 500 && maxWager <= 1000) ? 8 : _context.t0 === (maxWager > 1000 && maxWager <= 3000) ? 10 : _context.t0 === maxWager > 3000 ? 12 : 14;
						break;

					case 6:
						//			case minRisk < 50:
						amountGap = 10;
						return _context.abrupt('break', 15);

					case 8:
						//			case minRisk >= 50 && minRisk < 100:
						amountGap = 20;
						return _context.abrupt('break', 15);

					case 10:
						//			case minRisk >= 100 && minRisk < 300:
						amountGap = 50;
						return _context.abrupt('break', 15);

					case 12:
						//			case minRisk >= 300:
						amountGap = 100;
						return _context.abrupt('break', 15);

					case 14:
						return _context.abrupt('return');

					case 15:
						playerNewState = {
							'defaultSetting.maxParlay': maxParlay,
							'defaultSetting.maxWin': maxWin,
							'defaultSetting.maxWager': maxWager,
							'defaultSetting.minRisk': minRisk,
							'defaultSetting.weeklyStartCredit': weeklyStartCredit,
							'defaultSetting.amountGap': amountGap
						};


						if (!_lodash2.default.isEmpty(playerPass.password)) playerNewState['account.password'] = playerPass.password;
						if (!_lodash2.default.isEmpty(playerPass.passcode)) playerNewState['account.passcode'] = playerPass.passcode;

						_context.next = 20;
						return _Player2.default.findOneAndUpdate({ '_id': _mongoose2.default.Types.ObjectId(playerId) }, { $set: playerNewState }, { new: true });

					case 20:
						player = _context.sent;
						_context.next = 23;
						return (0, _updatePlayerStatusAfterOrder2.default)(playerId);

					case 23:
						res.status(200).send('edit completed');
						_context.next = 29;
						break;

					case 26:
						_context.prev = 26;
						_context.t1 = _context['catch'](0);
						throw _context.t1;

					case 29:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 26]]);
	}));

	return function editPlayerSetting(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();
exports.default = editPlayerSetting;
//# sourceMappingURL=editPlayerSetting.js.map