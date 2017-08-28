'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _oddTypes = require('../utils/oddTypes');

var _oddTypes2 = _interopRequireDefault(_oddTypes);

var _sportList = require('../utils/sportList');

var _sportList2 = _interopRequireDefault(_sportList);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sportEnum = _sportList2.default.map(function (sport) {
	return sport.sport;
});

var Schema = _mongoose2.default.Schema;

var availableLeagueSchema = Schema({
	league: { type: String },
	region: { type: String },
	oddTypes: [{ type: String, enum: _oddTypes2.default }]
});

var LeagueSchema = Schema({
	provider: { type: String, enum: ['jsonOdd'], required: true },
	apiLink: { type: String, required: true },
	bookmaker: { type: String, required: true },
	category: { type: String, enum: ['Basketball', 'Soccer', 'Football', 'Boxing', 'MMA', 'Hockey', 'Baseball'], required: true },
	sport: { type: String, enum: sportEnum, required: true },
	availableLeagues: [availableLeagueSchema],
	updatedAt: { type: Date, required: true }
});

var League = _mongoose2.default.model('League', LeagueSchema);

exports.default = League;
//# sourceMappingURL=League.js.map