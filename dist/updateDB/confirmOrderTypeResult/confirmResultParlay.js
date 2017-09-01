'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _BetOrder = require('../../models/BetOrder');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var confirmResultParlay = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(openBet) {
		var betOrderStatus, resultAmount, eventsHaveWon, eventsHaveLost, eventsHaveReview, eventsHavePending, allEventsWon, allEventsLost, allEventsPush, allEventsCanceled, allEventsPostponed, _openBet$wagerDetail, winAmount, riskAmount, parlayPoint, riskPoint, newHistoryBet;

		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						betOrderStatus = 'TBD';
						resultAmount = 0;
						eventsHaveWon = _lodash2.default.some(openBet.eventOdds, { status: 'Won' });
						eventsHaveLost = _lodash2.default.some(openBet.eventOdds, { status: 'Lost' });

						//	const eventsHavePush      = _.some(openBet.eventOdds, { status: 'Push' })
						//	const eventsHavePostponed = _.some(openBet.eventOdds, { status: 'Postponed' })
						//	const eventsHaveCanceled  = _.some(openBet.eventOdds, { status: 'Canceled' })

						eventsHaveReview = _lodash2.default.some(openBet.eventOdds, { status: 'Review' });
						eventsHavePending = _lodash2.default.some(openBet.eventOdds, { status: 'Pending' });
						allEventsWon = _lodash2.default.every(openBet.eventOdds, { status: 'Won' });
						allEventsLost = _lodash2.default.every(openBet.eventOdds, { status: 'Lost' });
						allEventsPush = _lodash2.default.every(openBet.eventOdds, { status: 'Push' });
						allEventsCanceled = _lodash2.default.every(openBet.eventOdds, { status: 'Postponed' });
						allEventsPostponed = _lodash2.default.every(openBet.eventOdds, { status: 'Canceled' });
						//	const allEventsReview     = _.every(openBet.eventOdds, { status: 'Review' })
						// const allEventsPending    = _.every(openBet.eventOdds, { status: 'Pending' })

						_openBet$wagerDetail = openBet.wagerDetail, winAmount = _openBet$wagerDetail.winAmount, riskAmount = _openBet$wagerDetail.riskAmount;

						winAmount = Number(winAmount);
						riskAmount = Number(riskAmount);

						_context.t0 = true;
						_context.next = _context.t0 === allEventsWon ? 17 : _context.t0 === allEventsLost ? 20 : _context.t0 === allEventsPush ? 23 : _context.t0 === allEventsCanceled ? 26 : _context.t0 === allEventsPostponed ? 29 : _context.t0 === eventsHaveLost ? 32 : _context.t0 === (eventsHaveWon && !eventsHaveLost && !eventsHaveReview && !eventsHavePending) ? 36 : 41;
						break;

					case 17:
						betOrderStatus = 'Won';
						resultAmount = winAmount;
						return _context.abrupt('break', 43);

					case 20:
						betOrderStatus = 'Lost';
						resultAmount = -riskAmount;
						return _context.abrupt('break', 43);

					case 23:
						betOrderStatus = 'Push';
						resultAmount = 0;
						return _context.abrupt('break', 43);

					case 26:
						betOrderStatus = 'Canceled';
						resultAmount = 0;
						return _context.abrupt('break', 43);

					case 29:
						betOrderStatus = 'Postponed';
						resultAmount = 0;
						return _context.abrupt('break', 43);

					case 32:
						betOrderStatus = 'Lost';
						resultAmount = -riskAmount;
						openBet.eventOdds.map(function (event) {
							if (event.status !== 'Lost') {
								event.status = 'Closed';
							}
							return event;
						});
						return _context.abrupt('break', 43);

					case 36:
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
						return _context.abrupt('break', 43);

					case 41:
						console.log(openBet.orderNumber + ' parlay not finished');
						return _context.abrupt('return', false);

					case 43:
						if (!(betOrderStatus !== 'TBD')) {
							_context.next = 52;
							break;
						}

						newHistoryBet = new _BetOrder.HistoryBet({
							orderNumber: openBet.orderNumber,
							orderType: openBet.orderType,
							owner: openBet.owner,
							wagerDetail: openBet.wagerDetail,
							status: betOrderStatus,
							resultAmount: resultAmount,
							eventOdds: openBet.eventOdds,
							createdAt: openBet.createdAt,
							closedAt: (0, _moment2.default)()
						});
						_context.next = 47;
						return newHistoryBet.save();

					case 47:
						console.log('saved history straight bet' + newHistoryBet.orderNumber);
						_context.next = 50;
						return _BetOrder.OpenBet.findOneAndRemove({ _id: openBet._id });

					case 50:
						console.log('deleted openbet ' + openBet.orderNumber);
						return _context.abrupt('return', true);

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