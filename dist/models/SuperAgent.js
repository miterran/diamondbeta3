'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var SuperAgentSchema = _mongoose2.default.Schema({
	account: {
		role: { type: String, default: 'superAgent', required: true },
		username: { type: String, required: true },
		password: { type: String, default: '1234', required: true },
		passcode: { type: String, default: '4321', required: true },
		email: { type: String },
		activate: { type: Boolean, default: true, required: true }
	},
	// agents: [{ type: Schema.Types.ObjectId, ref: 'Agent' }],
	// players: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
	createdAt: { type: Date, default: Date.now, required: true }
});

var SuperAgent = _mongoose2.default.model('SuperAgent', SuperAgentSchema);

exports.default = SuperAgent;

// const AgentSchema = mongoose.Schema({
// 	account: {
// 		superAgent: { type: Schema.Types.ObjectId, ref: 'SuperAgent' },
// 		players: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
// 		username: { type: String, required: true },
// 		password: { type: String, default: '1234', required: true },
// 		passcode: { type: String, default: '4321', required: true },
// 		email: { type: String },
// 		activate: { type: Boolean, default: true, required: true },
// 	},
// 	credit: {
// 		amount: { type: Number, default: 0, required: true }
// 	},
// 	betOrder: {
// 		openBets: [{ type: Schema.Types.ObjectId, ref: 'OpenBet' }],
// 		historyBets: [{ type: Schema.Types.ObjectId, ref: 'HistoryBet' }]
// 	},
// 	createdAt: { type: Date, default: Date.now, required: true }
// })

// const Agent = mongoose.model('Agent', AgentSchema)

// export default Agent
//# sourceMappingURL=SuperAgent.js.map