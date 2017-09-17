'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _updateAgentOpenBetStatusAfterOrder = require('../updateDB/updateUser/updateAgentOpenBetStatusAfterOrder');

var _updateAgentOpenBetStatusAfterOrder2 = _interopRequireDefault(_updateAgentOpenBetStatusAfterOrder);

var _updatePlayerStatusAfterOrder = require('../updateDB/updateUser/updatePlayerStatusAfterOrder');

var _updatePlayerStatusAfterOrder2 = _interopRequireDefault(_updatePlayerStatusAfterOrder);

var _Player = require('../models/Player');

var _Player2 = _interopRequireDefault(_Player);

var _Agent = require('../models/Agent');

var _Agent2 = _interopRequireDefault(_Agent);

var _CoolDown = require('../models/CoolDown');

var _CoolDown2 = _interopRequireDefault(_CoolDown);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _C1_fetch_jsonOdd_result = require('../updateDB/C1_fetch_jsonOdd_result');

var _C1_fetch_jsonOdd_result2 = _interopRequireDefault(_C1_fetch_jsonOdd_result);

var _C2_fetch_pickMon_result = require('../updateDB/C2_fetch_pickMon_result');

var _C2_fetch_pickMon_result2 = _interopRequireDefault(_C2_fetch_pickMon_result);

var _D1_sync_Result_to_openBet_eventOdds = require('../updateDB/D1_sync_Result_to_openBet_eventOdds');

var _D1_sync_Result_to_openBet_eventOdds2 = _interopRequireDefault(_D1_sync_Result_to_openBet_eventOdds);

var _E1_determine_OpenBet_eventOdds_result = require('../updateDB/E1_determine_OpenBet_eventOdds_result');

var _E1_determine_OpenBet_eventOdds_result2 = _interopRequireDefault(_E1_determine_OpenBet_eventOdds_result);

var _F1_confirm_openBet_result_to_HistoryBet = require('../updateDB/F1_confirm_openBet_result_to_HistoryBet');

var _F1_confirm_openBet_result_to_HistoryBet2 = _interopRequireDefault(_F1_confirm_openBet_result_to_HistoryBet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var resetUserStatus = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
		var cooldown, cooldownTimer, players, agents;
		return regeneratorRuntime.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						_context3.prev = 0;
						_context3.next = 3;
						return _CoolDown2.default.findOne({ usage: 'fullResultUpdateDB' });

					case 3:
						cooldown = _context3.sent;

						if (!((0, _moment2.default)().format('X') - (0, _moment2.default)(cooldown.updatedAt).format('X') > cooldown.sec)) {
							_context3.next = 17;
							break;
						}

						_context3.next = 7;
						return _CoolDown2.default.findOneAndUpdate({ usage: 'fullResultUpdateDB' }, { $set: { updatedAt: (0, _moment2.default)() } });

					case 7:
						_context3.next = 9;
						return (0, _C1_fetch_jsonOdd_result2.default)();

					case 9:
						_context3.next = 11;
						return (0, _C2_fetch_pickMon_result2.default)();

					case 11:
						_context3.next = 13;
						return (0, _D1_sync_Result_to_openBet_eventOdds2.default)();

					case 13:
						_context3.next = 15;
						return (0, _E1_determine_OpenBet_eventOdds_result2.default)();

					case 15:
						_context3.next = 17;
						return (0, _F1_confirm_openBet_result_to_HistoryBet2.default)();

					case 17:
						_context3.next = 19;
						return _CoolDown2.default.findOne({ usage: 'resetUserStatus' }, 'sec');

					case 19:
						cooldownTimer = _context3.sent;

						if (!(cooldownTimer.sec !== (0, _moment2.default)().isoWeek())) {
							_context3.next = 36;
							break;
						}

						_context3.next = 23;
						return _Player2.default.find({}, '_id');

					case 23:
						players = _context3.sent;
						_context3.next = 26;
						return Promise.all(players.map(function () {
							var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(player) {
								return regeneratorRuntime.wrap(function _callee$(_context) {
									while (1) {
										switch (_context.prev = _context.next) {
											case 0:
												_context.next = 2;
												return (0, _updatePlayerStatusAfterOrder2.default)(player._id);

											case 2:
												return _context.abrupt('return', null);

											case 3:
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

					case 26:
						_context3.next = 28;
						return _Agent2.default.find({}, '_id');

					case 28:
						agents = _context3.sent;
						_context3.next = 31;
						return Promise.all(agents.map(function () {
							var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(agent) {
								return regeneratorRuntime.wrap(function _callee2$(_context2) {
									while (1) {
										switch (_context2.prev = _context2.next) {
											case 0:
												_context2.next = 2;
												return (0, _updateAgentOpenBetStatusAfterOrder2.default)(agent._id);

											case 2:
												return _context2.abrupt('return', null);

											case 3:
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

					case 31:
						_context3.next = 33;
						return _CoolDown2.default.findOneAndUpdate({ usage: 'resetUserStatus' }, { $set: { sec: (0, _moment2.default)().isoWeek() } });

					case 33:
						console.log('auto updated');

						_context3.next = 37;
						break;

					case 36:
						console.log('skip auto update');

					case 37:
						_context3.next = 42;
						break;

					case 39:
						_context3.prev = 39;
						_context3.t0 = _context3['catch'](0);
						throw _context3.t0;

					case 42:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, undefined, [[0, 39]]);
	}));

	return function resetUserStatus() {
		return _ref.apply(this, arguments);
	};
}();

exports.default = resetUserStatus;
//# sourceMappingURL=resetUserStatus.js.map