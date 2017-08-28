'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _Provider = require('../models/Provider');

var _Provider2 = _interopRequireDefault(_Provider);

var _EventOdd = require('../models/EventOdd');

var _BetOrder = require('../models/BetOrder');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _xml2jsEs6Promise = require('xml2js-es6-promise');

var _xml2jsEs6Promise2 = _interopRequireDefault(_xml2jsEs6Promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var fetch_pickMon_result = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
		var pickMonApi, openBets, openBetPickMonEvents, pickMonSportLeagues, response, pickMonData;
		return regeneratorRuntime.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						_context3.next = 2;
						return _Provider2.default.findOne({ provider: 'pickMon', activate: true });

					case 2:
						pickMonApi = _context3.sent;

						if (!pickMonApi) {
							_context3.next = 20;
							break;
						}

						_context3.next = 6;
						return _BetOrder.OpenBet.find({});

					case 6:
						openBets = _context3.sent;
						openBetPickMonEvents = _lodash2.default.compact(_lodash2.default.uniqBy([].concat.apply([], openBets.map(function (openBet) {
							return openBet.eventOdds.map(function (event) {
								if (event.status === 'Pending' && event.source.provider === 'pickMon') {
									event.sportLeague = event.sport.toLowerCase() + '-' + event.league.toLowerCase();
									return _lodash2.default.pick(event, ['eventOddId', 'sport', 'matchTime', 'details', 'league', 'region', 'status', 'team', 'source', 'oddType', 'sportLeague']);
								}
								return null;
							});
						})), 'eventOddId'));
						pickMonSportLeagues = openBetPickMonEvents.map(function (event) {
							return event.sportLeague;
						}).join(',');

						if (_lodash2.default.isEmpty(pickMonSportLeagues)) {
							_context3.next = 20;
							break;
						}

						_context3.next = 12;
						return _axios2.default.get(pickMonApi.apiLink + 'uid=' + _config2.default.pickMon_UID + '&key=' + _config2.default.pickMon_Key + '&sports=' + pickMonSportLeagues + '&graded=1&full_call=' + pickMonApi.option.resultFullCall);

					case 12:
						response = _context3.sent;

						if (_lodash2.default.isEmpty(response.data)) {
							_context3.next = 20;
							break;
						}

						_context3.next = 16;
						return (0, _xml2jsEs6Promise2.default)(response.data, { explicitArray: false });

					case 16:
						pickMonData = _context3.sent;

						if (!(!_lodash2.default.isEmpty(pickMonData.lines) && !_lodash2.default.isEmpty(pickMonData.lines.game))) {
							_context3.next = 20;
							break;
						}

						_context3.next = 20;
						return Promise.all(pickMonData.lines.game.map(function () {
							var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(event) {
								return regeneratorRuntime.wrap(function _callee2$(_context2) {
									while (1) {
										switch (_context2.prev = _context2.next) {
											case 0:
												if (!event.line.score.winner) {
													_context2.next = 3;
													break;
												}

												_context2.next = 3;
												return Promise.all(openBetPickMonEvents.map(function () {
													var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(openBetEvent) {
														var newResult, existedResult;
														return regeneratorRuntime.wrap(function _callee$(_context) {
															while (1) {
																switch (_context.prev = _context.next) {
																	case 0:
																		if (!(event.id === openBetEvent.source.id)) {
																			_context.next = 18;
																			break;
																		}

																		console.log('checkhere pickmond result');
																		newResult = {
																			eventResultId: openBetEvent.eventOddId,
																			source: {
																				provider: 'pickMon',
																				id: openBetEvent.source.id
																			},
																			sport: openBetEvent.sport,
																			oddType: openBetEvent.oddType,
																			league: openBetEvent.league,
																			region: openBetEvent.region,
																			details: openBetEvent.details,
																			matchTime: openBetEvent.matchTime,
																			team: openBetEvent.team,
																			score: {
																				homeScore: event.line.score.team1 || 0,
																				awayScore: event.line.score.team2 || 0
																			},
																			expireAt: (0, _moment2.default)().add(3, 'd')
																		};
																		_context.t0 = event.void;
																		_context.next = _context.t0 === '0' ? 6 : 8;
																		break;

																	case 6:
																		newResult.status = 'Finished';
																		return _context.abrupt('break', 11);

																	case 8:
																		newResult.status = 'Review';
																		newResult.note = 'Server Reviewing... TBD, pm void ' + event.void;
																		return _context.abrupt('return');

																	case 11:
																		_context.next = 13;
																		return _EventOdd.Result.findOne({ eventResultId: openBetEvent.eventOddId });

																	case 13:
																		existedResult = _context.sent;

																		if (!_lodash2.default.isEmpty(existedResult)) {
																			_context.next = 18;
																			break;
																		}

																		_context.next = 17;
																		return new _EventOdd.Result(newResult).save();

																	case 17:
																		console.log('saved pickMon new result');

																	case 18:
																		return _context.abrupt('return', null);

																	case 19:
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

											case 3:
												return _context2.abrupt('return', null);

											case 4:
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

					case 20:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, undefined);
	}));

	return function fetch_pickMon_result() {
		return _ref.apply(this, arguments);
	};
}();

exports.default = fetch_pickMon_result;
//# sourceMappingURL=C2_fetch_pickMon_result.js.map