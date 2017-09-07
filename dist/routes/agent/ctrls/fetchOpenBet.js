'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _BetOrder = require('../../../models/BetOrder');

var fetchOpenBet = function fetchOpenBet(req, res) {
	_BetOrder.OpenBet.find({
		'owner.agent': req.user._id
	}).populate({
		path: 'owner.player',
		select: 'account.username'
	}).then(function (openBets) {
		res.json(openBets);
	}).catch(function (err) {
		throw err;
	});
};

exports.default = fetchOpenBet;
//# sourceMappingURL=fetchOpenBet.js.map