'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _SportLeague = require('../../../models/SportLeague');

var _SportLeague2 = _interopRequireDefault(_SportLeague);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetchSportLeague = function fetchSportLeague(req, res) {
	_SportLeague2.default.find({}).then(function (sportLeague) {
		res.json(sportLeague);
	}).catch(function (err) {
		throw err;
	});
};

exports.default = fetchSportLeague;
//# sourceMappingURL=fetchSportLeague.js.map