'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Agent = require('../../../models/Agent');

var _Agent2 = _interopRequireDefault(_Agent);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } //import moment from 'moment'
// import Player from '../../../models/Player';

// import SuperAgent from '../../../models/SuperAgent';


var agentAccountSetting = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
		var _req$body, currentPassword, newPassword, newPasscode, updatePass, agent, updatedAgent;

		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						_req$body = req.body, currentPassword = _req$body.currentPassword, newPassword = _req$body.newPassword, newPasscode = _req$body.newPasscode;
						updatePass = {};
						_context.next = 5;
						return _Agent2.default.findOne({ _id: req.user._id }, 'account.password');

					case 5:
						agent = _context.sent;

						if (!(agent.account.password.toLowerCase() !== currentPassword.toLowerCase())) {
							_context.next = 10;
							break;
						}

						res.json('notMatch');
						_context.next = 16;
						break;

					case 10:
						if (!_lodash2.default.isEmpty(newPassword)) updatePass['account.password'] = newPassword;
						if (!_lodash2.default.isEmpty(newPasscode)) updatePass['account.passcode'] = newPasscode;
						_context.next = 14;
						return _Agent2.default.findOneAndUpdate({ _id: req.user._id }, { $set: updatePass }, { new: true });

					case 14:
						updatedAgent = _context.sent;

						res.json('pass');

					case 16:
						_context.next = 21;
						break;

					case 18:
						_context.prev = 18;
						_context.t0 = _context['catch'](0);
						throw _context.t0;

					case 21:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 18]]);
	}));

	return function agentAccountSetting(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

exports.default = agentAccountSetting;
//# sourceMappingURL=agentAccountSetting.js.map