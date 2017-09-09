'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var PlayerSchema = _mongoose2.default.Schema({
	account: {
		role: { type: String, default: 'player', required: true },
		username: { type: String, required: true },
		password: { type: String, default: '1234', required: true },
		passcode: { type: String, default: '4321', required: true },
		email: { type: String },
		activate: { type: Boolean, default: true, required: true }
	},
	defaultSetting: {
		weeklyStartCredit: { type: Number, default: 10000, required: true },
		minRisk: { type: Number, default: 100, required: true },
		maxWager: { type: Number, default: 5000, required: true },
		maxWin: { type: Number, default: 10000, required: true },
		maxParlay: { type: Number, default: 7, required: true },
		amountGap: { type: Number, default: 50, required: true }
	},
	currentStatus: {
		creditPending: { type: Number, default: 0 },
		currentBalance: { type: Number, default: 0 },
		availableCredit: { type: Number, default: 0 }
	},
	openBetStatus: {
		straightBet: { type: Number, default: 0 },
		parlayBet: { type: Number, default: 0 },
		teaserBet: { type: Number, default: 0 },
		reverseBet: { type: Number, default: 0 },
		totalBets: { type: Number, default: 0 },
		totalRisk: { type: Number, default: 0 },
		totalWin: { type: Number, default: 0 }
	},
	superAgent: { type: Schema.Types.ObjectId, ref: 'SuperAgent' },
	agent: { type: Schema.Types.ObjectId, ref: 'Agent' },
	createdAt: { type: Date, default: Date.now, required: true }
});

var Player = _mongoose2.default.model('Player', PlayerSchema);

exports.default = Player;
//# sourceMappingURL=Player.js.map