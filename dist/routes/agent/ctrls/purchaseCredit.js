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

var purchaseCredit = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
		var _purchaseCredit, purchasePrice, newAgentDeposit, agent, newAgentTransaction;

		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						_purchaseCredit = req.body.credit;
						purchasePrice = req.body.price;
						newAgentDeposit = new _AgentDeposit2.default({
							owner: {
								superAgent: req.user.superAgent,
								agent: req.user._id
							},
							creditAmount: _purchaseCredit,
							priceAmount: purchasePrice,
							orderNumber: _uniqid2.default.process().toUpperCase()
						});
						_context.next = 6;
						return newAgentDeposit.save();

					case 6:
						_context.next = 8;
						return _Agent2.default.findOneAndUpdate({ _id: req.user._id }, { '$inc': { 'currentStatus.credit': _purchaseCredit, 'currentStatus.availableCredit': _purchaseCredit } }, { new: true });

					case 8:
						agent = _context.sent;
						newAgentTransaction = new _AgentTransaction2.default({
							owner: {
								superAgent: req.user.superAgent,
								agent: req.user._id
							},
							orderType: 'Deposit',
							transactionType: 'in',
							creditAmount: _purchaseCredit,
							resultAmount: agent.currentStatus.credit,
							orderNumber: newAgentDeposit.orderNumber
						});
						_context.next = 12;
						return newAgentTransaction.save();

					case 12:
						res.json(req.user);

						_context.next = 18;
						break;

					case 15:
						_context.prev = 15;
						_context.t0 = _context['catch'](0);
						throw _context.t0;

					case 18:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 15]]);
	}));

	return function purchaseCredit(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

exports.default = purchaseCredit;
//# sourceMappingURL=purchaseCredit.js.map