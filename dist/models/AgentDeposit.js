'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var AgentDepositSchema = _mongoose2.default.Schema({
	owner: {
		player: { type: Schema.Types.ObjectId, ref: 'Player' },
		superAgent: { type: Schema.Types.ObjectId, ref: 'SuperAgent' },
		agent: { type: Schema.Types.ObjectId, ref: 'Agent' }
	},
	orderType: { type: String, default: 'Deposit' },
	creditAmount: { type: Number },
	priceAmount: { type: Number },
	orderNumber: { type: String, required: true },
	closedAt: { type: Date, default: Date.now }
});

var AgentDeposit = _mongoose2.default.model('AgentDeposit', AgentDepositSchema);

exports.default = AgentDeposit;
//# sourceMappingURL=AgentDeposit.js.map