'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.fullResultUpdateDB_MW = exports.buildSportLeagueTable_MW = exports.fetchAllEventOdds_MW = undefined;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _CoolDown = require('../models/CoolDown');

var _CoolDown2 = _interopRequireDefault(_CoolDown);

var _A1_fetch_jsonOdd_eventOdds = require('../updateDB/A1_fetch_jsonOdd_eventOdds');

var _A1_fetch_jsonOdd_eventOdds2 = _interopRequireDefault(_A1_fetch_jsonOdd_eventOdds);

var _A2_fetch_pickMon_eventOdds = require('../updateDB/A2_fetch_pickMon_eventOdds');

var _A2_fetch_pickMon_eventOdds2 = _interopRequireDefault(_A2_fetch_pickMon_eventOdds);

var _B1_build_SportLeague_table = require('../updateDB/B1_build_SportLeague_table');

var _B1_build_SportLeague_table2 = _interopRequireDefault(_B1_build_SportLeague_table);

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

var fetchAllEventOdds_MW = exports.fetchAllEventOdds_MW = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res, next) {
		var cooldown;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						_context.next = 3;
						return _CoolDown2.default.findOne({ usage: 'fetchAllEventOdds' });

					case 3:
						cooldown = _context.sent;

						if (!((0, _moment2.default)().format('X') - (0, _moment2.default)(cooldown.updatedAt).format('X') > cooldown.sec)) {
							_context.next = 11;
							break;
						}

						_context.next = 7;
						return _CoolDown2.default.findOneAndUpdate({ usage: 'fetchAllEventOdds' }, { $set: { updatedAt: (0, _moment2.default)() } });

					case 7:
						_context.next = 9;
						return (0, _A1_fetch_jsonOdd_eventOdds2.default)();

					case 9:
						_context.next = 11;
						return (0, _A2_fetch_pickMon_eventOdds2.default)();

					case 11:
						next();
						_context.next = 17;
						break;

					case 14:
						_context.prev = 14;
						_context.t0 = _context['catch'](0);
						throw _context.t0;

					case 17:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 14]]);
	}));

	return function fetchAllEventOdds_MW(_x, _x2, _x3) {
		return _ref.apply(this, arguments);
	};
}();

var buildSportLeagueTable_MW = exports.buildSportLeagueTable_MW = function () {
	var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res, next) {
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_context2.prev = 0;
						_context2.next = 3;
						return (0, _B1_build_SportLeague_table2.default)();

					case 3:
						next();
						_context2.next = 9;
						break;

					case 6:
						_context2.prev = 6;
						_context2.t0 = _context2['catch'](0);
						throw _context2.t0;

					case 9:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, undefined, [[0, 6]]);
	}));

	return function buildSportLeagueTable_MW(_x4, _x5, _x6) {
		return _ref2.apply(this, arguments);
	};
}();

var fullResultUpdateDB_MW = exports.fullResultUpdateDB_MW = function () {
	var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(req, res, next) {
		var cooldown;
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
						next();
						_context3.next = 23;
						break;

					case 20:
						_context3.prev = 20;
						_context3.t0 = _context3['catch'](0);
						throw _context3.t0;

					case 23:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, undefined, [[0, 20]]);
	}));

	return function fullResultUpdateDB_MW(_x7, _x8, _x9) {
		return _ref3.apply(this, arguments);
	};
}();

// export const fullUpdateDB_MW = async (req, res, next) => {
// 	try{
// 		const fullUpdateDBcooldown = await CoolDown.findOne({ usage: 'fullUpdateDB' })
// 		if(moment().format('X') - moment(fullUpdateDBcooldown.updatedAt).format('X') > fullUpdateDBcooldown.sec){
// 			await CoolDown.findOneAndUpdate({ usage: 'fullUpdateDB' }, { $set: { updatedAt: moment() } })
// 			const fetchAllEventOddscooldown = await CoolDown.findOne({ usage: 'fetchAllEventOdds' })
// 			if(moment().format('X') - moment(fetchAllEventOddscooldown.updatedAt).format('X') > fetchAllEventOddscooldown.sec){
// 				await CoolDown.findOneAndUpdate({ usage: 'fetchAllEventOdds' }, { $set: { updatedAt: moment() } })
// 				await A1_fetch_jsonOdd_eventOdds()
// 				await A2_fetch_pickMon_eventOdds()
// 			}
// 			const fullResultUpdateDBcooldown = await CoolDown.findOne({ usage: 'fullResultUpdateDB' })
// 			if(moment().format('X') - moment(fullResultUpdateDBcooldown.updatedAt).format('X') > fullResultUpdateDBcooldown.sec){
// 				await CoolDown.findOneAndUpdate({ usage: 'fullResultUpdateDB' }, { $set: { updatedAt: moment() } })
// 				await C1_fetch_jsonOdd_result()
// 				await C2_fetch_pickMon_result()
// 				await D1_sync_Result_to_openBet_eventOdds()
// 				await E1_determine_OpenBet_eventOdds_result()
// 				await F1_confirm_openBet_result_to_HistoryBet()
// 			}
// 		}
// 		next()
// 	}catch(err){
// 		throw err
// 	}
// }
//# sourceMappingURL=updateDB.js.map