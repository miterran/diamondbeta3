'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.EventOdd = exports.Result = exports.EventOddSchema = undefined;

var _oddTypeList = require('../utils/oddTypeList');

var _oddTypeList2 = _interopRequireDefault(_oddTypeList);

var _sportList = require('../utils/sportList');

var _sportList2 = _interopRequireDefault(_sportList);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var EventOddSchema = exports.EventOddSchema = new Schema({
	uniqueId: { type: String },
	// eventOddId: { type: String },
	// eventResultId: { type: String },
	singlePickId: { type: String },
	radioPickId: { type: String },
	source: {
		provider: { type: String },
		bookmaker: { type: String },
		id: { type: String },
		lastUpdated: { type: Date }
	},
	sport: { type: String, enum: _sportList2.default, required: true },
	oddType: { type: String, enum: _oddTypeList2.default, required: true },
	league: { type: String },
	region: { type: String },
	details: { type: String },
	matchTime: { type: Date, required: true },
	cutOffTime: { type: Date },
	team: {
		home: { type: String, required: true },
		homeROT: { type: String },
		homePitcher: { type: String },
		away: { type: String, required: true },
		awayROT: { type: String },
		awayPitcher: { type: String }
	},
	odds: {
		moneyLineHome: { type: Number },
		moneyLineAway: { type: Number },
		pointSpreadHome: { type: Number },
		pointSpreadAway: { type: Number },
		pointSpreadHomeLine: { type: Number },
		pointSpreadAwayLine: { type: Number },
		totalNumber: { type: Number },
		overLine: { type: Number },
		underLine: { type: Number },
		drawLine: { type: Number }
	},
	betDetail: {
		oddLine: { type: Number },
		oddPoint: { type: Number },
		oddTarget: { type: String, enum: ['Home', 'Away', 'Over', 'Under', 'Draw'] },
		betType: { type: String, enum: ['M-Line', 'Spread', 'Total', 'Draw'] }
	},
	score: {
		homeScore: { type: Number, default: 0, required: true },
		awayScore: { type: Number, default: 0, required: true }
	},
	status: { type: String, enum: ['Existed', 'Pending', 'TimeOut', 'HasUpdated', 'Won', 'Won Half', 'Lost', 'Lost Half', 'Push', 'Closed', 'Canceled', 'Postponed', 'Review', 'Finished'] },
	// final: { type: Boolean }, // for result use only
	note: { type: String },
	updatedAt: { type: Date },
	expireAt: { type: Date }
});

EventOddSchema.index({ 'expireAt': 1 }, { expireAfterSeconds: 0 });

var Result = exports.Result = _mongoose2.default.model('Result', EventOddSchema);
var EventOdd = exports.EventOdd = _mongoose2.default.model('EventOdd', EventOddSchema);
//# sourceMappingURL=EventOdd.js.map