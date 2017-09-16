'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _Player = require('../../../models/Player');

var _Player2 = _interopRequireDefault(_Player);

var _Agent = require('../../../models/Agent');

var _Agent2 = _interopRequireDefault(_Agent);

var _SuperAgent = require('../../../models/SuperAgent');

var _SuperAgent2 = _interopRequireDefault(_SuperAgent);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var checkNewAgentUsername = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
		var newUsername;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						newUsername = '';
						_context.next = 4;
						return _Player2.default.findOne({ 'account.username': req.body.username }, '_id');

					case 4:
						newUsername = _context.sent;

						if (!_lodash2.default.isEmpty(newUsername)) {
							_context.next = 9;
							break;
						}

						_context.next = 8;
						return _Agent2.default.findOne({ 'account.username': req.body.username }, '_id');

					case 8:
						newUsername = _context.sent;

					case 9:
						if (!_lodash2.default.isEmpty(newUsername)) {
							_context.next = 13;
							break;
						}

						_context.next = 12;
						return _SuperAgent2.default.findOne({ 'account.username': req.body.username }, '_id');

					case 12:
						newUsername = _context.sent;

					case 13:
						_lodash2.default.isEmpty(newUsername) ? newUsername = 'OK' : newUsername = 'USED';
						res.json(newUsername);
						_context.next = 20;
						break;

					case 17:
						_context.prev = 17;
						_context.t0 = _context['catch'](0);
						throw _context.t0;

					case 20:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 17]]);
	}));

	return function checkNewAgentUsername(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

exports.default = checkNewAgentUsername;
//# sourceMappingURL=checkNewAgentUsername.js.map