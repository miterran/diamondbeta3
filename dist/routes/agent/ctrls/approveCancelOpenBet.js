'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _BetOrder = require('../../../models/BetOrder');

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _updatePlayerStatusAfterOrder = require('../../../updateDB/updateUser/updatePlayerStatusAfterOrder');

var _updatePlayerStatusAfterOrder2 = _interopRequireDefault(_updatePlayerStatusAfterOrder);

var _updateAgentOpenBetStatusAfterOrder = require('../../../updateDB/updateUser/updateAgentOpenBetStatusAfterOrder');

var _updateAgentOpenBetStatusAfterOrder2 = _interopRequireDefault(_updateAgentOpenBetStatusAfterOrder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var approveCancelOpenBet = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(req, res) {
		var cancelList;
		return regeneratorRuntime.wrap(function _callee5$(_context5) {
			while (1) {
				switch (_context5.prev = _context5.next) {
					case 0:
						_context5.prev = 0;

						console.log(req.body);
						cancelList = req.body.cancelList;
						_context5.next = 5;
						return Promise.all(cancelList.map(function () {
							var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(openBetId) {
								var openBet;
								return regeneratorRuntime.wrap(function _callee$(_context) {
									while (1) {
										switch (_context.prev = _context.next) {
											case 0:
												_context.next = 2;
												return _BetOrder.OpenBet.findOneAndRemove({ _id: _mongoose2.default.Types.ObjectId(openBetId) });

											case 2:
												openBet = _context.sent;

												if (_lodash2.default.isEmpty(openBet)) {
													_context.next = 7;
													break;
												}

												return _context.abrupt('return', openBet);

											case 7:
												res.json('notFound');

											case 8:
											case 'end':
												return _context.stop();
										}
									}
								}, _callee, undefined);
							}));

							return function (_x3) {
								return _ref2.apply(this, arguments);
							};
						}())).then(function () {
							var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(openBets) {
								var players;
								return regeneratorRuntime.wrap(function _callee3$(_context3) {
									while (1) {
										switch (_context3.prev = _context3.next) {
											case 0:
												players = _lodash2.default.uniq(openBets.map(function (openBet) {
													return openBet.owner.player;
												}));
												_context3.next = 3;
												return Promise.all(players.map(function () {
													var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(playerId) {
														return regeneratorRuntime.wrap(function _callee2$(_context2) {
															while (1) {
																switch (_context2.prev = _context2.next) {
																	case 0:
																		_context2.next = 2;
																		return (0, _updatePlayerStatusAfterOrder2.default)(playerId);

																	case 2:
																		return _context2.abrupt('return', null);

																	case 3:
																	case 'end':
																		return _context2.stop();
																}
															}
														}, _callee2, undefined);
													}));

													return function (_x5) {
														return _ref4.apply(this, arguments);
													};
												}()));

											case 3:
											case 'end':
												return _context3.stop();
										}
									}
								}, _callee3, undefined);
							}));

							return function (_x4) {
								return _ref3.apply(this, arguments);
							};
						}()).then(_asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
							return regeneratorRuntime.wrap(function _callee4$(_context4) {
								while (1) {
									switch (_context4.prev = _context4.next) {
										case 0:
											_context4.next = 2;
											return (0, _updateAgentOpenBetStatusAfterOrder2.default)(req.user._id);

										case 2:
										case 'end':
											return _context4.stop();
									}
								}
							}, _callee4, undefined);
						}))).then(function () {
							res.json('done');
						});

					case 5:
						_context5.next = 10;
						break;

					case 7:
						_context5.prev = 7;
						_context5.t0 = _context5['catch'](0);
						throw _context5.t0;

					case 10:
					case 'end':
						return _context5.stop();
				}
			}
		}, _callee5, undefined, [[0, 7]]);
	}));

	return function approveCancelOpenBet(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

exports.default = approveCancelOpenBet;
//# sourceMappingURL=approveCancelOpenBet.js.map