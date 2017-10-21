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

var fetch_betOnlineFootball_eventOdds = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
		var betOnlineNBA, response, nbaData;
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_context2.prev = 0;
						_context2.next = 3;
						return _Provider2.default.findOne({ provider: 'betonlinefootball', activate: true });

					case 3:
						betOnlineNBA = _context2.sent;

						if (!betOnlineNBA) {
							_context2.next = 18;
							break;
						}

						_context2.next = 7;
						return _axios2.default.get(betOnlineNBA.apiLink);

					case 7:
						response = _context2.sent;

						if (_lodash2.default.isEmpty(response.data)) {
							_context2.next = 18;
							break;
						}

						_context2.next = 11;
						return (0, _xml2jsEs6Promise2.default)(response.data, { explicitArray: false });

					case 11:
						nbaData = _context2.sent;

						if (_lodash2.default.isEmpty(nbaData.bestlinesports_line_feed.event)) {
							_context2.next = 17;
							break;
						}

						_context2.next = 15;
						return Promise.all(nbaData.bestlinesports_line_feed.event.map(function () {
							var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(event) {
								var league, away, home, oddType, newEventOdd, existedEventOdd;
								return regeneratorRuntime.wrap(function _callee$(_context) {
									while (1) {
										switch (_context.prev = _context.next) {
											case 0:
												if (!(event.league === 'NCAA Football' || event.league === 'NFL Football')) {
													_context.next = 41;
													break;
												}

												league = '';

												event.league === 'NCAA Football' ? league = 'NCAA' : league = 'NFL';

												away = {};
												home = {};

												if (event.participant[0].visiting_home_draw === 'Visiting') {
													away = event.participant[0];
													home = event.participant[1];
												} else {
													away = event.participant[1];
													home = event.participant[0];
												}

												oddType = '';
												_context.t0 = event.period.period_description;
												_context.next = _context.t0 === 'Game' ? 10 : _context.t0 === '1st Half' ? 12 : _context.t0 === '2nd Half' ? 14 : _context.t0 === '1st Quarter' ? 16 : _context.t0 === '2nd Quarter' ? 18 : _context.t0 === '3rd Quarter' ? 20 : _context.t0 === '3rd Quarter' ? 22 : _context.t0 === '4th Quarter' ? 24 : 26;
												break;

											case 10:
												oddType = 'Game';
												return _context.abrupt('break', 28);

											case 12:
												oddType = 'First Half';
												return _context.abrupt('break', 28);

											case 14:
												oddType = 'Second Half';
												return _context.abrupt('break', 28);

											case 16:
												oddType = 'First Quarter';
												return _context.abrupt('break', 28);

											case 18:
												oddType = 'Second Quarter';
												return _context.abrupt('break', 28);

											case 20:
												oddType = 'Third Quarter';
												return _context.abrupt('break', 28);

											case 22:
												oddType = 'Third Quarter';
												return _context.abrupt('break', 28);

											case 24:
												oddType = 'Fourth Quarter';
												return _context.abrupt('break', 28);

											case 26:
												console.log('new event !!!!!!!!!!!!!!!! ' + event.line.perioddesc);
												return _context.abrupt('return');

											case 28:
												newEventOdd = {
													uniqueId: home.rotnum + '_' + away.rotnum + '_' + 'FOOTBALL' + '_' + oddType.replace(/\s/g, '').toUpperCase() + '_' + _moment2.default.utc(event.event_datetimeGMT).add(4, 'h').subtract(0, 'm').format('MMDDYYYY'),
													source: {
														provider: 'betonline',
														bookmaker: 'betonline',
														id: null,
														lastUpdated: (0, _moment2.default)()
													},
													sport: 'Football',
													oddType: oddType,
													league: league,
													region: '',
													details: '',
													matchTime: _moment2.default.utc(event.event_datetimeGMT).add(4, 'h').subtract(0, 'm'),
													cutOffTime: _moment2.default.utc(event.period.periodcutoff_datetimeGMT).add(4, 'h').subtract(5, 'm').subtract(1, 'seconds'),
													team: {
														home: home.participant_name,
														homeROT: home.rotnum,
														homePitcher: '',
														away: away.participant_name,
														awayROT: away.rotnum,
														awayPitcher: ''
													},
													odds: {
														moneyLineHome: Number(home.odds.moneyline),
														moneyLineAway: Number(away.odds.moneyline),
														pointSpreadHome: Number(event.period.spread.spread_home),
														pointSpreadAway: Number(event.period.spread.spread_visiting),
														pointSpreadHomeLine: Number(event.period.spread.spread_adjust_home),
														pointSpreadAwayLine: Number(event.period.spread.spread_adjust_visiting),
														totalNumber: Number(event.period.total.total_points),
														overLine: Number(event.period.total.over_adjust),
														underLine: Number(event.period.total.under_adjust)
													},
													updatedAt: (0, _moment2.default)(),
													expireAt: _moment2.default.utc(event.period.periodcutoff_datetimeGMT).add(4, 'h').subtract(5, 'm').subtract(1, 'seconds')
												};
												_context.next = 31;
												return _EventOdd.EventOdd.findOne({ uniqueId: newEventOdd.uniqueId });

											case 31:
												existedEventOdd = _context.sent;

												if (!_lodash2.default.isEmpty(existedEventOdd)) {
													_context.next = 38;
													break;
												}

												_context.next = 35;
												return new _EventOdd.EventOdd(newEventOdd).save();

											case 35:
												console.log('saved ' + newEventOdd.uniqueId);
												_context.next = 41;
												break;

											case 38:
												_context.next = 40;
												return _EventOdd.EventOdd.findOneAndUpdate({ uniqueId: newEventOdd.uniqueId }, { $set: newEventOdd });

											case 40:
												console.log('updated ' + newEventOdd.uniqueId);

											case 41:
												return _context.abrupt('return', null);

											case 42:
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
						console.log('betOnline football data empty');

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

	return function fetch_betOnlineFootball_eventOdds() {
		return _ref.apply(this, arguments);
	};
}();

exports.default = fetch_betOnlineFootball_eventOdds;
//# sourceMappingURL=A4_fetch_betOnlineFootball_eventOdds.js.map