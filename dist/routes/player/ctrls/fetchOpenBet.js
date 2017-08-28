'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _BetOrder = require('../../../models/BetOrder');

var fetchOpenBet = function fetchOpenBet(req, res) {
	_BetOrder.OpenBet.find({ 'owner.player': req.user._id }).then(function (openBets) {
		res.json(openBets);
	}).catch(function (err) {
		throw err;
	});
};

exports.default = fetchOpenBet;
//# sourceMappingURL=fetchOpenBet.js.map