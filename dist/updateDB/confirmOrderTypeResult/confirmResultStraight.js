'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _BetOrder = require('../../models/BetOrder');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _Agent = require('../../models/Agent');

var _Agent2 = _interopRequireDefault(_Agent);

var _AgentTransaction = require('../../models/AgentTransaction');

var _AgentTransaction2 = _interopRequireDefault(_AgentTransaction);

var _saveNewHistoryBet = require('./utils/saveNewHistoryBet');

var _saveNewHistoryBet2 = _interopRequireDefault(_saveNewHistoryBet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var confirmResultStraight = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(openBet) {
		var betOrderStatus, resultAmount;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						betOrderStatus = 'TBD';
						resultAmount = 0;
						_context.t0 = openBet.eventOdds[0].status;
						_context.next = _context.t0 === 'Won' ? 5 : _context.t0 === 'Lost' ? 8 : _context.t0 === 'Won Half' ? 11 : _context.t0 === 'Lost Half' ? 14 : _context.t0 === 'Push' ? 17 : _context.t0 === 'Postponed' ? 20 : _context.t0 === 'Canceled' ? 20 : 23;
						break;

					case 5:
						betOrderStatus = 'Won';
						resultAmount = Number(openBet.wagerDetail.winAmount);
						return _context.abrupt('break', 25);

					case 8:
						betOrderStatus = 'Lost';
						resultAmount = -Number(openBet.wagerDetail.riskAmount);
						return _context.abrupt('break', 25);

					case 11:
						betOrderStatus = 'Won';
						resultAmount = (Number(openBet.wagerDetail.winAmount) / 2).toFixed();
						return _context.abrupt('break', 25);

					case 14:
						betOrderStatus = 'Lost';
						resultAmount = -(Number(openBet.wagerDetail.riskAmount) / 2).toFixed();
						return _context.abrupt('break', 25);

					case 17:
						betOrderStatus = 'Push';
						resultAmount = 0;
						return _context.abrupt('break', 25);

					case 20:
						betOrderStatus = 'Canceled';
						resultAmount = 0;
						return _context.abrupt('break', 25);

					case 23:
						console.log(openBet.orderNumber + ' straight not finished');
						return _context.abrupt('return', false);

					case 25:
						if (!(betOrderStatus !== 'TBD')) {
							_context.next = 31;
							break;
						}

						_context.next = 28;
						return (0, _saveNewHistoryBet2.default)(openBet, betOrderStatus, resultAmount);

					case 28:
						return _context.abrupt('return', true);

					case 31:
						return _context.abrupt('return', false);

					case 32:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function confirmResultStraight(_x) {
		return _ref.apply(this, arguments);
	};
}();

exports.default = confirmResultStraight;
//# sourceMappingURL=confirmResultStraight.js.map