'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _SuperAgent = require('../models/SuperAgent');

var _SuperAgent2 = _interopRequireDefault(_SuperAgent);

var _Agent = require('../models/Agent');

var _Agent2 = _interopRequireDefault(_Agent);

var _Player = require('../models/Player');

var _Player2 = _interopRequireDefault(_Player);

var _updatePlayerStatusAfterOrder = require('../updateDB/utils/updatePlayerStatusAfterOrder');

var _updatePlayerStatusAfterOrder2 = _interopRequireDefault(_updatePlayerStatusAfterOrder);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _EventOdd = require('../models/EventOdd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = _express2.default.Router();

router.get('/setup', function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res) {
		var players;
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_context2.next = 2;
						return _Player2.default.find({});

					case 2:
						players = _context2.sent;
						_context2.next = 5;
						return Promise.all(players.map(function () {
							var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(player) {
								return regeneratorRuntime.wrap(function _callee$(_context) {
									while (1) {
										switch (_context.prev = _context.next) {
											case 0:
												_context.next = 2;
												return (0, _updatePlayerStatusAfterOrder2.default)(player._id);

											case 2:
											case 'end':
												return _context.stop();
										}
									}
								}, _callee, undefined);
							}));

							return function (_x3) {
								return _ref2.apply(this, arguments);
							};
						}())).then(function () {
							res.json('done');
						});

					case 5:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, undefined);
	}));

	return function (_x, _x2) {
		return _ref.apply(this, arguments);
	};
}());

router.get('/create-player', function () {
	var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(req, res) {
		var superAgent, agent, newPlayer, player;
		return regeneratorRuntime.wrap(function _callee4$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						_context4.next = 2;
						return _SuperAgent2.default.findOne({ 'account.username': 'boss' });

					case 2:
						superAgent = _context4.sent;
						_context4.next = 5;
						return _Agent2.default.findOne({ 'account.username': 'diamond' });

					case 5:
						agent = _context4.sent;
						newPlayer = new _Player2.default({
							account: {
								username: 'f',
								password: '1234',
								passcode: '4321',
								activate: true
							},
							superAgent: superAgent._id,
							agent: agent._id
						});
						_context4.next = 9;
						return newPlayer.save().then(function () {
							var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(newOne) {
								return regeneratorRuntime.wrap(function _callee3$(_context3) {
									while (1) {
										switch (_context3.prev = _context3.next) {
											case 0:
												_context3.next = 2;
												return (0, _updatePlayerStatusAfterOrder2.default)(newOne._id);

											case 2:
											case 'end':
												return _context3.stop();
										}
									}
								}, _callee3, undefined);
							}));

							return function (_x6) {
								return _ref4.apply(this, arguments);
							};
						}());

					case 9:
						player = _context4.sent;

						// await agent.players.push(player._id)
						// await agent.save()
						// await superAgent.players.push(player._id)
						// await superAgent.save()

						res.json(player);

					case 11:
					case 'end':
						return _context4.stop();
				}
			}
		}, _callee4, undefined);
	}));

	return function (_x4, _x5) {
		return _ref3.apply(this, arguments);
	};
}());

router.get('/create-agent', function () {
	var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(req, res) {
		var superAgent, newAgent, agent;
		return regeneratorRuntime.wrap(function _callee5$(_context5) {
			while (1) {
				switch (_context5.prev = _context5.next) {
					case 0:
						_context5.next = 2;
						return _SuperAgent2.default.findOne({ 'account.username': 'boss' });

					case 2:
						superAgent = _context5.sent;

						if (_lodash2.default.isEmpty(superAgent)) {
							_context5.next = 11;
							break;
						}

						newAgent = new _Agent2.default({
							account: {
								username: 'diamond'
							}
						});
						_context5.next = 7;
						return newAgent.save();

					case 7:
						agent = _context5.sent;

						//		superAgent.agents.push(agent._id)
						//		await superAgent.save()
						res.json('done');
						_context5.next = 12;
						break;

					case 11:
						res.json('super agent not found');

					case 12:
					case 'end':
						return _context5.stop();
				}
			}
		}, _callee5, undefined);
	}));

	return function (_x7, _x8) {
		return _ref5.apply(this, arguments);
	};
}());

router.get('/create-super-agent', function (req, res) {
	var newSuperAgent = new _SuperAgent2.default({
		account: {
			username: 'boss',
			password: '1234',
			passcode: '4321',
			activate: true
		}
	});
	newSuperAgent.save().then(function () {
		console.log('saved superAgent');
		res.json('saved superAgent');
	}).catch(function (err) {
		throw err;
	});
});

router.get('/agent-info', function (req, res) {
	_Agent2.default.findOne({ 'account.username': 'diamond' }).populate('players').then(function (agent) {
		res.json(agent);
	});
});

router.get('/create-result', function (req, res) {

	var newResult = new _EventOdd.Result({

		"eventResultId": "pickMon_College_GAME_1414713",
		"uniqueId": "221_222_FOOTBALL_GAME_08312017",
		"sport": "Football",
		"oddType": "Game",
		"league": "College",
		"region": "",
		"details": "Presbyterian College At Wake Forest",
		"matchTime": _moment2.default.utc("2017-08-31T22:30:00.000Z"),
		"expireAt": _moment2.default.utc("2017-09-03T11:00:00.000Z"),
		"status": "Finished",
		"score": {
			"awayScore": 51,
			"homeScore": 7
		},
		"team": {
			"awayROT": "222",
			"away": "Wake Forest",
			"homeROT": "221",
			"home": "Presbyterian College"
		},
		"source": {
			"provider": "custom",
			"id": "0"
		}
	});

	_EventOdd.Result.findOne({ uniqueId: newResult.uniqueId }).then(function (result) {
		if (_lodash2.default.isEmpty(result)) {
			newResult.save().then(function () {
				res.json('done');
			});
		} else {
			res.json('existed');
		}
	});
});

exports.default = router;
//# sourceMappingURL=createAccount.js.map