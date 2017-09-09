'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _BetOrder = require('../models/BetOrder');

var _EventOdd = require('../models/EventOdd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var sync_Result_with_OpenBet_eventOdds = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
		var openBets;
		return regeneratorRuntime.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						_context3.prev = 0;
						_context3.next = 3;
						return _BetOrder.OpenBet.find({});

					case 3:
						openBets = _context3.sent;

						if (_lodash2.default.isEmpty(openBets)) {
							_context3.next = 7;
							break;
						}

						_context3.next = 7;
						return Promise.all(openBets.map(function () {
							var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(openBet) {
								return regeneratorRuntime.wrap(function _callee2$(_context2) {
									while (1) {
										switch (_context2.prev = _context2.next) {
											case 0:
												_context2.next = 2;
												return Promise.all(openBet.eventOdds.map(function () {
													var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(event) {
														var eventResult;
														return regeneratorRuntime.wrap(function _callee$(_context) {
															while (1) {
																switch (_context.prev = _context.next) {
																	case 0:
																		_context.next = 2;
																		return _EventOdd.Result.findOne({ 'uniqueId': event.uniqueId });

																	case 2:
																		eventResult = _context.sent;

																		if (_lodash2.default.isEmpty(eventResult)) {
																			_context.next = 9;
																			break;
																		}

																		_context.next = 6;
																		return _BetOrder.OpenBet.findOneAndUpdate({ orderNumber: openBet.orderNumber, eventOdds: { $elemMatch: { singlePickId: event.singlePickId } } }, { '$set': { 'eventOdds.$.score': eventResult.score, 'eventOdds.$.status': eventResult.status } });

																	case 6:
																		console.log('updated openBet with final score');
																		_context.next = 10;
																		break;

																	case 9:
																		console.log('result haven\'t save yet or start yet ' + event.uniqueId + ' ' + (0, _moment2.default)(event.matchTime).format('ddd, MMM DD, YYYY @ hh:mm A'));

																	case 10:
																		return _context.abrupt('return', null);

																	case 11:
																	case 'end':
																		return _context.stop();
																}
															}
														}, _callee, undefined);
													}));

													return function (_x2) {
														return _ref3.apply(this, arguments);
													};
												}()));

											case 2:
												return _context2.abrupt('return', null);

											case 3:
											case 'end':
												return _context2.stop();
										}
									}
								}, _callee2, undefined);
							}));

							return function (_x) {
								return _ref2.apply(this, arguments);
							};
						}()));

					case 7:
						_context3.next = 12;
						break;

					case 9:
						_context3.prev = 9;
						_context3.t0 = _context3['catch'](0);
						throw _context3.t0;

					case 12:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, undefined, [[0, 9]]);
	}));

	return function sync_Result_with_OpenBet_eventOdds() {
		return _ref.apply(this, arguments);
	};
}();

exports.default = sync_Result_with_OpenBet_eventOdds;
//# sourceMappingURL=D1_sync_Result_to_openBet_eventOdds.js.map