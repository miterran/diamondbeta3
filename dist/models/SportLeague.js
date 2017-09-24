'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _oddTypeList = require('../utils/oddTypeList');

var _oddTypeList2 = _interopRequireDefault(_oddTypeList);

var _sportList = require('../utils/sportList');

var _sportList2 = _interopRequireDefault(_sportList);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var LeagueSchema = Schema({
	name: { type: String },
	region: { type: String },
	details: { type: String },
	oddTypes: [{ type: String, enum: _oddTypeList2.default }]
});

var SportLeagueSchema = Schema({
	sport: { type: String, enum: _sportList2.default, required: true },
	leagues: [LeagueSchema],
	updatedAt: { type: Date, default: Date.now, required: true }
});

var SportLeague = _mongoose2.default.model('SportLeague', SportLeagueSchema);

exports.default = SportLeague;
//# sourceMappingURL=SportLeague.js.map