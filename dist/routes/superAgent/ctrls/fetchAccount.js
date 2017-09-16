'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _SuperAgent = require('../../../models/SuperAgent');

var _SuperAgent2 = _interopRequireDefault(_SuperAgent);

var _Agent = require('../../../models/Agent');

var _Agent2 = _interopRequireDefault(_Agent);

var _Player = require('../../../models/Player');

var _Player2 = _interopRequireDefault(_Player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var fetchAccount = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
		var superAgent, agents, players;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						_context.next = 3;
						return _SuperAgent2.default.findOne({ '_id': req.user._id }, 'account.username account.passcode account.role');

					case 3:
						superAgent = _context.sent;
						_context.next = 6;
						return _Agent2.default.find({}, 'account');

					case 6:
						agents = _context.sent;
						_context.next = 9;
						return _Player2.default.find({}, 'account');

					case 9:
						players = _context.sent;

						res.json({
							account: {
								username: superAgent.account.username,
								passcode: superAgent.account.passcode,
								role: superAgent.account.role
							},
							agents: agents,
							players: players
						});
						_context.next = 16;
						break;

					case 13:
						_context.prev = 13;
						_context.t0 = _context['catch'](0);
						throw _context.t0;

					case 16:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 13]]);
	}));

	return function fetchAccount(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

exports.default = fetchAccount;
//# sourceMappingURL=fetchAccount.js.map