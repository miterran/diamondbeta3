'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _BetOrder = require('../../models/BetOrder');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _teaserOddLineAdjust = require('./utils/teaserOddLineAdjust');

var _teaserOddLineAdjust2 = _interopRequireDefault(_teaserOddLineAdjust);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var confirmResultTeaser = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(openBet) {
		var betOrderStatus, resultAmount, teamLength, eventsHaveWon, eventsHaveLost, eventsHavePush, eventsHavePostponed, eventsHaveCanceled, eventsHaveReview, eventsHavePending, allEventsWon, allEventsLost, allEventsPush, allEventsCanceled, allEventsPostponed, eventWonNum, teaserOddLine, winAmount, newHistoryBet;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						betOrderStatus = 'TBD';
						resultAmount = 0;
						teamLength = openBet.eventOdds.length;
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
						//	const allEventsReview     = _.every(openBet.eventOdds, { status: 'Review' })
						// const allEventsPending    = _.every(openBet.eventOdds, { status: 'Pending' })

						eventWonNum = 0;

						openBet.eventOdds.map(function (event) {
							if (event.status === 'Won') eventWonNum++;
							return;
						});

						if (!(openBet.orderType !== 'SuperTeaser')) {
							_context.next = 48;
							break;
						}

						_context.t0 = true;
						_context.next = _context.t0 === allEventsWon ? 21 : _context.t0 === allEventsLost ? 24 : _context.t0 === allEventsCanceled ? 27 : _context.t0 === allEventsPostponed ? 30 : _context.t0 === eventsHaveLost ? 33 : _context.t0 === (teamLength === 2 && eventWonNum === 1 && !eventsHaveLost && !eventsHaveReview && !eventsHavePending && (eventsHavePush || eventsHavePostponed || eventsHaveCanceled)) ? 37 : _context.t0 === allEventsPush ? 37 : _context.t0 === (eventsHaveWon && eventWonNum > 1 && !eventsHaveLost && !eventsHaveReview && !eventsHavePending) ? 40 : 46;
						break;

					case 21:
						betOrderStatus = 'Won';
						resultAmount = openBet.wagerDetail.winAmount;
						return _context.abrupt('break', 48);

					case 24:
						betOrderStatus = 'Lost';
						resultAmount = -openBet.wagerDetail.riskAmount;
						return _context.abrupt('break', 48);

					case 27:
						betOrderStatus = 'Canceled';
						resultAmount = 0;
						return _context.abrupt('break', 48);

					case 30:
						betOrderStatus = 'Postponed';
						resultAmount = 0;
						return _context.abrupt('break', 48);

					case 33:
						betOrderStatus = 'Lost';
						resultAmount = -openBet.wagerDetail.riskAmount;
						openBet.eventOdds.map(function (event) {
							if (event.status !== 'Lost') {
								event.status = 'Closed';
							}
							return event;
						});
						return _context.abrupt('break', 48);

					case 37:
						betOrderStatus = 'Push';
						resultAmount = 0;
						return _context.abrupt('break', 48);

					case 40:
						teaserOddLine = Number((0, _teaserOddLineAdjust2.default)(openBet.orderType, eventWonNum));
						winAmount = 0;


						if (teaserOddLine > 0) {
							winAmount = Math.round(openBet.wagerDetail.betAmount * teaserOddLine / 100);
						} else {
							winAmount = Math.round(openBet.wagerDetail.betAmount / Math.abs(teaserOddLine) * 100);
						}
						betOrderStatus = 'Won';
						resultAmount = Number(winAmount).toFixed();
						return _context.abrupt('break', 48);

					case 46:
						console.log(openBet.orderNumber + ' teaser not finished');
						return _context.abrupt('return', false);

					case 48:
						if (!(openBet.orderType === 'SuperTeaser')) {
							_context.next = 70;
							break;
						}

						_context.t1 = true;
						_context.next = _context.t1 === (allEventsWon && eventWonNum === 3) ? 52 : _context.t1 === allEventsLost ? 55 : _context.t1 === allEventsCanceled ? 58 : _context.t1 === allEventsPostponed ? 61 : _context.t1 === (eventsHaveLost || eventsHavePush) ? 64 : 68;
						break;

					case 52:
						betOrderStatus = 'Won';
						resultAmount = openBet.wagerDetail.winAmount;
						return _context.abrupt('break', 70);

					case 55:
						betOrderStatus = 'Lost';
						resultAmount = -openBet.wagerDetail.riskAmount;
						return _context.abrupt('break', 70);

					case 58:
						betOrderStatus = 'Canceled';
						resultAmount = 0;
						return _context.abrupt('break', 70);

					case 61:
						betOrderStatus = 'Postponed';
						resultAmount = 0;
						return _context.abrupt('break', 70);

					case 64:
						betOrderStatus = 'Lost';
						resultAmount = -openBet.wagerDetail.riskAmount;
						openBet.eventOdds.map(function (event) {
							if (event.status !== 'Lost' || event.status !== 'Push') {
								event.status = 'Closed';
							}
							return event;
						});
						return _context.abrupt('break', 70);

					case 68:
						console.log(openBet.orderNumber + ' teaser not finished');
						return _context.abrupt('return', false);

					case 70:
						if (!(betOrderStatus !== 'TBD')) {
							_context.next = 79;
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
						_context.next = 74;
						return newHistoryBet.save();

					case 74:
						console.log('saved history teaser bet' + newHistoryBet.orderNumber);
						_context.next = 77;
						return _BetOrder.OpenBet.findOneAndRemove({ _id: openBet._id });

					case 77:
						console.log('deleted openbet ' + openBet.orderNumber);
						return _context.abrupt('return', true);

					case 79:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function confirmResultTeaser(_x) {
		return _ref.apply(this, arguments);
	};
}();

exports.default = confirmResultTeaser;
//# sourceMappingURL=confirmResultTeaser.js.map