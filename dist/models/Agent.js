'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var AgentSchema = _mongoose2.default.Schema({
	account: {
		role: { type: String, default: 'agent', required: true },
		username: { type: String, required: true },
		password: { type: String, default: '1234', required: true },
		passcode: { type: String, default: '1234', required: true },
		email: { type: String },
		activate: { type: Boolean, default: true, required: true }
	},
	defaultSetting: {
		maxPlayer: { type: Number, default: 10, required: true }
	},
	currentStatus: {
		credit: { type: Number, default: 0 },
		creditPending: { type: Number, default: 0 },
		availableCredit: { type: Number, default: 0 }
	},
	openBetStatus: {
		requestCancelBet: { type: Number, default: 0 },
		activePlayer: { type: Number, default: 0 },
		straightBet: { type: Number, default: 0 },
		parlayBet: { type: Number, default: 0 },
		teaserBet: { type: Number, default: 0 },
		reverseBet: { type: Number, default: 0 },
		totalBets: { type: Number, default: 0 },
		totalRisk: { type: Number, default: 0 },
		totalWin: { type: Number, default: 0 }
	},
	players: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
	superAgent: { type: Schema.Types.ObjectId, ref: 'SuperAgent', required: true },
	lastOnline: { type: Date, default: Date.now, required: true },
	createdAt: { type: Date, default: Date.now, required: true }
});

var Agent = _mongoose2.default.model('Agent', AgentSchema);

exports.default = Agent;
//# sourceMappingURL=Agent.js.map