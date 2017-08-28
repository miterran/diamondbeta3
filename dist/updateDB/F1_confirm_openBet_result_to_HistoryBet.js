'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Player = require('../models/Player');

var _Player2 = _interopRequireDefault(_Player);

var _BetOrder = require('../models/BetOrder');

var _updatePlayerStatusAfterOrder = require('./utils/updatePlayerStatusAfterOrder');

var _updatePlayerStatusAfterOrder2 = _interopRequireDefault(_updatePlayerStatusAfterOrder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var confirm_OpenBet_result_to_HistoryBet = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
		var openBets;
		return regeneratorRuntime.wrap(function _callee4$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						_context4.prev = 0;
						_context4.next = 3;
						return _BetOrder.OpenBet.find({});

					case 3:
						openBets = _context4.sent;

						if (_lodash2.default.isEmpty(openBets)) {
							next();
						}

						_context4.next = 7;
						return Promise.all(openBets.map(function () {
							var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(openBet) {
								var eventsHaveWon, eventsHaveLost, eventsHaveWonHalf, eventsHaveLostHalf, eventsHavePush, eventsHavePostponed, eventsHaveCanceled, eventsHaveReview, eventsHavePending, allEventsWon, allEventsLost, allEventsWonHalf, allEventsLostHalf, allEventsPush, allEventsCanceled, allEventsPostponed, allEventsReview, allEventsPending, betOrderStatus, resultAmount, parlayPoint, riskPoint, newHistoryBet;
								return regeneratorRuntime.wrap(function _callee$(_context) {
									while (1) {
										switch (_context.prev = _context.next) {
											case 0:
												eventsHaveWon = _lodash2.default.some(openBet.eventOdds, { status: 'Won' });
												eventsHaveLost = _lodash2.default.some(openBet.eventOdds, { status: 'Lost' });
												eventsHaveWonHalf = _lodash2.default.some(openBet.eventOdds, { status: 'Won Half' });
												eventsHaveLostHalf = _lodash2.default.some(openBet.eventOdds, { status: 'Lost Half' });
												eventsHavePush = _lodash2.default.some(openBet.eventOdds, { status: 'Push' });
												eventsHavePostponed = _lodash2.default.some(openBet.eventOdds, { status: 'Postponed' });
												eventsHaveCanceled = _lodash2.default.some(openBet.eventOdds, { status: 'Canceled' });
												eventsHaveReview = _lodash2.default.some(openBet.eventOdds, { status: 'Review' });
												eventsHavePending = _lodash2.default.some(openBet.eventOdds, { status: 'Pending' });
												allEventsWon = openBet.eventOdds.every(function (event) {
													return event.status === 'Won';
												});
												allEventsLost = openBet.eventOdds.every(function (event) {
													return event.status === 'Lost';
												});
												allEventsWonHalf = openBet.eventOdds.every(function (event) {
													return event.status === 'Won Half';
												});
												allEventsLostHalf = openBet.eventOdds.every(function (event) {
													return event.status === 'Lost Half';
												});
												allEventsPush = openBet.eventOdds.every(function (event) {
													return event.status === 'Push';
												});
												allEventsCanceled = openBet.eventOdds.every(function (event) {
													return event.status === 'Canceled';
												});
												allEventsPostponed = openBet.eventOdds.every(function (event) {
													return event.status === 'Postponed';
												});
												allEventsReview = openBet.eventOdds.every(function (event) {
													return event.status === 'Review';
												});
												allEventsPending = openBet.eventOdds.every(function (event) {
													return event.status === 'Pending';
												});
												betOrderStatus = 'TBD';
												resultAmount = 0;

												// dont know why switch() doesn't working here with array every boolean

												if (allEventsWon) {
													betOrderStatus = 'Won';
													resultAmount = openBet.wagerDetail.winAmount;
												} else if (allEventsLost) {
													betOrderStatus = 'Lost';
													resultAmount = -openBet.wagerDetail.riskAmount;
												} else if (allEventsWonHalf) {
													betOrderStatus = 'Won Half';
													resultAmount = (openBet.wagerDetail.winAmount / 2).toFixed();
												} else if (allEventsLostHalf) {
													betOrderStatus = 'Lost Half';
													resultAmount = -(openBet.wagerDetail.riskAmount / 2).toFixed();
												} else if (allEventsPush) {
													betOrderStatus = 'Push';
													resultAmount = 0;
												} else if (allEventsCanceled) {
													betOrderStatus = 'Canceled';
													resultAmount = 0;
												} else if (allEventsPostponed) {
													betOrderStatus = 'Postponed';
													resultAmount = 0;
												} else {
													betOrderStatus = 'TBD';
													resultAmount = 0;
												}

												if (!(openBet.orderType === 'Parlay')) {
													_context.next = 35;
													break;
												}

												_context.t0 = true;
												_context.next = _context.t0 === eventsHaveLost ? 25 : _context.t0 === (eventsHaveWon && !eventsHaveLost && !eventsHaveReview && !eventsHavePending) ? 29 : 34;
												break;

											case 25:
												betOrderStatus = 'Lost';
												resultAmount = -openBet.wagerDetail.riskAmount;
												openBet.eventOdds.map(function (event) {
													if (event.status !== 'Lost') {
														event.status = 'Closed';
													}
													return event;
												});
												return _context.abrupt('break', 35);

											case 29:
												parlayPoint = _lodash2.default.compact(openBet.eventOdds.map(function (event) {
													if (event.status === 'Won') {
														if (event.betDetail.oddLine > 0) {
															return (event.betDetail.oddLine + 100) / 100;
														} else {
															return (Math.abs(event.betDetail.oddLine) + 100) / Math.abs(event.betDetail.oddLine);
														}
													}
													return null;
												}));
												riskPoint = parlayPoint.reduce(function (a, b) {
													return a * b;
												});

												resultAmount = ((openBet.wagerDetail.riskAmount * riskPoint - openBet.wagerDetail.riskAmount) * 1).toFixed();
												betOrderStatus = 'Won';
												return _context.abrupt('break', 35);

											case 34:
												return _context.abrupt('return');

											case 35:
												if (!(betOrderStatus !== 'TBD')) {
													_context.next = 46;
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
												_context.next = 39;
												return newHistoryBet.save();

											case 39:
												console.log('saved history bet' + newHistoryBet.orderNumber);
												_context.next = 42;
												return _BetOrder.OpenBet.findOneAndRemove({ _id: openBet._id });

											case 42:
												console.log('deleted openbet ' + openBet.orderNumber);
												return _context.abrupt('return', JSON.parse(JSON.stringify(openBet.owner.player)));

											case 46:
												console.log(openBet.orderNumber + ' not finished');

											case 47:
												return _context.abrupt('return', null);

											case 48:
											case 'end':
												return _context.stop();
										}
									}
								}, _callee, undefined);
							}));

							return function (_x) {
								return _ref2.apply(this, arguments);
							};
						}())).then(function () {
							var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(playerIds) {
								var playerIdArr;
								return regeneratorRuntime.wrap(function _callee3$(_context3) {
									while (1) {
										switch (_context3.prev = _context3.next) {
											case 0:
												playerIdArr = _lodash2.default.compact([].concat(_toConsumableArray(new Set(playerIds))));

												if (_lodash2.default.isEmpty(playerIdArr)) {
													_context3.next = 8;
													break;
												}

												console.log('update following players');
												console.log(playerIdArr);
												_context3.next = 6;
												return Promise.all(playerIdArr.map(function () {
													var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(playerId) {
														return regeneratorRuntime.wrap(function _callee2$(_context2) {
															while (1) {
																switch (_context2.prev = _context2.next) {
																	case 0:
																		_context2.next = 2;
																		return (0, _updatePlayerStatusAfterOrder2.default)(playerId);

																	case 2:
																		console.log('updated' + playerId);
																		return _context2.abrupt('return', null);

																	case 4:
																	case 'end':
																		return _context2.stop();
																}
															}
														}, _callee2, undefined);
													}));

													return function (_x3) {
														return _ref4.apply(this, arguments);
													};
												}())).catch(function (err) {
													throw err;
												});

											case 6:
												_context3.next = 9;
												break;

											case 8:
												console.log('no players need to update');

											case 9:
											case 'end':
												return _context3.stop();
										}
									}
								}, _callee3, undefined);
							}));

							return function (_x2) {
								return _ref3.apply(this, arguments);
							};
						}()).catch(function (err) {
							throw err;
						});

					case 7:
						_context4.next = 12;
						break;

					case 9:
						_context4.prev = 9;
						_context4.t0 = _context4['catch'](0);
						throw _context4.t0;

					case 12:
					case 'end':
						return _context4.stop();
				}
			}
		}, _callee4, undefined, [[0, 9]]);
	}));

	return function confirm_OpenBet_result_to_HistoryBet() {
		return _ref.apply(this, arguments);
	};
}();

exports.default = confirm_OpenBet_result_to_HistoryBet;
//# sourceMappingURL=F1_confirm_openBet_result_to_HistoryBet.js.map