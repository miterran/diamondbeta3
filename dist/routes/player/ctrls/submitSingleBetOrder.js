'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _uniqid = require('uniqid');

var _uniqid2 = _interopRequireDefault(_uniqid);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _Player = require('../../../models/Player');

var _Player2 = _interopRequireDefault(_Player);

var _EventOdd = require('../../../models/EventOdd');

var _BetOrder = require('../../../models/BetOrder');

var _compareBetDetail = require('../../../utils/compareBetDetail');

var _compareBetDetail2 = _interopRequireDefault(_compareBetDetail);

var _updatePlayerStatusAfterOrder = require('../../../updateDB/utils/updatePlayerStatusAfterOrder');

var _updatePlayerStatusAfterOrder2 = _interopRequireDefault(_updatePlayerStatusAfterOrder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var submitSingleBetOrder = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(req, res) {
		var _req$body, eventOdds, wagerDetails, orderType;

		return regeneratorRuntime.wrap(function _callee5$(_context5) {
			while (1) {
				switch (_context5.prev = _context5.next) {
					case 0:
						_req$body = req.body, eventOdds = _req$body.eventOdds, wagerDetails = _req$body.wagerDetails, orderType = _req$body.orderType;

						Promise.all(eventOdds.map(function () {
							var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(event, eventIdx) {
								var eventTimeOut, existed, latestEvent;
								return regeneratorRuntime.wrap(function _callee$(_context) {
									while (1) {
										switch (_context.prev = _context.next) {
											case 0:
												eventTimeOut = (0, _moment2.default)().isSameOrAfter((0, _moment2.default)(event.cutOffTime).format());
												_context.next = 3;
												return _BetOrder.OpenBet.findOne({ 'owner.player': req.user._id, orderType: orderType, 'eventOdds.singlePickId': event.singlePickId });

											case 3:
												existed = _context.sent;
												_context.t0 = true;
												_context.next = _context.t0 === eventTimeOut ? 7 : _context.t0 === !_lodash2.default.isEmpty(existed) ? 10 : 14;
												break;

											case 7:
												event.status = 'TimeOut';
												delete event.betDetail;
												return _context.abrupt('break', 19);

											case 10:
												event.status = 'Existed';
												event.note = existed.orderNumber;
												delete event.betDetail;
												return _context.abrupt('break', 19);

											case 14:
												_context.next = 16;
												return _EventOdd.EventOdd.findOne({ eventOddId: event.eventOddId });

											case 16:
												latestEvent = _context.sent;

												if ((0, _compareBetDetail2.default)(event, latestEvent).betDetailMatch) {
													event.status = 'Pending';
													event.note = '';
												} else {
													event.status = 'HasUpdated';
													event.betDetailPrev = event.betDetail;
													event.betDetail = (0, _compareBetDetail2.default)(event, latestEvent).latestBetDetail;
												}
												return _context.abrupt('return');

											case 19:
												if (event.status !== 'Pending') {
													wagerDetails[event.singlePickId] = {
														betType: 'wager',
														betAmount: 0,
														riskAmount: 0,
														winAmount: 0,
														confirm: false
													};
												}
												return _context.abrupt('return', event);

											case 21:
											case 'end':
												return _context.stop();
										}
									}
								}, _callee, undefined);
							}));

							return function (_x3, _x4) {
								return _ref2.apply(this, arguments);
							};
						}())).then(_asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
							var submitCheckPass;
							return regeneratorRuntime.wrap(function _callee4$(_context4) {
								while (1) {
									switch (_context4.prev = _context4.next) {
										case 0:
											submitCheckPass = eventOdds.every(function (event) {
												return event.status === 'Pending';
											});

											if (submitCheckPass) {
												_context4.next = 5;
												break;
											}

											res.json({ eventOdds: eventOdds, wagerDetails: wagerDetails });
											_context4.next = 7;
											break;

										case 5:
											_context4.next = 7;
											return Promise.all(eventOdds.map(function () {
												var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(event) {
													var newOpenBet;
													return regeneratorRuntime.wrap(function _callee2$(_context2) {
														while (1) {
															switch (_context2.prev = _context2.next) {
																case 0:
																	newOpenBet = new _BetOrder.OpenBet({
																		orderNumber: _uniqid2.default.process().toUpperCase(),
																		orderType: orderType,
																		owner: {
																			player: req.user._id,
																			agent: req.user.agent,
																			superAgent: req.user.superAgent
																		},
																		wagerDetail: {
																			betType: wagerDetails[event.singlePickId].betType,
																			betAmount: wagerDetails[event.singlePickId].betAmount,
																			winAmount: wagerDetails[event.singlePickId].winAmount,
																			riskAmount: wagerDetails[event.singlePickId].riskAmount
																		},
																		status: 'Pending',
																		eventOdds: [event]
																	});
																	_context2.next = 3;
																	return newOpenBet.save().then(function () {
																		console.log('saved new openBet ' + newOpenBet.orderNumber);
																	}).catch(function (err) {
																		throw err;
																	});

																case 3:
																	return _context2.abrupt('return', null);

																case 4:
																case 'end':
																	return _context2.stop();
															}
														}
													}, _callee2, undefined);
												}));

												return function (_x5) {
													return _ref4.apply(this, arguments);
												};
											}())).then(_asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
												return regeneratorRuntime.wrap(function _callee3$(_context3) {
													while (1) {
														switch (_context3.prev = _context3.next) {
															case 0:
																_context3.next = 2;
																return (0, _updatePlayerStatusAfterOrder2.default)(req.user._id);

															case 2:
																res.json([]);

															case 3:
															case 'end':
																return _context3.stop();
														}
													}
												}, _callee3, undefined);
											}))).catch(function (err) {
												throw err;
											});

										case 7:
										case 'end':
											return _context4.stop();
									}
								}
							}, _callee4, undefined);
						}))).catch(function (err) {
							throw err;
						});

					case 2:
					case 'end':
						return _context5.stop();
				}
			}
		}, _callee5, undefined);
	}));

	return function submitSingleBetOrder(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

exports.default = submitSingleBetOrder;
//# sourceMappingURL=submitSingleBetOrder.js.map