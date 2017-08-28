'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

// import mongoose from 'mongoose'
// const Schema = mongoose.Schema

var AgentCreditTransactionSchema = _mongoose2.default.Schema({
	owner: {
		superAgent: { type: Schema.Types.ObjectId, ref: 'SuperAgent' },
		agent: { type: Schema.Types.ObjectId, ref: 'Agent' },
		player: { type: Schema.Types.ObjectId, ref: 'Player' }
	},
	amount: { type: Number },
	balance: { type: Number },
	type: { type: String },
	orderNumber: { type: String },
	createdAt: { type: Date, default: Date.now }
});

// const AgentCreditTransaction = mongoose.model('AgentCreditTransaction', AgentCreditTransactionSchema)

// export default AgentCreditTransaction


var AgentSchema = _mongoose2.default.Schema({
	account: {
		role: { type: String, default: 'agent', required: true },
		username: { type: String, required: true },
		password: { type: String, default: '1234', required: true },
		passcode: { type: String, default: '4321', required: true },
		email: { type: String },
		activate: { type: Boolean, default: true, required: true }
	},
	superAgent: { type: Schema.Types.ObjectId, ref: 'SuperAgent' },
	players: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
	credit: {
		amount: { type: Number, default: 0, required: true },
		transactions: [AgentCreditTransactionSchema]
	},
	// betOrder: {
	// 	openBets: [{ type: Schema.Types.ObjectId, ref: 'OpenBet' }],
	// 	historyBets: [{ type: Schema.Types.ObjectId, ref: 'HistoryBet' }]
	// },
	createdAt: { type: Date, default: Date.now, required: true }
});

var Agent = _mongoose2.default.model('Agent', AgentSchema);

exports.default = Agent;
//# sourceMappingURL=Agent.js.map