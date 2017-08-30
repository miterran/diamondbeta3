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
								var newEventOdd, existedEventOdd;
								return regeneratorRuntime.wrap(function _callee$(_context) {
									while (1) {
										switch (_context.prev = _context.next) {
											case 0:
												if (!(event.header && !event.line.score.winner && (0, _moment2.default)().isBefore((0, _moment2.default)(event.line.wagercutoff).subtract(3, 'h').format()) && event.void === '0' && (!event.team1.name.includes('/') || !event.team1.name.includes('/')))) {
													_context.next = 44;
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
														home: event.team1.name,
														homeROT: event.team1.rotnum,
														away: event.team2.name,
														awayROT: event.team2.rotnum
													},
													details: event.header || '',
													odds: {
														moneyLineHome: Number(event.line.money.team1) || 0,
														moneyLineAway: Number(event.line.money.team2) || 0,
														pointSpreadAway: Number(event.line.spread.points) || 0,
														pointSpreadHomeLine: Number(event.line.spread.team1) || 0,
														pointSpreadAwayLine: Number(event.line.spread.team2) || 0,
														totalNumber: Number(event.line.total.points) || 0,
														overLine: Number(event.line.total.over) || 0,
														underLine: Number(event.line.total.under) || 0,
														drawLine: Number(event.line.money.draw) || 0
													},
													updatedAt: (0, _moment2.default)()
												};


												if (Number(event.line.spread.points) > 0) {
													newEventOdd.odds.pointSpreadHome = -Number(event.line.spread.points);
												} else {
													newEventOdd.odds.pointSpreadHome = Math.abs(Number(event.line.spread.points));
												}

												if (event.sporttype === 'Baseball') {
													newEventOdd.team.homePitcher = event.team1.pitcher || 'Action';
													newEventOdd.team.awayPitcher = event.team2.pitcher || 'Action';
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
												_context.next = _context.t0 === 'Game' ? 9 : _context.t0 === '1st Half' ? 11 : _context.t0 === '2nd Half' ? 13 : _context.t0 === '1st Quarter' ? 15 : _context.t0 === '2nd Quarter' ? 17 : _context.t0 === '3rd Quarter' ? 19 : _context.t0 === '3rd Quarter' ? 21 : _context.t0 === '1st 5 Innings' ? 23 : 25;
												break;

											case 9:
												newEventOdd.oddType = 'Game';
												return _context.abrupt('break', 26);

											case 11:
												newEventOdd.oddType = 'First Half';
												return _context.abrupt('break', 26);

											case 13:
												newEventOdd.oddType = 'Second Half';
												return _context.abrupt('break', 26);

											case 15:
												newEventOdd.oddType = 'First Quarter';
												return _context.abrupt('break', 26);

											case 17:
												newEventOdd.oddType = 'Second Quarter';
												return _context.abrupt('break', 26);

											case 19:
												newEventOdd.oddType = 'Third Quarter';
												return _context.abrupt('break', 26);

											case 21:
												newEventOdd.oddType = 'Third Quarter';
												return _context.abrupt('break', 26);

											case 23:
												newEventOdd.oddType = 'First Five Innings';
												return _context.abrupt('break', 26);

											case 25:
												return _context.abrupt('return');

											case 26:

												if (newEventOdd.oddType === 'Game') {
													newEventOdd.cutOffTime = (0, _moment2.default)(event.gamedate).subtract(3, 'h').subtract(1, 's');
													newEventOdd.expireAt = (0, _moment2.default)(event.gamedate).subtract(3, 'h').subtract(1, 's');
												} else {
													newEventOdd.cutOffTime = (0, _moment2.default)(event.line.wagercutoff).subtract(3, 'h').subtract(1, 's');
													newEventOdd.expireAt = (0, _moment2.default)(event.line.wagercutoff).subtract(3, 'h').subtract(1, 's');
												}

												newEventOdd.eventOddId = 'pickMon_' + event.sportsubtype + '_' + newEventOdd.oddType.replace(/\s/g, '').toUpperCase() + '_' + event.id, newEventOdd.uniqueId = newEventOdd.team.homeROT + '_' + newEventOdd.team.awayROT + '_' + newEventOdd.sport.replace(/\s/g, '').toUpperCase() + '_' + newEventOdd.oddType.replace(/\s/g, '').toUpperCase() + '_' + (0, _moment2.default)(newEventOdd.matchTime).format('MMDDYYYY');

												_context.next = 30;
												return _EventOdd.EventOdd.findOne({ eventOddId: newEventOdd.eventOddId });

											case 30:
												existedEventOdd = _context.sent;

												if (!_lodash2.default.isEmpty(existedEventOdd)) {
													_context.next = 37;
													break;
												}

												_context.next = 34;
												return new _EventOdd.EventOdd(newEventOdd).save();

											case 34:
												console.log('saved ' + newEventOdd.eventOddId);
												_context.next = 44;
												break;

											case 37:
												if ((0, _moment2.default)(existedEventOdd.source.lastUpdated).isSame((0, _moment2.default)(newEventOdd.source.lastUpdated).format())) {
													_context.next = 43;
													break;
												}

												_context.next = 40;
												return _EventOdd.EventOdd.findOneAndUpdate({ eventOddId: newEventOdd.eventOddId }, { $set: newEventOdd });

											case 40:
												console.log('updated ' + newEventOdd.eventOddId);
												_context.next = 44;
												break;

											case 43:
												console.log(newEventOdd.eventOddId + ' is up to date');

											case 44:
												return _context.abrupt('return', null);

											case 45:
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