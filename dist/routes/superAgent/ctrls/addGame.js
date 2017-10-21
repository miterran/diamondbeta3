'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _uniqid = require('uniqid');

var _uniqid2 = _interopRequireDefault(_uniqid);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _AgentDeposit = require('../../../models/AgentDeposit');

var _AgentDeposit2 = _interopRequireDefault(_AgentDeposit);

var _AgentTransaction = require('../../../models/AgentTransaction');

var _AgentTransaction2 = _interopRequireDefault(_AgentTransaction);

var _Agent = require('../../../models/Agent');

var _Agent2 = _interopRequireDefault(_Agent);

var _EventOdd = require('../../../models/EventOdd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var addGame = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
		var gameInfo, cutOff, newEventOdd, existedEventOdd;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						gameInfo = req.body.gameInfo;

						console.log(gameInfo);
						cutOff = '';


						if (gameInfo.cutOffTime === '') {
							cutOff = (0, _moment2.default)(gameInfo.matchTime).add(900, 'seconds');
						} else {
							cutOff = (0, _moment2.default)(gameInfo.cutOffTime);
						}

						newEventOdd = new _EventOdd.EventOdd({

							sport: gameInfo.sport,
							oddType: gameInfo.oddType,
							matchTime: (0, _moment2.default)(gameInfo.matchTime),
							cutOffTime: cutOff,
							expireAt: (0, _moment2.default)(gameInfo.matchTime).add(3600, 'seconds'),
							league: gameInfo.league,
							uniqueId: gameInfo.team.homeROT + '_' + gameInfo.team.awayROT + '_' + gameInfo.sport.replace(/\s/g, '').toUpperCase() + '_' + gameInfo.oddType.replace(/\s/g, '').toUpperCase() + '_' + (0, _moment2.default)(gameInfo.matchTime).format('MMDDYYYY'),
							odds: {
								drawLine: 0,
								underLine: Number(gameInfo.odds.underLine),
								overLine: Number(gameInfo.odds.overLine),
								totalNumber: Number(gameInfo.odds.totalNumber),
								pointSpreadAwayLine: Number(gameInfo.odds.pointSpreadAwayLine),
								pointSpreadHomeLine: Number(gameInfo.odds.pointSpreadHomeLine),
								pointSpreadAway: Number(gameInfo.odds.pointSpreadAway),
								pointSpreadHome: Number(gameInfo.odds.pointSpreadHome),
								moneyLineAway: Number(gameInfo.odds.moneyLineAway),
								moneyLineHome: Number(gameInfo.odds.moneyLineHome)
							},
							team: {
								awayRot: gameInfo.team.awayRot,
								away: gameInfo.team.away,
								homeRot: gameInfo.team.homeRot,
								home: gameInfo.team.home
							},
							source: {
								lastUpdated: (0, _moment2.default)(),
								id: _uniqid2.default.process().toUpperCase(),
								bookmaker: 'super',
								provider: 'super'
							}
						});
						_context.next = 8;
						return _EventOdd.EventOdd.findOne({ uniqueId: newEventOdd.uniqueId });

					case 8:
						existedEventOdd = _context.sent;

						if (!_lodash2.default.isEmpty(existedEventOdd)) {
							_context.next = 16;
							break;
						}

						_context.next = 12;
						return newEventOdd.save(function (err) {
							if (err) {
								console.log(err);
							}
						});

					case 12:
						console.log('saved ' + newEventOdd.uniqueId);
						res.json('done');
						_context.next = 17;
						break;

					case 16:
						res.json('existed');

					case 17:
						_context.next = 22;
						break;

					case 19:
						_context.prev = 19;
						_context.t0 = _context['catch'](0);
						throw _context.t0;

					case 22:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 19]]);
	}));

	return function addGame(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

exports.default = addGame;
//# sourceMappingURL=addGame.js.map