'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _updatePlayerStatusAfterOrder = require('../updateDB/utils/updatePlayerStatusAfterOrder');

var _updatePlayerStatusAfterOrder2 = _interopRequireDefault(_updatePlayerStatusAfterOrder);

var _Player = require('../models/Player');

var _Player2 = _interopRequireDefault(_Player);

var _Agent = require('../models/Agent');

var _Agent2 = _interopRequireDefault(_Agent);

var _SuperAgent = require('../models/SuperAgent');

var _SuperAgent2 = _interopRequireDefault(_SuperAgent);

var _BetOrder = require('../models/BetOrder');

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportJwt = require('passport-jwt');

var _passportJwt2 = _interopRequireDefault(_passportJwt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var ExtractJwt = _passportJwt2.default.ExtractJwt;
var JwtStrategy = _passportJwt2.default.Strategy;

var jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeader(),
	secretOrKey: _config2.default.jwtSecret
};

var strategy = new JwtStrategy(jwtOptions, function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(jwt_payload, next) {
		var role, id, user;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						role = jwt_payload.role, id = jwt_payload.id;
						_context.t0 = role;
						_context.next = _context.t0 === 'player' ? 4 : 9;
						break;

					case 4:
						_context.next = 6;
						return _Player2.default.findOne({ '_id': _mongoose2.default.Types.ObjectId(id) }, 'agent superAgent account.username account.passcode account.role account.activate defaultSetting currentStatus');

					case 6:
						user = _context.sent;

						user ? next(null, user) : next(null, false);
						return _context.abrupt('break', 11);

					case 9:
						next(null, false);
						return _context.abrupt('return');

					case 11:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function (_x, _x2) {
		return _ref.apply(this, arguments);
	};
}());

exports.default = strategy;
//# sourceMappingURL=jwtStrategy.js.map