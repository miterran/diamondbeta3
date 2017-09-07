'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Agent = require('../../models/Agent');

var _Agent2 = _interopRequireDefault(_Agent);

var _Player = require('../../models/Player');

var _Player2 = _interopRequireDefault(_Player);

var _BetOrder = require('../../models/BetOrder');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var createAgentTransaction = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(AgentId) {
		var newAgentTransaction;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						newAgentTransaction = new AgentTransaction({
							owner: {
								superAgent: req.user.superAgent,
								agent: req.user._id
							},
							orderType: 'Deposit',
							transactionType: 'in',
							creditAmount: purchaseCredit,
							priceAmount: purchasePrice,
							resultAmount: agent.currentStatus.credit,
							orderNumber: newAgentDeposit.orderNumber
						});
						_context.next = 4;
						return newAgentTransaction.save();

					case 4:
						_context.next = 9;
						break;

					case 6:
						_context.prev = 6;
						_context.t0 = _context['catch'](0);
						throw _context.t0;

					case 9:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 6]]);
	}));

	return function createAgentTransaction(_x) {
		return _ref.apply(this, arguments);
	};
}();

exports.default = createAgentTransaction;
//# sourceMappingURL=createAgentTransaction.js.map