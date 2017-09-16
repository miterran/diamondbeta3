'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _uniqid = require('uniqid');

var _uniqid2 = _interopRequireDefault(_uniqid);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _AgentDeposit = require('../../../models/AgentDeposit');

var _AgentDeposit2 = _interopRequireDefault(_AgentDeposit);

var _AgentTransaction = require('../../../models/AgentTransaction');

var _AgentTransaction2 = _interopRequireDefault(_AgentTransaction);

var _Agent = require('../../../models/Agent');

var _Agent2 = _interopRequireDefault(_Agent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var addCredit = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
		var _req$body, creditAmount, agentUsername, agent, newAgentDeposit, newAgentTransaction;

		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						_req$body = req.body, creditAmount = _req$body.creditAmount, agentUsername = _req$body.agentUsername;
						_context.next = 4;
						return _Agent2.default.findOneAndUpdate({ 'account.username': agentUsername }, { '$inc': { 'currentStatus.credit': creditAmount, 'currentStatus.availableCredit': creditAmount } }, { new: true });

					case 4:
						agent = _context.sent;
						newAgentDeposit = new _AgentDeposit2.default({
							owner: {
								superAgent: req.user._id,
								agent: agent._id
							},
							creditAmount: creditAmount,
							priceAmount: 0,
							orderNumber: _uniqid2.default.process().toUpperCase()
						});
						_context.next = 8;
						return newAgentDeposit.save();

					case 8:
						newAgentTransaction = new _AgentTransaction2.default({
							owner: {
								superAgent: req.user._id,
								agent: agent._id
							},
							orderType: 'Deposit',
							transactionType: 'in',
							creditAmount: creditAmount,
							resultAmount: agent.currentStatus.credit,
							orderNumber: newAgentDeposit.orderNumber
						});
						_context.next = 11;
						return newAgentTransaction.save();

					case 11:
						res.json('done');

						_context.next = 17;
						break;

					case 14:
						_context.prev = 14;
						_context.t0 = _context['catch'](0);
						throw _context.t0;

					case 17:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 14]]);
	}));

	return function addCredit(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

exports.default = addCredit;
//# sourceMappingURL=addCredit.js.map