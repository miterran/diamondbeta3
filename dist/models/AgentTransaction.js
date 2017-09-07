'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var AgentTransactionSchema = _mongoose2.default.Schema({
	owner: {
		player: { type: Schema.Types.ObjectId, ref: 'Player' },
		superAgent: { type: Schema.Types.ObjectId, ref: 'SuperAgent' },
		agent: { type: Schema.Types.ObjectId, ref: 'Agent' }
	},
	orderType: { type: String, enum: ['Straight', 'Parlay', 'Teaser6040', 'Teaser6545', 'Teaser7050', 'SuperTeaser', 'WinReverse', 'ActionReverse', 'Deposit'], required: true },
	transactionType: { type: String, enum: ['in', 'out'] },
	creditAmount: { type: Number },
	resultAmount: { type: Number },
	orderNumber: { type: String, required: true },
	createdAt: { type: Date, default: Date.now }
});

var AgentTransaction = _mongoose2.default.model('AgentTransaction', AgentTransactionSchema);

exports.default = AgentTransaction;
//# sourceMappingURL=AgentTransaction.js.map