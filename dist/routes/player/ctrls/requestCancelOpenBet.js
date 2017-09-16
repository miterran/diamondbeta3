'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _BetOrder = require('../../../models/BetOrder');

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var requestCancelOpenBet = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res) {
		var cancelList;
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_context2.prev = 0;

						console.log(req.body);
						cancelList = req.body.cancelList;
						_context2.next = 5;
						return Promise.all(cancelList.map(function () {
							var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(openBetId) {
								return regeneratorRuntime.wrap(function _callee$(_context) {
									while (1) {
										switch (_context.prev = _context.next) {
											case 0:
												_context.next = 2;
												return _BetOrder.OpenBet.findOneAndUpdate({ _id: _mongoose2.default.Types.ObjectId(openBetId) }, { $set: { requestCancel: true } });

											case 2:
											case 'end':
												return _context.stop();
										}
									}
								}, _callee, undefined);
							}));

							return function (_x3) {
								return _ref2.apply(this, arguments);
							};
						}())).then(function () {
							res.json('done');
						});

					case 5:
						_context2.next = 10;
						break;

					case 7:
						_context2.prev = 7;
						_context2.t0 = _context2['catch'](0);
						throw _context2.t0;

					case 10:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, undefined, [[0, 7]]);
	}));

	return function requestCancelOpenBet(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

exports.default = requestCancelOpenBet;
//# sourceMappingURL=requestCancelOpenBet.js.map