'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _BetOrder = require('../models/BetOrder');

var _EventOdd = require('../models/EventOdd');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var axiosJsonOdd = _axios2.default.create({ headers: { 'JsonOdds-API-Key': _config2.default.jsonOddApiKey } });

var fetch_jsonOdd_result = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
		var openBets, openBetJsonOddEvents;
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_context2.prev = 0;
						_context2.next = 3;
						return _BetOrder.OpenBet.find({});

					case 3:
						openBets = _context2.sent;

						if (_lodash2.default.isEmpty(openBets)) next();

						openBetJsonOddEvents = _lodash2.default.compact(_lodash2.default.uniqBy([].concat.apply([], openBets.map(function (openBet) {
							return openBet.eventOdds.map(function (event) {
								if (event.status === 'Pending' && event.source.provider === 'jsonOdd' && (0, _moment2.default)().isAfter(event.cutOffTime)) {
									return _lodash2.default.pick(event, ['eventOddId', 'sport', 'matchTime', 'details', 'league', 'region', 'status', 'team', 'source', 'oddType']);
								}
								return null;
							});
						})), 'eventOddId'));


						console.log('fetch json result' + openBetJsonOddEvents);
						// eventOddId = generate array unique source id and oddtype from all json open bet

						if (_lodash2.default.isEmpty(openBetJsonOddEvents)) {
							_context2.next = 12;
							break;
						}

						_context2.next = 10;
						return Promise.all(openBetJsonOddEvents.map(function () {
							var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(event) {
								var response, oddResult, response2, resultStatus, note, newResult, existedResult;
								return regeneratorRuntime.wrap(function _callee$(_context) {
									while (1) {
										switch (_context.prev = _context.next) {
											case 0:
												_context.next = 2;
												return axiosJsonOdd.get('https://jsonodds.com/api/results/getbyeventid/' + event.source.id + '?oddtype=' + event.oddType);

											case 2:
												response = _context.sent;
												oddResult = {};

												if (!(response.data.length > 0 && response.data.length === 1)) {
													_context.next = 8;
													break;
												}

												oddResult = Object.assign({}, response.data[0]);
												_context.next = 16;
												break;

											case 8:
												if (!(response.data.length > 1)) {
													_context.next = 15;
													break;
												}

												_context.next = 11;
												return axiosJsonOdd.get('https://jsonodds.com/api/results/getbyeventid/' + event.source.id + '?oddtype=' + event.oddType.replace(/\s/g, ''));

											case 11:
												response2 = _context.sent;

												if (response2.data.length > 0 && response2.data.length === 1) {
													oddResult = Object.assign({}, response2.data[0]);
												}
												_context.next = 16;
												break;

											case 15:
												if (_lodash2.default.isEmpty(response.data)) {
													console.log('error error error error error jsonOdd cannot get result from openbet event, response empty ' + event.source.id + ' ' + event.oddType);
												}

											case 16:
												if (!(!_lodash2.default.isEmpty(oddResult) && oddResult.Final && oddResult.FinalType !== 'NotFinished')) {
													_context.next = 42;
													break;
												}

												resultStatus = '';
												note = '';
												_context.t0 = oddResult.FinalType;
												_context.next = _context.t0 === 'Finished' ? 22 : _context.t0 === 'Canceled' ? 24 : _context.t0 === 'Postponed' ? 26 : 29;
												break;

											case 22:
												resultStatus = 'Finished';
												return _context.abrupt('break', 32);

											case 24:
												resultStatus = 'Canceled';
												return _context.abrupt('break', 32);

											case 26:
												resultStatus = 'Postponed';
												note = 'Postponed = Canceled';
												return _context.abrupt('break', 32);

											case 29:
												resultStatus = 'Review';
												note = 'Server Reviewing... TBD';
												return _context.abrupt('return');

											case 32:
												newResult = {
													uniqueId: event.uniqueId,
													eventResultId: event.eventOddId,
													source: {
														provider: 'jsonOdd',
														id: event.source.id
													},
													sport: event.sport,
													oddType: event.oddType,
													league: event.league,
													region: event.region,
													details: event.details,
													matchTime: event.matchTime,
													team: event.team,
													score: {
														homeScore: oddResult.HomeScore || 0,
														awayScore: oddResult.AwayScore || 0
													},
													status: resultStatus,
													note: note,
													expireAt: (0, _moment2.default)().add(3, 'd')
												};
												_context.next = 35;
												return _EventOdd.Result.findOne({ uniqueId: event.uniqueId });

											case 35:
												existedResult = _context.sent;

												if (!_lodash2.default.isEmpty(existedResult)) {
													_context.next = 40;
													break;
												}

												_context.next = 39;
												return new _EventOdd.Result(newResult).save();

											case 39:
												console.log('saved jsonOdd new result ' + event.uniqueId);

											case 40:
												_context.next = 43;
												break;

											case 42:
												console.log('json odd event ' + event.uniqueId + ' not finish yet, skip save result');

											case 43:
												return _context.abrupt('return', null);

											case 44:
											case 'end':
												return _context.stop();
										}
									}
								}, _callee, undefined);
							}));

							return function (_x) {
								return _ref2.apply(this, arguments);
							};
						}()));

					case 10:
						_context2.next = 13;
						break;

					case 12:
						console.log('use open bet event id to update json odd result, but open bet empty');

					case 13:
						_context2.next = 18;
						break;

					case 15:
						_context2.prev = 15;
						_context2.t0 = _context2['catch'](0);
						throw _context2.t0;

					case 18:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, undefined, [[0, 15]]);
	}));

	return function fetch_jsonOdd_result() {
		return _ref.apply(this, arguments);
	};
}();

exports.default = fetch_jsonOdd_result;
//# sourceMappingURL=C1_fetch_jsonOdd_result.js.map