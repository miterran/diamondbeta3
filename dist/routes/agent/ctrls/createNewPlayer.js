'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _Player = require('../../../models/Player');

var _Player2 = _interopRequireDefault(_Player);

var _Agent = require('../../../models/Agent');

var _Agent2 = _interopRequireDefault(_Agent);

var _SuperAgent = require('../../../models/SuperAgent');

var _SuperAgent2 = _interopRequireDefault(_SuperAgent);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _updatePlayerStatusAfterOrder = require('../../../updateDB/updateUser/updatePlayerStatusAfterOrder');

var _updatePlayerStatusAfterOrder2 = _interopRequireDefault(_updatePlayerStatusAfterOrder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var createNewPlayer = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
		var _req$body, minRisk, maxWager, maxParlay, maxWin, weeklyStartCredit, username, password, passcode, existedPlayer, amountGap, newPlayer, newPlayerInfo;

		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;


						console.log(req.user);

						_req$body = req.body, minRisk = _req$body.minRisk, maxWager = _req$body.maxWager, maxParlay = _req$body.maxParlay, maxWin = _req$body.maxWin, weeklyStartCredit = _req$body.weeklyStartCredit, username = _req$body.username, password = _req$body.password, passcode = _req$body.passcode;
						_context.next = 5;
						return _Player2.default.findOne({ 'account.username': username }, '_id');

					case 5:
						existedPlayer = _context.sent;


						if (!_lodash2.default.isEmpty(existedPlayer)) res.status(404);

						amountGap = 10;
						_context.t0 = true;
						_context.next = _context.t0 === maxWager <= 500 ? 11 : _context.t0 === (maxWager > 500 && maxWager <= 1000) ? 13 : _context.t0 === (maxWager > 1000 && maxWager <= 3000) ? 15 : _context.t0 === maxWager > 3000 ? 17 : 19;
						break;

					case 11:
						//			case minRisk < 50:
						amountGap = 10;
						return _context.abrupt('break', 20);

					case 13:
						//			case minRisk >= 50 && minRisk < 100:
						amountGap = 20;
						return _context.abrupt('break', 20);

					case 15:
						//			case minRisk >= 100 && minRisk < 300:
						amountGap = 50;
						return _context.abrupt('break', 20);

					case 17:
						//			case minRisk >= 300:
						amountGap = 100;
						return _context.abrupt('break', 20);

					case 19:
						return _context.abrupt('return');

					case 20:
						newPlayer = new _Player2.default({
							account: {
								username: username,
								password: password,
								passcode: passcode
							},
							defaultSetting: {
								weeklyStartCredit: weeklyStartCredit,
								minRisk: minRisk,
								maxWager: maxWager,
								maxWin: maxWin,
								maxParlay: maxParlay,
								amountGap: amountGap
							},
							superAgent: req.user.superAgent,
							agent: req.user._id
						});
						_context.next = 23;
						return newPlayer.save();

					case 23:
						newPlayerInfo = _context.sent;
						_context.next = 26;
						return (0, _updatePlayerStatusAfterOrder2.default)(newPlayerInfo._id);

					case 26:
						_context.next = 28;
						return _Agent2.default.findOneAndUpdate({ _id: req.user._id }, { $push: { players: newPlayerInfo._id } });

					case 28:
						_context.next = 30;
						return _SuperAgent2.default.findOneAndUpdate({ _id: req.user.superAgent }, { $push: { players: newPlayerInfo._id } });

					case 30:

						res.json({ id: newPlayerInfo._id, username: newPlayerInfo.account.username });

						_context.next = 36;
						break;

					case 33:
						_context.prev = 33;
						_context.t1 = _context['catch'](0);
						throw _context.t1;

					case 36:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 33]]);
	}));

	return function createNewPlayer(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

exports.default = createNewPlayer;

// import mongoose from 'mongoose'
// const Schema = mongoose.Schema

// const PlayerSchema = mongoose.Schema({
// 	account: {
// 		role: { type: String, default: 'player', required: true },
// 		username: { type: String, required: true },
// 		password: { type: String, default: '1234', required: true },
// 		passcode: { type: String, default: '4321', required: true },
// 		email: { type: String },
// 		activate: { type: Boolean, default: true, required: true },
// 	},
// 	defaultSetting: {
// 		weeklyStartCredit: { type: Number, default: 10000, required: true },
// 		minRisk: { type: Number, default: 100, required: true },
// 		maxWager: { type: Number, default: 5000, required: true },
// 		maxWin: { type: Number, default: 10000, required: true },
// 		maxParlay: { type: Number, default: 7, required: true },
// 		amountGap: { type: Number, default: 50, required: true }
// 	},
// 	currentStatus: {
// 		creditPending: { type: Number, default: 0 },
// 		currentBalance: { type: Number, default: 0 },
// 		availableCredit: { type: Number, default: 0 }
// 	},
// 	openBetStatus: {
// 		straightBet: { type: Number, default: 0 },
// 		parlayBet: { type: Number, default: 0 },
// 		teaserBet: { type: Number, default: 0 },
// 		reverseBet: { type: Number, default: 0 },
// 		totalBets: { type: Number, default: 0 },
// 		totalRisk: { type: Number, default: 0 },
// 		totalWin: { type: Number, default: 0 }
// 	},
// 	superAgent: { type: Schema.Types.ObjectId, ref: 'SuperAgent' },
// 	agent: { type: Schema.Types.ObjectId, ref: 'Agent' },
// 	createdAt: { type: Date, default: Date.now, required: true }
// })

// const Player = mongoose.model('Player', PlayerSchema)

// export default Player
//# sourceMappingURL=createNewPlayer.js.map