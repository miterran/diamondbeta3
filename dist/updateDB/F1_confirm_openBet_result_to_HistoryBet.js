'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _BetOrder = require('../models/BetOrder');

var _updatePlayerStatusAfterOrder = require('./updateUser/updatePlayerStatusAfterOrder');

var _updatePlayerStatusAfterOrder2 = _interopRequireDefault(_updatePlayerStatusAfterOrder);

var _updateAgentOpenBetStatusAfterOrder = require('./updateUser/updateAgentOpenBetStatusAfterOrder');

var _updateAgentOpenBetStatusAfterOrder2 = _interopRequireDefault(_updateAgentOpenBetStatusAfterOrder);

var _confirmResultStraight = require('./confirmOrderTypeResult/confirmResultStraight');

var _confirmResultStraight2 = _interopRequireDefault(_confirmResultStraight);

var _confirmResultParlay = require('./confirmOrderTypeResult/confirmResultParlay');

var _confirmResultParlay2 = _interopRequireDefault(_confirmResultParlay);

var _confirmResultTeaser = require('./confirmOrderTypeResult/confirmResultTeaser');

var _confirmResultTeaser2 = _interopRequireDefault(_confirmResultTeaser);

var _confirmResultReverse = require('./confirmOrderTypeResult/confirmResultReverse');

var _confirmResultReverse2 = _interopRequireDefault(_confirmResultReverse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var confirm_OpenBet_result_to_HistoryBet = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
		var openBets;
		return regeneratorRuntime.wrap(function _callee6$(_context6) {
			while (1) {
				switch (_context6.prev = _context6.next) {
					case 0:
						_context6.prev = 0;
						_context6.next = 3;
						return _BetOrder.OpenBet.find({});

					case 3:
						openBets = _context6.sent;

						if (_lodash2.default.isEmpty(openBets)) {
							_context6.next = 7;
							break;
						}

						_context6.next = 7;
						return Promise.all(openBets.map(function () {
							var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(openBet) {
								var straightBetResult, parlayBetResult, teaserBetResult, reverseBetResult;
								return regeneratorRuntime.wrap(function _callee$(_context) {
									while (1) {
										switch (_context.prev = _context.next) {
											case 0:
												_context.t0 = openBet.orderType;
												_context.next = _context.t0 === 'Straight' ? 3 : _context.t0 === 'Parlay' ? 12 : _context.t0 === 'Teaser6040' ? 21 : _context.t0 === 'Teaser6545' ? 21 : _context.t0 === 'Teaser7050' ? 21 : _context.t0 === 'SuperTeaser' ? 21 : _context.t0 === 'WinReverse' ? 30 : _context.t0 === 'ActionReverse' ? 30 : 39;
												break;

											case 3:
												_context.next = 5;
												return (0, _confirmResultStraight2.default)(openBet);

											case 5:
												straightBetResult = _context.sent;

												if (!(straightBetResult === true)) {
													_context.next = 10;
													break;
												}

												return _context.abrupt('return', openBet.owner.player.toString());

											case 10:
												return _context.abrupt('return', null);

											case 11:
												return _context.abrupt('break', 40);

											case 12:
												_context.next = 14;
												return (0, _confirmResultParlay2.default)(openBet);

											case 14:
												parlayBetResult = _context.sent;

												if (!(parlayBetResult === true)) {
													_context.next = 19;
													break;
												}

												return _context.abrupt('return', openBet.owner.player.toString());

											case 19:
												return _context.abrupt('return', null);

											case 20:
												return _context.abrupt('break', 40);

											case 21:
												_context.next = 23;
												return (0, _confirmResultTeaser2.default)(openBet);

											case 23:
												teaserBetResult = _context.sent;

												if (!(teaserBetResult === true)) {
													_context.next = 28;
													break;
												}

												return _context.abrupt('return', openBet.owner.player.toString());

											case 28:
												return _context.abrupt('return', null);

											case 29:
												return _context.abrupt('break', 40);

											case 30:
												_context.next = 32;
												return (0, _confirmResultReverse2.default)(openBet);

											case 32:
												reverseBetResult = _context.sent;

												if (!(reverseBetResult === true)) {
													_context.next = 37;
													break;
												}

												return _context.abrupt('return', openBet.owner.player.toString());

											case 37:
												return _context.abrupt('return', null);

											case 38:
												return _context.abrupt('break', 40);

											case 39:
												return _context.abrupt('return', null);

											case 40:
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
							var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(playerIds) {
								var playerIdArr;
								return regeneratorRuntime.wrap(function _callee5$(_context5) {
									while (1) {
										switch (_context5.prev = _context5.next) {
											case 0:
												playerIdArr = _lodash2.default.compact(_lodash2.default.uniq(playerIds));

												if (_lodash2.default.isEmpty(playerIdArr)) {
													_context5.next = 7;
													break;
												}

												console.log('update following players ' + playerIdArr);
												_context5.next = 5;
												return Promise.all(playerIdArr.map(function () {
													var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(playerId) {
														var agentId;
														return regeneratorRuntime.wrap(function _callee2$(_context2) {
															while (1) {
																switch (_context2.prev = _context2.next) {
																	case 0:
																		_context2.next = 2;
																		return (0, _updatePlayerStatusAfterOrder2.default)(playerId);

																	case 2:
																		agentId = _context2.sent;

																		console.log(agentId);
																		return _context2.abrupt('return', agentId.toString());

																	case 5:
																	case 'end':
																		return _context2.stop();
																}
															}
														}, _callee2, undefined);
													}));

													return function (_x3) {
														return _ref4.apply(this, arguments);
													};
												}())).then(function () {
													var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(agentIds) {
														var agentIdArr;
														return regeneratorRuntime.wrap(function _callee4$(_context4) {
															while (1) {
																switch (_context4.prev = _context4.next) {
																	case 0:
																		agentIdArr = _lodash2.default.uniq(agentIds);

																		console.log('update following agent ' + agentIdArr);
																		_context4.next = 4;
																		return Promise.all(agentIdArr.map(function () {
																			var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(agentId) {
																				return regeneratorRuntime.wrap(function _callee3$(_context3) {
																					while (1) {
																						switch (_context3.prev = _context3.next) {
																							case 0:
																								_context3.next = 2;
																								return (0, _updateAgentOpenBetStatusAfterOrder2.default)(agentId);

																							case 2:
																								return _context3.abrupt('return', null);

																							case 3:
																							case 'end':
																								return _context3.stop();
																						}
																					}
																				}, _callee3, undefined);
																			}));

																			return function (_x5) {
																				return _ref6.apply(this, arguments);
																			};
																		}()));

																	case 4:
																	case 'end':
																		return _context4.stop();
																}
															}
														}, _callee4, undefined);
													}));

													return function (_x4) {
														return _ref5.apply(this, arguments);
													};
												}());

											case 5:
												_context5.next = 8;
												break;

											case 7:
												console.log('no players need to update');

											case 8:
											case 'end':
												return _context5.stop();
										}
									}
								}, _callee5, undefined);
							}));

							return function (_x2) {
								return _ref3.apply(this, arguments);
							};
						}());

					case 7:
						_context6.next = 12;
						break;

					case 9:
						_context6.prev = 9;
						_context6.t0 = _context6['catch'](0);
						throw _context6.t0;

					case 12:
					case 'end':
						return _context6.stop();
				}
			}
		}, _callee6, undefined, [[0, 9]]);
	}));

	return function confirm_OpenBet_result_to_HistoryBet() {
		return _ref.apply(this, arguments);
	};
}();

exports.default = confirm_OpenBet_result_to_HistoryBet;
//# sourceMappingURL=F1_confirm_openBet_result_to_HistoryBet.js.map