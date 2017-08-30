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
		var betOrderStatus, resultAmount, eventsHaveWon, eventsHaveLost, eventsHaveReview, eventsHavePending, allEventsWon, allEventsLost, allEventsPush, allEventsCanceled, allEventsPostponed, parlayPoint, riskPoint, newHistoryBet;
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

						_context.t0 = true;
						_context.next = _context.t0 === allEventsWon ? 14 : _context.t0 === allEventsLost ? 17 : _context.t0 === allEventsPush ? 20 : _context.t0 === allEventsCanceled ? 23 : _context.t0 === allEventsPostponed ? 26 : _context.t0 === eventsHaveLost ? 29 : _context.t0 === (eventsHaveWon && !eventsHaveLost && !eventsHaveReview && !eventsHavePending) ? 33 : 38;
						break;

					case 14:
						betOrderStatus = 'Won';
						resultAmount = openBet.wagerDetail.winAmount;
						return _context.abrupt('break', 40);

					case 17:
						betOrderStatus = 'Lost';
						resultAmount = -openBet.wagerDetail.riskAmount;
						return _context.abrupt('break', 40);

					case 20:
						betOrderStatus = 'Push';
						resultAmount = 0;
						return _context.abrupt('break', 40);

					case 23:
						betOrderStatus = 'Canceled';
						resultAmount = 0;
						return _context.abrupt('break', 40);

					case 26:
						betOrderStatus = 'Postponed';
						resultAmount = 0;
						return _context.abrupt('break', 40);

					case 29:
						betOrderStatus = 'Lost';
						resultAmount = -openBet.wagerDetail.riskAmount;
						openBet.eventOdds.map(function (event) {
							if (event.status !== 'Lost') {
								event.status = 'Closed';
							}
							return event;
						});
						return _context.abrupt('break', 40);

					case 33:
						parlayPoint = _lodash2.default.compact(openBet.eventOdds.map(function (event) {
							if (event.status === 'Won') {
								if (event.betDetail.oddLine > 0) {
									return (event.betDetail.oddLine + 100) / 100;
								} else {
									return (Math.abs(event.betDetail.oddLine) + 100) / Math.abs(event.betDetail.oddLine);
								}
							} else {
								return null;
							}
						}));
						riskPoint = parlayPoint.reduce(function (a, b) {
							return a * b;
						});

						resultAmount = ((openBet.wagerDetail.riskAmount * riskPoint - openBet.wagerDetail.riskAmount) * 1).toFixed();
						betOrderStatus = 'Won';
						return _context.abrupt('break', 40);

					case 38:
						console.log(openBet.orderNumber + ' parlay not finished');
						return _context.abrupt('return', false);

					case 40:
						if (!(betOrderStatus !== 'TBD')) {
							_context.next = 49;
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
						_context.next = 44;
						return newHistoryBet.save();

					case 44:
						console.log('saved history straight bet' + newHistoryBet.orderNumber);
						_context.next = 47;
						return _BetOrder.OpenBet.findOneAndRemove({ _id: openBet._id });

					case 47:
						console.log('deleted openbet ' + openBet.orderNumber);
						return _context.abrupt('return', true);

					case 49:
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