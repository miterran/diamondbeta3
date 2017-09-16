'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _Agent = require('../../../models/Agent');

var _Agent2 = _interopRequireDefault(_Agent);

var _BetOrder = require('../../../models/BetOrder');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var fetchAgentStatus = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
		var _agentStatus;

		var agent, agentHistoryBets, agentStatus;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.next = 2;
						return _Agent2.default.findOne({
							'_id': _mongoose2.default.Types.ObjectId(req.body.agentId)
						}, 'account defaultSetting currentStatus openBetStatus players lastOnline createdAt').populate({
							path: 'players',
							select: 'account.username'
						});

					case 2:
						agent = _context.sent;
						_context.next = 5;
						return _BetOrder.HistoryBet.find({ 'owner.agent': _mongoose2.default.Types.ObjectId(req.body.agentId), 'closedAt': { $gte: (0, _moment2.default)().startOf('isoWeek'), $lte: (0, _moment2.default)().endOf('isoWeek') } }, 'closedAt resultAmount');

					case 5:
						agentHistoryBets = _context.sent;
						agentStatus = (_agentStatus = {
							account: agent.account,
							defaultSetting: agent.defaultSetting,
							currentStatus: agent.currentStatus,
							openBetStatus: agent.openBetStatus,
							thisWeekHistoryBetList: agentHistoryBets,
							createdAt: agent.createdAt,
							lastOnline: agent.lastOnline
						}, _defineProperty(_agentStatus, 'createdAt', agent.createdAt), _defineProperty(_agentStatus, 'players', agent.players), _agentStatus);

						res.json(agentStatus);

					case 8:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function fetchAgentStatus(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

exports.default = fetchAgentStatus;
//# sourceMappingURL=fetchAgentStatus.js.map