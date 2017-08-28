'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Player = require('../../../models/Player');

var _Player2 = _interopRequireDefault(_Player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var syncCurrentStatus = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
		var player;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						_context.next = 3;
						return _Player2.default.findOne({ '_id': req.user._id }, 'account.username account.passcode account.role account.activate defaultSetting currentStatus');

					case 3:
						player = _context.sent;

						res.json(player);
						_context.next = 10;
						break;

					case 7:
						_context.prev = 7;
						_context.t0 = _context['catch'](0);
						throw _context.t0;

					case 10:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 7]]);
	}));

	return function syncCurrentStatus(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

exports.default = syncCurrentStatus;
//# sourceMappingURL=syncCurrentStatus.js.map