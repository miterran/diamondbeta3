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
		var pickMonApi, openBets, openBetPickMon, pickMonSportLeagues, response, pickMonData;
		return regeneratorRuntime.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						_context3.prev = 0;
						_context3.next = 3;
						return _Provider2.default.findOne({ provider: 'pickMon', activate: true });

					case 3:
						pickMonApi = _context3.sent;

						if (!pickMonApi) {
							_context3.next = 25;
							break;
						}

						_context3.next = 7;
						return _BetOrder.OpenBet.find({});

					case 7:
						openBets = _context3.sent;
						openBetPickMon = _lodash2.default.compact(_lodash2.default.uniqBy([].concat.apply([], openBets.map(function (openBet) {
							return openBet.eventOdds.map(function (event) {
								if (event.status === 'Pending' && event.source.provider === 'pickMon' && (0, _moment2.default)().isAfter(event.cutOffTime)) {
									if (event.sport === 'Football' && event.league === 'College') {
										event.sportLeague = event.sport.toLowerCase() + '-ncaa';
									} else if (event.sport === 'Soccer') {
										event.sportLeague = 'soccer';
									} else {
										event.sportLeague = event.sport.toLowerCase() + '-' + event.league.toLowerCase();
									}
									return _lodash2.default.pick(event, ['uniqueId', 'sport', 'matchTime', 'details', 'league', 'region', 'status', 'team', 'source', 'oddType', 'sportLeague']);
								}
								return null;
							});
						})), 'uniqueId'));
						pickMonSportLeagues = _lodash2.default.uniqBy(openBetPickMon, 'sportLeague').map(function (pickMonSportLeague) {
							return pickMonSportLeague.sportLeague;
						}).join(',');


						console.log(pickMonSportLeagues);

						if (_lodash2.default.isEmpty(pickMonSportLeagues)) {
							_context3.next = 24;
							break;
						}

						_context3.next = 14;
						return _axios2.default.get(pickMonApi.apiLink + 'uid=' + _config2.default.pickMon_UID + '&key=' + _config2.default.pickMon_Key + '&sports=' + pickMonSportLeagues + '&graded=1&full_call=' + pickMonApi.option.resultFullCall);

					case 14:
						response = _context3.sent;

						if (_lodash2.default.isEmpty(response.data)) {
							_context3.next = 22;
							break;
						}

						_context3.next = 18;
						return (0, _xml2jsEs6Promise2.default)(response.data, { explicitArray: false });

					case 18:
						pickMonData = _context3.sent;

						if (!(!_lodash2.default.isEmpty(pickMonData.lines) && !_lodash2.default.isEmpty(pickMonData.lines.game) && _lodash2.default.isFunction(pickMonData.lines.game.map))) {
							_context3.next = 22;
							break;
						}

						_context3.next = 22;
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
												return Promise.all(openBetPickMon.map(function () {
													var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(openBetEvent) {
														var newResult, existedResult;
														return regeneratorRuntime.wrap(function _callee$(_context) {
															while (1) {
																switch (_context.prev = _context.next) {
																	case 0:
																		if (!(event.id === openBetEvent.source.id)) {
																			_context.next = 17;
																			break;
																		}

																		newResult = {
																			uniqueId: openBetEvent.uniqueId,
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
																				homeScore: event.line.score.team2 || 0,
																				awayScore: event.line.score.team1 || 0
																			},
																			expireAt: (0, _moment2.default)().add(3, 'd')
																		};
																		_context.t0 = event.void;
																		_context.next = _context.t0 === '0' ? 5 : 7;
																		break;

																	case 5:
																		newResult.status = 'Finished';
																		return _context.abrupt('break', 10);

																	case 7:
																		newResult.status = 'Review';
																		newResult.note = 'Server Reviewing... TBD, pm void ' + event.void;
																		return _context.abrupt('return');

																	case 10:
																		_context.next = 12;
																		return _EventOdd.Result.findOne({ uniqueId: openBetEvent.uniqueId });

																	case 12:
																		existedResult = _context.sent;

																		if (!_lodash2.default.isEmpty(existedResult)) {
																			_context.next = 17;
																			break;
																		}

																		_context.next = 16;
																		return new _EventOdd.Result(newResult).save();

																	case 16:
																		console.log('saved pickMon new result ' + openBetEvent.uniqueId);

																	case 17:
																		return _context.abrupt('return', null);

																	case 18:
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

					case 22:
						_context3.next = 25;
						break;

					case 24:
						console.log('use open bet event id to update pickmon result, but open bet empty');

					case 25:
						_context3.next = 30;
						break;

					case 27:
						_context3.prev = 27;
						_context3.t0 = _context3['catch'](0);
						throw _context3.t0;

					case 30:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, undefined, [[0, 27]]);
	}));

	return function fetch_pickMon_result() {
		return _ref.apply(this, arguments);
	};
}();

exports.default = fetch_pickMon_result;
//# sourceMappingURL=C2_fetch_pickMon_result.js.map