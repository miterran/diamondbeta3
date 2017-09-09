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

var _Agent = require('../../models/Agent');

var _Agent2 = _interopRequireDefault(_Agent);

var _AgentTransaction = require('../../models/AgentTransaction');

var _AgentTransaction2 = _interopRequireDefault(_AgentTransaction);

var _saveNewHistoryBet = require('./utils/saveNewHistoryBet');

var _saveNewHistoryBet2 = _interopRequireDefault(_saveNewHistoryBet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var confirmResultTeaser = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(openBet) {
		var betOrderStatus, resultAmount, teamLength, eventsHaveWon, eventsHaveLost, eventsHavePush, eventsHavePostponed, eventsHaveCanceled, eventsHaveReview, eventsHavePending, allEventsWon, allEventsLost, allEventsPush, allEventsCanceled, allEventsPostponed, allEventsReview, allEventsPending, eventWonCounter, teaserOddLine, winAmount;
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
						allEventsReview = _lodash2.default.every(openBet.eventOdds, { status: 'Review' });
						allEventsPending = _lodash2.default.every(openBet.eventOdds, { status: 'Pending' });
						eventWonCounter = openBet.eventOdds.reduce(function (total, event) {
							return total + (event.status === 'Won');
						}, 0);

						if (!(openBet.orderType !== 'SuperTeaser')) {
							_context.next = 46;
							break;
						}

						_context.t0 = true;
						_context.next = _context.t0 === allEventsWon ? 22 : _context.t0 === allEventsLost ? 25 : _context.t0 === (!eventsHaveWon && !eventsHaveLost && !eventsHavePush && !eventsHavePending && (eventsHavePostponed || eventsHaveCanceled)) ? 28 : _context.t0 === allEventsPostponed ? 28 : _context.t0 === allEventsCanceled ? 28 : _context.t0 === eventsHaveLost ? 31 : _context.t0 === (teamLength === 2 && eventWonCounter === 1 && !eventsHaveLost && !eventsHaveReview && !eventsHavePending && (eventsHavePush || eventsHavePostponed || eventsHaveCanceled)) ? 35 : _context.t0 === allEventsPush ? 35 : _context.t0 === (eventsHaveWon && eventWonCounter > 1 && !eventsHaveLost && !eventsHaveReview && !eventsHavePending) ? 38 : 44;
						break;

					case 22:
						betOrderStatus = 'Won';
						resultAmount = openBet.wagerDetail.winAmount;
						return _context.abrupt('break', 46);

					case 25:
						betOrderStatus = 'Lost';
						resultAmount = -openBet.wagerDetail.riskAmount;
						return _context.abrupt('break', 46);

					case 28:
						betOrderStatus = 'Canceled';
						resultAmount = 0;
						return _context.abrupt('break', 46);

					case 31:
						betOrderStatus = 'Lost';
						resultAmount = -openBet.wagerDetail.riskAmount;
						openBet.eventOdds.map(function (event) {
							if (event.status !== 'Lost') {
								event.status = 'Closed';
							}
							return event;
						});
						return _context.abrupt('break', 46);

					case 35:
						betOrderStatus = 'Push';
						resultAmount = 0;
						return _context.abrupt('break', 46);

					case 38:
						teaserOddLine = Number((0, _teaserOddLineAdjust2.default)(openBet.orderType, eventWonCounter));
						winAmount = 0;


						if (teaserOddLine > 0) {
							winAmount = Math.round(openBet.wagerDetail.betAmount * teaserOddLine / 100);
						} else {
							winAmount = Math.round(openBet.wagerDetail.betAmount / Math.abs(teaserOddLine) * 100);
						}
						betOrderStatus = 'Won';
						resultAmount = Number(winAmount).toFixed();
						return _context.abrupt('break', 46);

					case 44:
						console.log(openBet.orderNumber + ' teaser not finished');
						return _context.abrupt('return', false);

					case 46:
						if (!(openBet.orderType === 'SuperTeaser')) {
							_context.next = 65;
							break;
						}

						_context.t1 = true;
						_context.next = _context.t1 === (allEventsWon && eventWonCounter === 3) ? 50 : _context.t1 === allEventsLost ? 53 : _context.t1 === (!eventsHaveWon && !eventsHaveLost && !eventsHavePush && !eventsHavePending && (eventsHavePostponed || eventsHaveCanceled)) ? 56 : _context.t1 === allEventsPostponed ? 56 : _context.t1 === allEventsCanceled ? 56 : _context.t1 === eventsHavePush ? 59 : _context.t1 === eventsHaveLost ? 59 : 63;
						break;

					case 50:
						betOrderStatus = 'Won';
						resultAmount = openBet.wagerDetail.winAmount;
						return _context.abrupt('break', 65);

					case 53:
						betOrderStatus = 'Lost';
						resultAmount = -openBet.wagerDetail.riskAmount;
						return _context.abrupt('break', 65);

					case 56:
						betOrderStatus = 'Canceled';
						resultAmount = 0;
						return _context.abrupt('break', 65);

					case 59:
						betOrderStatus = 'Lost';
						resultAmount = -openBet.wagerDetail.riskAmount;
						openBet.eventOdds.map(function (event) {
							if (event.status === 'Lost' || event.status === 'Push') {
								return;
							} else {
								event.status = 'Closed';
							}
							return event;
						});
						return _context.abrupt('break', 65);

					case 63:
						console.log(openBet.orderNumber + ' teaser not finished');
						return _context.abrupt('return', false);

					case 65:
						if (!(betOrderStatus !== 'TBD')) {
							_context.next = 71;
							break;
						}

						_context.next = 68;
						return (0, _saveNewHistoryBet2.default)(openBet, betOrderStatus, resultAmount);

					case 68:
						return _context.abrupt('return', true);

					case 71:
						return _context.abrupt('return', false);

					case 72:
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