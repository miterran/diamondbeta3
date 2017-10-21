'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _Provider = require('../models/Provider');

var _Provider2 = _interopRequireDefault(_Provider);

var _EventOdd = require('../models/EventOdd');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var axiosJsonOdd = _axios2.default.create({ headers: { 'JsonOdds-API-Key': _config2.default.jsonOddApiKey } });

var fetch_jsonOdd_eventOdds = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
		var jsonOddList;
		return regeneratorRuntime.wrap(function _callee4$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						_context4.prev = 0;
						_context4.next = 3;
						return _Provider2.default.find({ provider: 'jsonOdd', activate: true });

					case 3:
						jsonOddList = _context4.sent;

						if (_lodash2.default.isEmpty(jsonOddList)) {
							_context4.next = 7;
							break;
						}

						_context4.next = 7;
						return Promise.all(jsonOddList.map(function () {
							var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(sportLeague) {
								var events;
								return regeneratorRuntime.wrap(function _callee3$(_context3) {
									while (1) {
										switch (_context3.prev = _context3.next) {
											case 0:
												_context3.next = 2;
												return axiosJsonOdd.get(sportLeague.apiLink);

											case 2:
												events = _context3.sent;

												if (_lodash2.default.isEmpty(events.data)) {
													_context3.next = 9;
													break;
												}

												console.log('jsonOdd ' + sportLeague.league + ' has event');
												_context3.next = 7;
												return Promise.all(events.data.map(function () {
													var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(event) {
														return regeneratorRuntime.wrap(function _callee2$(_context2) {
															while (1) {
																switch (_context2.prev = _context2.next) {
																	case 0:
																		if (!(0, _moment2.default)().isBefore(_moment2.default.utc(event.MatchTime).subtract(1, 'seconds').format())) {
																			_context2.next = 3;
																			break;
																		}

																		_context2.next = 3;
																		return Promise.all(event.Odds.map(function () {
																			var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(odd) {
																				var newEventOdd, checkOddPoints, allZero, existedEventOdd;
																				return regeneratorRuntime.wrap(function _callee$(_context) {
																					while (1) {
																						switch (_context.prev = _context.next) {
																							case 0:
																								newEventOdd = {

																									source: {
																										provider: 'jsonOdd',
																										bookmaker: odd.SiteID.toString(),
																										id: event.ID,
																										lastUpdated: _moment2.default.utc(odd.LastUpdated)
																									},
																									sport: sportLeague.sport,
																									oddType: odd.OddType,
																									matchTime: _moment2.default.utc(event.MatchTime),
																									cutOffTime: _moment2.default.utc(event.MatchTime).subtract(1, 'seconds'),
																									team: {
																										home: event.HomeTeam,
																										homeROT: event.HomeROT,
																										away: event.AwayTeam,
																										awayROT: event.AwayROT
																									},
																									details: event.Details || '',
																									odds: {
																										moneyLineHome: Number(odd.MoneyLineHome) || 0,
																										moneyLineAway: Number(odd.MoneyLineAway) || 0,
																										pointSpreadHome: Number(odd.PointSpreadHome) || 0,
																										pointSpreadAway: Number(odd.PointSpreadAway) || 0,
																										pointSpreadHomeLine: Number(odd.PointSpreadHomeLine) || 0,
																										pointSpreadAwayLine: Number(odd.PointSpreadAwayLine) || 0,
																										totalNumber: Number(odd.TotalNumber) || 0,
																										overLine: Number(odd.OverLine) || 0,
																										underLine: Number(odd.UnderLine) || 0,
																										drawLine: Number(odd.DrawLine) || 0
																									},
																									updatedAt: (0, _moment2.default)(),
																									expireAt: _moment2.default.utc(event.MatchTime).subtract(1, 'seconds')
																								};
																								checkOddPoints = _lodash2.default.pick(newEventOdd.odds, ['moneyLineHome', 'moneyLineAway', 'pointSpreadHome', 'pointSpreadAway', 'pointSpreadHomeLine', 'pointSpreadAwayLine', 'totalNumber', 'overLine', 'underLine', 'drawLine']);
																								allZero = Object.values(checkOddPoints).every(function (val) {
																									return Number(val) === 0;
																								});

																								if (allZero) {
																									_context.next = 24;
																									break;
																								}

																								if (sportLeague.sport === 'Baseball') {
																									newEventOdd.team.homePitcher = event.HomePitcher || 'Action';
																									newEventOdd.team.awayPitcher = event.AwayPitcher || 'Action';
																								}
																								if (sportLeague.sport !== 'Soccer') {
																									newEventOdd.league = sportLeague.league;
																									newEventOdd.region = '';
																								}
																								if (sportLeague.sport === 'Soccer') {
																									if (event.hasOwnProperty('League')) {
																										if (event.League.hasOwnProperty('Name')) {
																											newEventOdd.league = event.League.Name;
																										} else {
																											newEventOdd.league = '-';
																										}
																									} else {
																										newEventOdd.league = '-';
																									}
																									newEventOdd.region = event.DisplayRegion;
																								}

																								newEventOdd.uniqueId = newEventOdd.team.homeROT + '_' + newEventOdd.team.awayROT + '_' + newEventOdd.sport.replace(/\s/g, '').toUpperCase() + '_' + newEventOdd.oddType.replace(/\s/g, '').toUpperCase() + '_' + _moment2.default.utc(newEventOdd.matchTime).format('MMDDYYYY');

																								_context.next = 10;
																								return _EventOdd.EventOdd.findOne({ uniqueId: newEventOdd.uniqueId });

																							case 10:
																								existedEventOdd = _context.sent;

																								if (!_lodash2.default.isEmpty(existedEventOdd)) {
																									_context.next = 17;
																									break;
																								}

																								_context.next = 14;
																								return new _EventOdd.EventOdd(newEventOdd).save();

																							case 14:
																								console.log('saved ' + newEventOdd.uniqueId);
																								_context.next = 24;
																								break;

																							case 17:
																								if ((0, _moment2.default)(existedEventOdd.source.lastUpdated).isSame((0, _moment2.default)(newEventOdd.source.lastUpdated).format())) {
																									_context.next = 23;
																									break;
																								}

																								_context.next = 20;
																								return _EventOdd.EventOdd.findOneAndUpdate({ uniqueId: newEventOdd.uniqueId }, { $set: newEventOdd });

																							case 20:
																								console.log('updated ' + newEventOdd.uniqueId);
																								_context.next = 24;
																								break;

																							case 23:
																								console.log(newEventOdd.uniqueId + ' is up to date');

																							case 24:
																								return _context.abrupt('return', null);

																							case 25:
																							case 'end':
																								return _context.stop();
																						}
																					}
																				}, _callee, undefined);
																			}));

																			return function (_x3) {
																				return _ref4.apply(this, arguments);
																			};
																		}())).catch(function (err) {
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

													return function (_x2) {
														return _ref3.apply(this, arguments);
													};
												}()));

											case 7:
												_context3.next = 10;
												break;

											case 9:
												console.log('jsonOdd ' + sportLeague.league + ' has no event');

											case 10:
												return _context3.abrupt('return', null);

											case 11:
											case 'end':
												return _context3.stop();
										}
									}
								}, _callee3, undefined);
							}));

							return function (_x) {
								return _ref2.apply(this, arguments);
							};
						}()));

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

	return function fetch_jsonOdd_eventOdds() {
		return _ref.apply(this, arguments);
	};
}();

exports.default = fetch_jsonOdd_eventOdds;
//# sourceMappingURL=A1_fetch_jsonOdd_eventOdds.js.map