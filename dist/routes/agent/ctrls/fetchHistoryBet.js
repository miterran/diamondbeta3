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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var fetchHistoryBet = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
		var _weekSummary;

		var weekNum, historyBetList, historyBets;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						console.log('hi');
						console.log(req.body);
						weekNum = req.body.weekNum;
						_context.next = 5;
						return _BetOrder.HistoryBet.find({ 'owner.agent': req.user._id, 'closedAt': { $gte: (0, _moment2.default)().subtract(weekNum, 'w').startOf('isoWeek'), $lte: (0, _moment2.default)().subtract(weekNum, 'w').endOf('isoWeek') } });

					case 5:
						historyBetList = _context.sent;
						historyBets = {
							historyBetList: historyBetList,
							weekSummary: (_weekSummary = {}, _defineProperty(_weekSummary, (0, _moment2.default)().startOf('isoWeek').subtract(weekNum, 'w').add(0, 'd').format('MMM DD'), { bets: 0, amount: 0 }), _defineProperty(_weekSummary, (0, _moment2.default)().startOf('isoWeek').subtract(weekNum, 'w').add(1, 'd').format('MMM DD'), { bets: 0, amount: 0 }), _defineProperty(_weekSummary, (0, _moment2.default)().startOf('isoWeek').subtract(weekNum, 'w').add(2, 'd').format('MMM DD'), { bets: 0, amount: 0 }), _defineProperty(_weekSummary, (0, _moment2.default)().startOf('isoWeek').subtract(weekNum, 'w').add(3, 'd').format('MMM DD'), { bets: 0, amount: 0 }), _defineProperty(_weekSummary, (0, _moment2.default)().startOf('isoWeek').subtract(weekNum, 'w').add(4, 'd').format('MMM DD'), { bets: 0, amount: 0 }), _defineProperty(_weekSummary, (0, _moment2.default)().startOf('isoWeek').subtract(weekNum, 'w').add(5, 'd').format('MMM DD'), { bets: 0, amount: 0 }), _defineProperty(_weekSummary, (0, _moment2.default)().startOf('isoWeek').subtract(weekNum, 'w').add(6, 'd').format('MMM DD'), { bets: 0, amount: 0 }), _weekSummary)
						};


						if (!_lodash2.default.isEmpty(historyBetList)) {
							historyBetList.forEach(function (historyBet) {
								historyBets.weekSummary[(0, _moment2.default)(historyBet.closedAt).format('MMM DD')].amount += Number(historyBet.resultAmount);
								historyBets.weekSummary[(0, _moment2.default)(historyBet.closedAt).format('MMM DD')].bets++;
							});
						}

						res.json(historyBets);

					case 9:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function fetchHistoryBet(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

exports.default = fetchHistoryBet;
//# sourceMappingURL=fetchHistoryBet.js.map