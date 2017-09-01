'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _BetOrder = require('../models/BetOrder');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var determine_OpenBet_eventOdds_result = function () {
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

						if (_lodash2.default.isEmpty(openBets)) next();
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
														var status, sport, betDetail, score, betType, oddPoint, oddTarget, homeScore, awayScore, resultStatus;
														return regeneratorRuntime.wrap(function _callee$(_context) {
															while (1) {
																switch (_context.prev = _context.next) {
																	case 0:
																		status = event.status, sport = event.sport, betDetail = event.betDetail, score = event.score;
																		betType = betDetail.betType, oddPoint = betDetail.oddPoint, oddTarget = betDetail.oddTarget;
																		homeScore = score.homeScore, awayScore = score.awayScore;


																		oddPoint = Number(oddPoint);
																		homeScore = Number(homeScore);
																		awayScore = Number(awayScore);

																		resultStatus = status;

																		if (!(status === 'Finished')) {
																			_context.next = 25;
																			break;
																		}

																		_context.t0 = true;
																		_context.next = _context.t0 === (sport === 'Soccer' && betType === 'Spread' && oddTarget === 'Home' && homeScore + oddPoint - awayScore === 0.25) ? 11 : _context.t0 === (sport === 'Soccer' && betType === 'Spread' && oddTarget === 'Away' && awayScore + oddPoint - homeScore === 0.25) ? 11 : _context.t0 === (sport === 'Soccer' && betType === 'Total' && oddTarget === 'Over' && homeScore + awayScore - oddPoint === 0.25) ? 11 : _context.t0 === (sport === 'Soccer' && betType === 'Total' && oddTarget === 'Under' && oddPoint - homeScore + awayScore === 0.25) ? 11 : _context.t0 === (sport === 'Soccer' && betType === 'Spread' && oddTarget === 'Home' && homeScore + oddPoint - awayScore === -0.25) ? 13 : _context.t0 === (sport === 'Soccer' && betType === 'Spread' && oddTarget === 'Away' && awayScore + oddPoint - homeScore === -0.25) ? 13 : _context.t0 === (sport === 'Soccer' && betType === 'Total' && oddTarget === 'Over' && homeScore + awayScore - oddPoint === -0.25) ? 13 : _context.t0 === (sport === 'Soccer' && betType === 'Total' && oddTarget === 'Under' && oddPoint - homeScore + awayScore === -0.25) ? 13 : _context.t0 === (betType === 'M-Line' && oddTarget === 'Home' && homeScore > awayScore) ? 15 : _context.t0 === (betType === 'M-Line' && oddTarget === 'Away' && awayScore > homeScore) ? 15 : _context.t0 === (betType === 'Spread' && oddTarget === 'Home' && homeScore + oddPoint > awayScore) ? 15 : _context.t0 === (betType === 'Spread' && oddTarget === 'Away' && awayScore + oddPoint > homeScore) ? 15 : _context.t0 === (betType === 'Total' && oddTarget === 'Over' && homeScore + awayScore > oddPoint) ? 15 : _context.t0 === (betType === 'Total' && oddTarget === 'Under' && homeScore + awayScore < oddPoint) ? 15 : _context.t0 === (betType === 'Draw' && homeScore === awayScore) ? 15 : _context.t0 === (sport === 'Soccer' && betType === 'M-Line' && homeScore === awayScore) ? 17 : _context.t0 === (sport === 'Hockey' && betType === 'M-Line' && homeScore === awayScore) ? 17 : _context.t0 === (betType === 'M-Line' && oddTarget === 'Home' && homeScore < awayScore) ? 17 : _context.t0 === (betType === 'M-Line' && oddTarget === 'Away' && awayScore < homeScore) ? 17 : _context.t0 === (betType === 'Spread' && oddTarget === 'Home' && homeScore + oddPoint < awayScore) ? 17 : _context.t0 === (betType === 'Spread' && oddTarget === 'Away' && awayScore + oddPoint < homeScore) ? 17 : _context.t0 === (betType === 'Total' && oddTarget === 'Over' && homeScore + awayScore < oddPoint) ? 17 : _context.t0 === (betType === 'Total' && oddTarget === 'Under' && homeScore + awayScore > oddPoint) ? 17 : _context.t0 === (betType === 'Draw' && homeScore !== awayScore) ? 17 : _context.t0 === (sport !== 'Soccer' && betType === 'M-Line' && homeScore === awayScore) ? 19 : _context.t0 === (sport !== 'Hockey' && betType === 'M-Line' && homeScore === awayScore) ? 19 : _context.t0 === (betType === 'Spread' && oddTarget === 'Home' && homeScore + oddPoint === awayScore) ? 19 : _context.t0 === (betType === 'Spread' && oddTarget === 'Away' && awayScore + oddPoint === homeScore) ? 19 : _context.t0 === (betType === 'Total' && homeScore + awayScore === oddPoint) ? 19 : 21;
																		break;

																	case 11:
																		resultStatus = 'Won Half';
																		return _context.abrupt('break', 23);

																	case 13:
																		resultStatus = 'Lost Half';
																		return _context.abrupt('break', 23);

																	case 15:
																		resultStatus = 'Won';
																		return _context.abrupt('break', 23);

																	case 17:
																		resultStatus = 'Lost';
																		return _context.abrupt('break', 23);

																	case 19:
																		resultStatus = 'Push';
																		return _context.abrupt('break', 23);

																	case 21:
																		resultStatus = 'Review';
																		return _context.abrupt('return');

																	case 23:
																		_context.next = 25;
																		return _BetOrder.OpenBet.findOneAndUpdate({
																			orderNumber: openBet.orderNumber,
																			eventOdds: { $elemMatch: { singlePickId: event.singlePickId } } }, { '$set': { 'eventOdds.$.status': resultStatus } });

																	case 25:
																		return _context.abrupt('return', null);

																	case 26:
																	case 'end':
																		return _context.stop();
																}
															}
														}, _callee, undefined);
													}));

													return function (_x2) {
														return _ref3.apply(this, arguments);
													};
												}())).catch(function (err) {
													throw err;
												});

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
						}())).catch(function (err) {
							throw err;
						});

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

	return function determine_OpenBet_eventOdds_result() {
		return _ref.apply(this, arguments);
	};
}();

exports.default = determine_OpenBet_eventOdds_result;
//# sourceMappingURL=E1_determine_OpenBet_eventOdds_result.js.map