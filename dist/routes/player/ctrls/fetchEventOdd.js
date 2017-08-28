'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _EventOdd = require('../../../models/EventOdd');

var fetchEventOdd = function fetchEventOdd(req, res) {
	_EventOdd.EventOdd.find({ $or: req.body }).then(function (eventOdds) {
		res.json(eventOdds);
	}).catch(function (err) {
		throw err;
	});
};

exports.default = fetchEventOdd;
//# sourceMappingURL=fetchEventOdd.js.map