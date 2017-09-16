'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _Player = require('../models/Player');

var _Player2 = _interopRequireDefault(_Player);

var _Agent = require('../models/Agent');

var _Agent2 = _interopRequireDefault(_Agent);

var _SuperAgent = require('../models/SuperAgent');

var _SuperAgent2 = _interopRequireDefault(_SuperAgent);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = _express2.default.Router();

router.post('/login', function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
		var _req$body, username, password, authPlayer, token, authAgent, _token, authSuperAgent, _token2;

		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						_req$body = req.body, username = _req$body.username, password = _req$body.password;
						_context.next = 4;
						return _Player2.default.findOne({ 'account.username': { $regex: new RegExp('^' + username, 'i') } }, 'account');

					case 4:
						authPlayer = _context.sent;

						if (_lodash2.default.isEmpty(authPlayer)) {
							_context.next = 12;
							break;
						}

						if (!(password.toLowerCase() === authPlayer.account.password.toLowerCase())) {
							_context.next = 11;
							break;
						}

						token = _jsonwebtoken2.default.sign({
							id: authPlayer._id,
							role: authPlayer.account.role,
							username: authPlayer.account.username
						}, _config2.default.jwtSecret);
						return _context.abrupt('return', res.status(200).send(token));

					case 11:
						return _context.abrupt('return', res.status(404).send('password not correct'));

					case 12:
						_context.next = 14;
						return _Agent2.default.findOne({ 'account.username': { $regex: new RegExp('^' + username, 'i') } }, 'account');

					case 14:
						authAgent = _context.sent;

						if (_lodash2.default.isEmpty(authAgent)) {
							_context.next = 22;
							break;
						}

						if (!(password.toLowerCase() === authAgent.account.password.toLowerCase())) {
							_context.next = 21;
							break;
						}

						_token = _jsonwebtoken2.default.sign({
							id: authAgent._id,
							role: authAgent.account.role,
							username: authAgent.account.username
						}, _config2.default.jwtSecret);
						return _context.abrupt('return', res.status(200).send(_token));

					case 21:
						return _context.abrupt('return', res.status(404).send('password not correct'));

					case 22:
						_context.next = 24;
						return _SuperAgent2.default.findOne({ 'account.username': { $regex: new RegExp('^' + username, 'i') } }, 'account');

					case 24:
						authSuperAgent = _context.sent;

						if (_lodash2.default.isEmpty(authSuperAgent)) {
							_context.next = 32;
							break;
						}

						if (!(password.toLowerCase() === authSuperAgent.account.password.toLowerCase())) {
							_context.next = 31;
							break;
						}

						_token2 = _jsonwebtoken2.default.sign({
							id: authSuperAgent._id,
							role: authSuperAgent.account.role,
							username: authSuperAgent.account.username
						}, _config2.default.jwtSecret);
						return _context.abrupt('return', res.status(200).send(_token2));

					case 31:
						return _context.abrupt('return', res.status(404).send('password not correct'));

					case 32:
						return _context.abrupt('return', res.status(404).send('user not found'));

					case 35:
						_context.prev = 35;
						_context.t0 = _context['catch'](0);
						throw _context.t0;

					case 38:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 35]]);
	}));

	return function (_x, _x2) {
		return _ref.apply(this, arguments);
	};
}());

exports.default = router;
//# sourceMappingURL=authLogin.js.map