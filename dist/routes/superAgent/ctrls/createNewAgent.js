'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _Agent = require('../../../models/Agent');

var _Agent2 = _interopRequireDefault(_Agent);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var createNewAgent = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
		var _req$body, username, password, passcode, newAgent;

		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						_req$body = req.body, username = _req$body.username, password = _req$body.password, passcode = _req$body.passcode;
						newAgent = new _Agent2.default({
							account: {
								username: username,
								password: password,
								passcode: passcode
							},
							superAgent: req.user._id
						});
						_context.next = 5;
						return newAgent.save();

					case 5:

						res.json(newAgent);

						_context.next = 11;
						break;

					case 8:
						_context.prev = 8;
						_context.t0 = _context['catch'](0);
						throw _context.t0;

					case 11:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 8]]);
	}));

	return function createNewAgent(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

exports.default = createNewAgent;
//# sourceMappingURL=createNewAgent.js.map