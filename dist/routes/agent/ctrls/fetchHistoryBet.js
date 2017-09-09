'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _BetOrder = require('../../../models/BetOrder');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var fetchHistoryBet = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
		var weekNum, historyBetList;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						weekNum = req.body.weekNum;
						_context.next = 4;
						return _BetOrder.HistoryBet.find({
							'owner.agent': req.user._id,
							'closedAt': { $gte: (0, _moment2.default)().subtract(weekNum, 'w').startOf('isoWeek'), $lte: (0, _moment2.default)().subtract(weekNum, 'w').endOf('isoWeek') }
						}).populate({
							path: 'owner.player',
							select: 'account.username'
						});

					case 4:
						historyBetList = _context.sent;

						res.json(historyBetList);
						_context.next = 11;
						break;

					case 8:
						_context.prev = 8;
						_context.t0 = _context['catch'](0);
						throw _context.t0;

					case 11:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 8]]);
	}));

	return function fetchHistoryBet(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

exports.default = fetchHistoryBet;
//# sourceMappingURL=fetchHistoryBet.js.map