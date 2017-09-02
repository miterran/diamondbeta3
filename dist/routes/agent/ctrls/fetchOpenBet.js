'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _BetOrder = require('../../../models/BetOrder');

var fetchOpenBet = function fetchOpenBet(req, res) {
	var player = req.body.player;

	_BetOrder.OpenBet.find({ 'owner.agent': req.user._id, 'owner.player': player }).then(function (openBets) {
		res.json(openBets);
	}).catch(function (err) {
		throw err;
	});
};

exports.default = fetchOpenBet;
//# sourceMappingURL=fetchOpenBet.js.map