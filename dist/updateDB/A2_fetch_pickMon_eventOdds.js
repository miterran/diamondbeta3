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

var fetch_pickMon_eventOdds = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
		var pickMonApi, response, pickMonData;
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_context2.prev = 0;
						_context2.next = 3;
						return _Provider2.default.findOne({ provider: 'pickMon', activate: true });

					case 3:
						pickMonApi = _context2.sent;

						if (!pickMonApi) {
							_context2.next = 18;
							break;
						}

						_context2.next = 7;
						return _axios2.default.get(pickMonApi.apiLink + 'uid=' + _config2.default.pickMon_UID + '&key=' + _config2.default.pickMon_Key + '&sports=' + pickMonApi.option.sportLeagues.join(',') + '&graded=0&full_call=' + pickMonApi.option.eventFullCall);

					case 7:
						response = _context2.sent;

						if (_lodash2.default.isEmpty(response.data)) {
							_context2.next = 18;
							break;
						}

						_context2.next = 11;
						return (0, _xml2jsEs6Promise2.default)(response.data, { explicitArray: false });

					case 11:
						pickMonData = _context2.sent;

						if (!(!_lodash2.default.isEmpty(pickMonData.lines) && !_lodash2.default.isEmpty(pickMonData.lines.game) && _lodash2.default.isFunction(pickMonData.lines.game.map))) {
							_context2.next = 17;
							break;
						}

						_context2.next = 15;
						return Promise.all(pickMonData.lines.game.map(function () {
							var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(event) {
								var newEventOdd, checkOddPoints, allZero, existedEventOdd;
								return regeneratorRuntime.wrap(function _callee$(_context) {
									while (1) {
										switch (_context.prev = _context.next) {
											case 0:
												if (!(event.header && !event.line.score.winner && (0, _moment2.default)().isBefore((0, _moment2.default)(event.line.wagercutoff).subtract(1, 'h').format()) && event.void === '0' && !event.team1.name.includes('/'))) {
													_context.next = 50;
													break;
												}

												newEventOdd = {
													source: {
														provider: 'pickMon',
														bookmaker: 'default',
														id: event.id,
														lastUpdated: (0, _moment2.default)(event.last_update).subtract(3, 'h')
													},
													sport: event.sporttype,
													matchTime: (0, _moment2.default)(event.gamedate).subtract(3, 'h'),
													team: {
														home: event.team2.name,
														homeROT: event.team2.rotnum,
														away: event.team1.name,
														awayROT: event.team1.rotnum
													},
													details: event.header || '',
													odds: {
														moneyLineHome: Number(event.line.money.team2) || 0,
														moneyLineAway: Number(event.line.money.team1) || 0,
														pointSpreadHome: Number(event.line.spread.points) || 0,
														pointSpreadHomeLine: Number(event.line.spread.team2) || 0,
														pointSpreadAwayLine: Number(event.line.spread.team1) || 0,
														totalNumber: Number(event.line.total.points) || 0,
														overLine: Number(event.line.total.over) || 0,
														underLine: Number(event.line.total.under) || 0,
														drawLine: Number(event.line.money.draw) || 0
													},
													updatedAt: (0, _moment2.default)()
												};
												checkOddPoints = _lodash2.default.pick(newEventOdd.odds, ['moneyLineHome', 'moneyLineAway', 'pointSpreadAway', 'pointSpreadHome', 'pointSpreadHomeLine', 'pointSpreadAwayLine', 'totalNumber', 'overLine', 'underLine', 'drawLine']);
												allZero = Object.values(checkOddPoints).every(function (val) {
													return Number(val) === 0;
												});

												if (allZero) {
													_context.next = 50;
													break;
												}

												if (Number(event.line.spread.points) > 0) {
													newEventOdd.odds.pointSpreadAway = -Number(event.line.spread.points);
												} else {
													newEventOdd.odds.pointSpreadAway = Math.abs(Number(event.line.spread.points));
												}

												if (event.sporttype === 'Baseball') {
													newEventOdd.team.homePitcher = event.team2.pitcher || 'Action';
													newEventOdd.team.awayPitcher = event.team1.pitcher || 'Action';
												}

												if (event.sporttype !== 'Soccer') {
													newEventOdd.league = event.sportsubtype;
													newEventOdd.region = '';
												}

												if (event.sporttype === 'Soccer') {
													newEventOdd.league = '';
													newEventOdd.region = event.sportsubtype;
												}

												_context.t0 = event.line.perioddesc;
												_context.next = _context.t0 === 'Game' ? 12 : _context.t0 === '1st Half' ? 14 : _context.t0 === '2nd Half' ? 16 : _context.t0 === '1st Quarter' ? 18 : _context.t0 === '2nd Quarter' ? 20 : _context.t0 === '3rd Quarter' ? 22 : _context.t0 === '3rd Quarter' ? 24 : _context.t0 === '1st 5 Innings' ? 26 : _context.t0 === '4th Quarter' ? 28 : 30;
												break;

											case 12:
												newEventOdd.oddType = 'Game';
												return _context.abrupt('break', 32);

											case 14:
												newEventOdd.oddType = 'First Half';
												return _context.abrupt('break', 32);

											case 16:
												newEventOdd.oddType = 'Second Half';
												return _context.abrupt('break', 32);

											case 18:
												newEventOdd.oddType = 'First Quarter';
												return _context.abrupt('break', 32);

											case 20:
												newEventOdd.oddType = 'Second Quarter';
												return _context.abrupt('break', 32);

											case 22:
												newEventOdd.oddType = 'Third Quarter';
												return _context.abrupt('break', 32);

											case 24:
												newEventOdd.oddType = 'Third Quarter';
												return _context.abrupt('break', 32);

											case 26:
												newEventOdd.oddType = 'First Five Innings';
												return _context.abrupt('break', 32);

											case 28:
												newEventOdd.oddType = 'Fourth Quarter';
												return _context.abrupt('break', 32);

											case 30:
												console.log('new event !!!!!!!!!!!!!!!! ' + event.line.perioddesc);
												return _context.abrupt('return');

											case 32:

												if (newEventOdd.oddType === 'Game') {
													newEventOdd.cutOffTime = (0, _moment2.default)(event.gamedate).subtract(3, 'h').subtract(1, 's');
													newEventOdd.expireAt = (0, _moment2.default)(event.gamedate).subtract(3, 'h').subtract(1, 's');
												} else if (newEventOdd.oddType === 'Second Half') {
													if ((0, _moment2.default)(event.gamedate).add(1, 'h').add(50, 'm').isAfter(event.line.wagercutoff)) {
														newEventOdd.cutOffTime = (0, _moment2.default)(event.line.wagercutoff).subtract(3, 'h').subtract(1, 's');
														newEventOdd.expireAt = (0, _moment2.default)(event.line.wagercutoff).subtract(3, 'h').subtract(1, 's');
													} else {
														newEventOdd.cutOffTime = (0, _moment2.default)(event.gamedate).add(1, 'h').add(50, 'm').subtract(3, 'h').subtract(1, 's');
														newEventOdd.expireAt = (0, _moment2.default)(event.gamedate).add(1, 'h').add(50, 'm').subtract(3, 'h').subtract(1, 's');
													}
												} else {
													newEventOdd.cutOffTime = (0, _moment2.default)(event.line.wagercutoff).subtract(3, 'h').subtract(1, 's');
													newEventOdd.expireAt = (0, _moment2.default)(event.line.wagercutoff).subtract(3, 'h').subtract(1, 's');
												}

												newEventOdd.uniqueId = newEventOdd.team.homeROT + '_' + newEventOdd.team.awayROT + '_' + newEventOdd.sport.replace(/\s/g, '').toUpperCase() + '_' + newEventOdd.oddType.replace(/\s/g, '').toUpperCase() + '_' + (0, _moment2.default)(newEventOdd.matchTime).format('MMDDYYYY');

												_context.next = 36;
												return _EventOdd.EventOdd.findOne({ uniqueId: newEventOdd.uniqueId });

											case 36:
												existedEventOdd = _context.sent;

												if (!_lodash2.default.isEmpty(existedEventOdd)) {
													_context.next = 43;
													break;
												}

												_context.next = 40;
												return new _EventOdd.EventOdd(newEventOdd).save();

											case 40:
												console.log('saved ' + newEventOdd.uniqueId);
												//}

												_context.next = 50;
												break;

											case 43:
												if ((0, _moment2.default)(existedEventOdd.source.lastUpdated).isSame((0, _moment2.default)(newEventOdd.source.lastUpdated).format())) {
													_context.next = 49;
													break;
												}

												_context.next = 46;
												return _EventOdd.EventOdd.findOneAndUpdate({ uniqueId: newEventOdd.uniqueId }, { $set: newEventOdd });

											case 46:
												console.log('updated ' + newEventOdd.uniqueId);
												_context.next = 50;
												break;

											case 49:
												console.log(newEventOdd.uniqueId + ' is up to date');

											case 50:
												return _context.abrupt('return', null);

											case 51:
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

					case 15:
						_context2.next = 18;
						break;

					case 17:
						console.log('pickmon has no update');

					case 18:
						_context2.next = 23;
						break;

					case 20:
						_context2.prev = 20;
						_context2.t0 = _context2['catch'](0);
						throw _context2.t0;

					case 23:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, undefined, [[0, 20]]);
	}));

	return function fetch_pickMon_eventOdds() {
		return _ref.apply(this, arguments);
	};
}();

exports.default = fetch_pickMon_eventOdds;
//# sourceMappingURL=A2_fetch_pickMon_eventOdds.js.map