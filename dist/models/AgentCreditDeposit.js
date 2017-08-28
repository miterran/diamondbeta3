'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var AgentCreditDepositSchema = _mongoose2.default.Schema({
	owner: {
		superAgent: { type: Schema.Types.ObjectId, ref: 'SuperAgent' },
		agent: { type: Schema.Types.ObjectId, ref: 'Agent' }
	},
	source: { type: String, required: true },
	status: { type: String, default: 'Deposited' },
	amount: { type: Number, required: true },
	orderNumber: { type: String, required: true },
	createdAt: { type: Date, default: Date.now }
});

var AgentCreditDeposit = _mongoose2.default.model('AgentCreditDeposit', AgentCreditDepositSchema);

exports.default = AgentCreditDeposit;
//# sourceMappingURL=AgentCreditDeposit.js.map