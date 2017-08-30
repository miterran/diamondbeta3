'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.HistoryBet = exports.OpenBet = undefined;

var _EventOdd = require('./EventOdd');

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var BetOrderSchema = new _mongoose2.default.Schema({
	orderNumber: { type: String, required: true },
	orderType: { type: String, enum: ['Straight', 'Parlay', 'Teaser6040', 'Teaser6545', 'Teaser7050', 'SuperTeaser'], required: true },
	owner: {
		superAgent: { type: Schema.Types.ObjectId, ref: 'SuperAgent' },
		agent: { type: Schema.Types.ObjectId, ref: 'Agent' },
		player: { type: Schema.Types.ObjectId, ref: 'Player' }
	},
	wagerDetail: {
		betType: { type: String, enum: ['wager', 'risk'], required: true },
		betAmount: { type: Number, required: true },
		winAmount: { type: Number, required: true },
		riskAmount: { type: Number, required: true }
	},
	// msg: {
	// 	type: { type: String, enum: ['warning', 'error', 'success'], default: ''},
	// 	detail: { type: String, default: ''}
	// },
	status: { type: String, enum: ['Won', 'Won Half', 'Lost', 'Lost Half', 'Push', 'Closed', 'Pending', 'Canceled', 'Postponed', 'Finished', 'Review'] },
	resultAmount: { type: Number, default: 0 },
	eventOdds: [_EventOdd.EventOddSchema],
	note: { type: String },
	createdAt: { type: Date, default: Date.now, required: true },
	updatedAt: { type: Date },
	closedAt: { type: Date }
});

var OpenBet = exports.OpenBet = _mongoose2.default.model('OpenBet', BetOrderSchema);
var HistoryBet = exports.HistoryBet = _mongoose2.default.model('HistoryBet', BetOrderSchema);
//# sourceMappingURL=BetOrder.js.map