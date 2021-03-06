'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _BetOrder = require('../../models/BetOrder');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _permutation = require('../../utils/permutation');

var _permutation2 = _interopRequireDefault(_permutation);

var _multiDimensionalUnique = require('../../utils/multiDimensionalUnique');

var _multiDimensionalUnique2 = _interopRequireDefault(_multiDimensionalUnique);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Agent = require('../../models/Agent');

var _Agent2 = _interopRequireDefault(_Agent);

var _AgentTransaction = require('../../models/AgentTransaction');

var _AgentTransaction2 = _interopRequireDefault(_AgentTransaction);

var _saveNewHistoryBet = require('./utils/saveNewHistoryBet');

var _saveNewHistoryBet2 = _interopRequireDefault(_saveNewHistoryBet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var confirmResultReverse = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(openBet) {
		var eventsHaveWon, eventsHaveLost, eventsHavePush, eventsHavePostponed, eventsHaveCanceled, eventsHaveReview, eventsHavePending, allEventsWon, allEventsLost, allEventsPush, allEventsCanceled, allEventsPostponed, allEventsReview, allEventsPending, betOrderStatus, resultAmount, teamLength, inOrder, orderList, betAmount;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
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

						betOrderStatus = 'TBD';
						resultAmount = 0;
						teamLength = _lodash2.default.range(openBet.eventOdds.length);
						inOrder = (0, _permutation2.default)(teamLength);
						orderList = (0, _multiDimensionalUnique2.default)(inOrder);
						betAmount = openBet.wagerDetail.betAmount;

						betAmount = Number(betAmount);

						if (allEventsCanceled || allEventsPostponed || !eventsHaveWon && !eventsHaveLost && !eventsHavePush && !eventsHavePending && (eventsHavePostponed || eventsHaveCanceled)) {
							betOrderStatus = 'Canceled';
							resultAmount = 0;
						} else if (!eventsHaveReview && !allEventsReview && !allEventsPending && !eventsHavePending) {
							orderList.forEach(function (list) {
								var _iteratorNormalCompletion = true;
								var _didIteratorError = false;
								var _iteratorError = undefined;

								try {
									for (var _iterator = list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
										var idx = _step.value;
										var _openBet$eventOdds$id = openBet.eventOdds[idx],
										    status = _openBet$eventOdds$id.status,
										    betDetail = _openBet$eventOdds$id.betDetail;

										switch (status) {
											case 'Won':
												var winAmount = 0;
												if (Number(betDetail.oddLine) > 0) {
													winAmount = Math.round(betAmount * Number(betDetail.oddLine) / 100);
												} else {
													winAmount = Math.round(betAmount / Math.abs(Number(betDetail.oddLine)) * 100);
												}
												resultAmount += winAmount;
												break;
											case 'Lost':
												resultAmount -= betAmount;
												return;
											case 'Push':
											case 'Canceled':
											case 'Postponed':
												if (openBet.orderType === 'ActionReverse') {
													break;
												}
												if (openBet.orderType === 'WinReverse') {
													return;
												}
											default:
												break;
										}
									}
								} catch (err) {
									_didIteratorError = true;
									_iteratorError = err;
								} finally {
									try {
										if (!_iteratorNormalCompletion && _iterator.return) {
											_iterator.return();
										}
									} finally {
										if (_didIteratorError) {
											throw _iteratorError;
										}
									}
								}
							});
							if (resultAmount === 0) {
								betOrderStatus = 'Push';
							}

							if (resultAmount > 0) {
								betOrderStatus = 'Won';
							}

							if (resultAmount < 0) {
								betOrderStatus = 'Lost';
							}
						}

						if (!(betOrderStatus !== 'TBD')) {
							_context.next = 28;
							break;
						}

						_context.next = 25;
						return (0, _saveNewHistoryBet2.default)(openBet, betOrderStatus, resultAmount);

					case 25:
						return _context.abrupt('return', true);

					case 28:
						return _context.abrupt('return', false);

					case 29:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function confirmResultReverse(_x) {
		return _ref.apply(this, arguments);
	};
}();

exports.default = confirmResultReverse;
//# sourceMappingURL=confirmResultReverse.js.map