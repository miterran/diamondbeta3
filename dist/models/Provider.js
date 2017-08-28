'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _sportList = require('../utils/sportList');

var _sportList2 = _interopRequireDefault(_sportList);

var _leagueList = require('../utils/leagueList');

var _leagueList2 = _interopRequireDefault(_leagueList);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var ProviderSchema = new Schema({
	sport: { type: String, enum: _sportList2.default },
	league: { type: String, enum: _leagueList2.default },
	apiLink: { type: String, required: true },
	bookmaker: { type: String, required: true },
	option: { type: Object },
	provider: { type: String, enum: ['jsonOdd', 'pickMon', 'none'], required: true },
	updatedAt: { type: Date, required: true },
	activate: { type: Boolean, default: true }
});

var Provider = _mongoose2.default.model('Provider', ProviderSchema);

exports.default = Provider;
//# sourceMappingURL=Provider.js.map