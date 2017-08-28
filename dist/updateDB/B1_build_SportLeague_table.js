'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _SportLeague = require('../models/SportLeague');

var _SportLeague2 = _interopRequireDefault(_SportLeague);

var _EventOdd = require('../models/EventOdd');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var build_SportLeague_table = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
		var sportLeagueList;
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_context2.prev = 0;
						_context2.next = 3;
						return _SportLeague2.default.find({});

					case 3:
						sportLeagueList = _context2.sent;
						_context2.next = 6;
						return Promise.all(sportLeagueList.map(function () {
							var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(sportLeague) {
								var eventOddList, leagues;
								return regeneratorRuntime.wrap(function _callee$(_context) {
									while (1) {
										switch (_context.prev = _context.next) {
											case 0:
												_context.next = 2;
												return _EventOdd.EventOdd.find({ sport: sportLeague.sport });

											case 2:
												eventOddList = _context.sent;
												leagues = [];

												eventOddList.map(function (eventOdd) {
													var addLeague = !_lodash2.default.some(leagues, { name: eventOdd.league, region: eventOdd.region });
													addLeague ? leagues.push({ name: eventOdd.league, region: eventOdd.region, details: eventOdd.details, oddTypes: [] }) : null;
													var addOddType = !leagues[leagues.findIndex(function (league) {
														return league.name === eventOdd.league && league.region === eventOdd.region;
													})].oddTypes.includes(eventOdd.oddType);
													addOddType ? leagues[leagues.findIndex(function (league) {
														return league.name === eventOdd.league && league.region === eventOdd.region;
													})].oddTypes.push(eventOdd.oddType) : null;
													return null;
												});
												_context.next = 7;
												return _SportLeague2.default.findOneAndUpdate({ sport: sportLeague.sport }, { $set: { leagues: leagues, updatedAt: (0, _moment2.default)() } });

											case 7:
												console.log('updated ' + sportLeague.sport);
												return _context.abrupt('return', null);

											case 9:
											case 'end':
												return _context.stop();
										}
									}
								}, _callee, undefined);
							}));

							return function (_x) {
								return _ref2.apply(this, arguments);
							};
						}())).then(function () {
							console.log('update sport league done');
						}).catch(function (err) {
							throw err;
						});

					case 6:
						_context2.next = 11;
						break;

					case 8:
						_context2.prev = 8;
						_context2.t0 = _context2['catch'](0);
						throw _context2.t0;

					case 11:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, undefined, [[0, 8]]);
	}));

	return function build_SportLeague_table() {
		return _ref.apply(this, arguments);
	};
}();

exports.default = build_SportLeague_table;
//# sourceMappingURL=B1_build_SportLeague_table.js.map