'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var AgentCreditTransactionSchema = _mongoose2.default.Schema({
	owner: {
		superAgent: { type: Schema.Types.ObjectId, ref: 'SuperAgent' },
		agent: { type: Schema.Types.ObjectId, ref: 'Agent' },
		player: { type: Schema.Types.ObjectId, ref: 'Player' }
	},
	status: { type: String, enum: ['Deposited', 'Won', 'Lost', 'Push', 'Pending', 'Canceled', 'Closed'] },
	amount: { type: Number, required: true },
	resultAmount: { type: Number, required: true },
	orderNumber: { type: String, required: true },
	createdAt: { type: Date, default: Date.now }
});

var AgentCreditTransaction = _mongoose2.default.model('AgentCreditTransaction', AgentCreditTransactionSchema);

exports.default = AgentCreditTransaction;
//# sourceMappingURL=AgentCreditTransaction.js.map