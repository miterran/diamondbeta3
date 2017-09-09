'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _BetOrder = require('../../models/BetOrder');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

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

var confirmResultParlay = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(openBet) {
		var betOrderStatus, resultAmount, eventsHaveWon, eventsHaveLost, eventsHavePush, eventsHavePostponed, eventsHaveCanceled, eventsHaveReview, eventsHavePending, allEventsWon, allEventsLost, allEventsPush, allEventsCanceled, allEventsPostponed, allEventsReview, allEventsPending, _openBet$wagerDetail, winAmount, riskAmount, parlayPoint, riskPoint;

		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						betOrderStatus = 'TBD';
						resultAmount = 0;
						eventsHaveWon = _lodash2.default.some(openBet.eventOdds, { status: 'Won' });
						eventsHaveLost = _lodash2.default.some(openBet.eventOdds, { status: 'Lost' });
						eventsHavePush = _lodash2.default.some(openBet.eventOdds, { status: 'Push' });
						eventsHavePostponed = _lodash2.default.some(openBet.eventOdds, { status: 'Postponed' });
						eventsHaveCanceled = _lodash2.default.some(openBet.eventOdds, { status: 'Canceled' });
						eventsHaveReview = _lodash2.default.some(openBet.eventOdds, { status: 'Review' });
						eventsHavePending = _lodash2.default.some(openBet.eventOdds, { status: 'Pending' });
						allEventsWon = _lodash2.default.every(openBet.eventOdds, { status: 'Won' });
						allEventsLost = _lodash2.default.every(openBet.eventOdds, { status: 'Lost' });
						allEventsPush = _lodash2.default.every(openBet.eventOdds, { status: 'Push' });
						allEventsCanceled = _lodash2.default.every(openBet.eventOdds, { status: 'Postponed' });
						allEventsPostponed = _lodash2.default.every(openBet.eventOdds, { status: 'Canceled' });
						allEventsReview = _lodash2.default.every(openBet.eventOdds, { status: 'Review' });
						allEventsPending = _lodash2.default.every(openBet.eventOdds, { status: 'Pending' });

						//case !eventsHaveWon && !eventsHaveLost && !eventsHavePush && !eventsHavePending && ( eventsHavePostponed || eventsHaveCanceled ):

						_openBet$wagerDetail = openBet.wagerDetail, winAmount = _openBet$wagerDetail.winAmount, riskAmount = _openBet$wagerDetail.riskAmount;

						winAmount = Number(winAmount);
						riskAmount = Number(riskAmount);

						_context.t0 = true;
						_context.next = _context.t0 === allEventsWon ? 22 : _context.t0 === allEventsLost ? 25 : _context.t0 === allEventsPush ? 28 : _context.t0 === (!eventsHaveWon && !eventsHaveLost && !eventsHavePush && !eventsHavePending && (eventsHavePostponed || eventsHaveCanceled)) ? 31 : _context.t0 === allEventsPostponed ? 31 : _context.t0 === allEventsCanceled ? 31 : _context.t0 === eventsHaveLost ? 34 : _context.t0 === (eventsHaveWon && !eventsHaveLost && !eventsHaveReview && !eventsHavePending) ? 38 : 43;
						break;

					case 22:
						betOrderStatus = 'Won';
						resultAmount = winAmount;
						return _context.abrupt('break', 45);

					case 25:
						betOrderStatus = 'Lost';
						resultAmount = -riskAmount;
						return _context.abrupt('break', 45);

					case 28:
						betOrderStatus = 'Push';
						resultAmount = 0;
						return _context.abrupt('break', 45);

					case 31:
						betOrderStatus = 'Canceled';
						resultAmount = 0;
						return _context.abrupt('break', 45);

					case 34:
						betOrderStatus = 'Lost';
						resultAmount = -riskAmount;
						openBet.eventOdds.map(function (event) {
							if (event.status !== 'Lost') {
								event.status = 'Closed';
							}
							return event;
						});
						return _context.abrupt('break', 45);

					case 38:
						parlayPoint = _lodash2.default.compact(openBet.eventOdds.map(function (event) {
							var oddLine = event.betDetail.oddLine;

							oddLine = Number(oddLine);
							if (event.status === 'Won') {
								if (oddLine > 0) {
									return (oddLine + 100) / 100;
								} else {
									return (Math.abs(oddLine) + 100) / Math.abs(oddLine);
								}
							} else {
								return null;
							}
						}));
						riskPoint = parlayPoint.reduce(function (a, b) {
							return Number(a) * Number(b);
						});

						resultAmount = ((riskAmount * riskPoint - riskAmount) * 1).toFixed();
						betOrderStatus = 'Won';
						return _context.abrupt('break', 45);

					case 43:
						console.log(openBet.orderNumber + ' parlay not finished');
						return _context.abrupt('return', false);

					case 45:
						if (!(betOrderStatus !== 'TBD')) {
							_context.next = 51;
							break;
						}

						_context.next = 48;
						return (0, _saveNewHistoryBet2.default)(openBet, betOrderStatus, resultAmount);

					case 48:
						return _context.abrupt('return', true);

					case 51:
						return _context.abrupt('return', false);

					case 52:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function confirmResultParlay(_x) {
		return _ref.apply(this, arguments);
	};
}();

exports.default = confirmResultParlay;
//# sourceMappingURL=confirmResultParlay.js.map