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

var _EventOdd = require('../../../models/EventOdd');

var _BetOrder = require('../../../models/BetOrder');

var _Agent = require('../../../models/Agent');

var _Agent2 = _interopRequireDefault(_Agent);

var _compareBetDetail = require('../../../utils/compareBetDetail');

var _compareBetDetail2 = _interopRequireDefault(_compareBetDetail);

var _updatePlayerStatusAfterOrder = require('../../../updateDB/updateUser/updatePlayerStatusAfterOrder');

var _updatePlayerStatusAfterOrder2 = _interopRequireDefault(_updatePlayerStatusAfterOrder);

var _updateAgentOpenBetStatusAfterOrder = require('../../../updateDB/updateUser/updateAgentOpenBetStatusAfterOrder');

var _updateAgentOpenBetStatusAfterOrder2 = _interopRequireDefault(_updateAgentOpenBetStatusAfterOrder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var submitRadioBetOrder = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(req, res) {
		var _req$body, eventOdds, wagerDetails, orderType, agent, newOrderCombo, existedOrders, existed, existedOrderNumber;

		return regeneratorRuntime.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						_context3.prev = 0;
						_req$body = req.body, eventOdds = _req$body.eventOdds, wagerDetails = _req$body.wagerDetails, orderType = _req$body.orderType;
						_context3.next = 4;
						return _Agent2.default.findOne({ _id: req.user.agent }, 'currentStatus.availableCredit');

					case 4:
						agent = _context3.sent;

						if (!(agent.currentStatus.availableCredit > wagerDetails.winAmount)) {
							_context3.next = 17;
							break;
						}

						newOrderCombo = eventOdds.map(function (event) {
							return event['singlePickId'];
						});
						_context3.next = 9;
						return _BetOrder.OpenBet.find({ 'owner.player': req.user._id, 'orderType': orderType });

					case 9:
						existedOrders = _context3.sent;
						existed = false;
						existedOrderNumber = '';


						existedOrders.map(function (existedOrder) {
							if (existed) return;
							var existedOrderCombo = existedOrder.eventOdds.map(function (event) {
								return event['singlePickId'];
							});
							if (_lodash2.default.difference(newOrderCombo, existedOrderCombo).length === 0) {
								existed = true;
								existedOrderNumber = existedOrder.orderNumber;
								return;
							}
						});

						_context3.next = 15;
						return Promise.all(eventOdds.map(function () {
							var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(event) {
								var eventTimeOut, latestEvent;
								return regeneratorRuntime.wrap(function _callee$(_context) {
									while (1) {
										switch (_context.prev = _context.next) {
											case 0:
												eventTimeOut = (0, _moment2.default)().isSameOrAfter((0, _moment2.default)(event.cutOffTime).format());
												_context.t0 = true;
												_context.next = _context.t0 === eventTimeOut ? 4 : _context.t0 === existed ? 7 : 11;
												break;

											case 4:
												event.status = 'TimeOut';
												delete event.betDetail;
												return _context.abrupt('break', 16);

											case 7:
												event.status = 'Existed';
												event.note = existedOrderNumber;
												delete event.betDetail;
												return _context.abrupt('break', 16);

											case 11:
												_context.next = 13;
												return _EventOdd.EventOdd.findOne({ uniqueId: event.uniqueId });

											case 13:
												latestEvent = _context.sent;

												if ((0, _compareBetDetail2.default)(event, latestEvent, orderType).betDetailMatch) {
													event.status = 'Pending';
													event.note = '';
												} else {
													event.status = 'HasUpdated';
													event.betDetailPrev = event.betDetail;
													event.betDetail = (0, _compareBetDetail2.default)(event, latestEvent, orderType).latestBetDetail;
												}
												return _context.abrupt('break', 16);

											case 16:
												return _context.abrupt('return', event);

											case 17:
											case 'end':
												return _context.stop();
										}
									}
								}, _callee, undefined);
							}));

							return function (_x3) {
								return _ref2.apply(this, arguments);
							};
						}())).then(_asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
							var submitCheckPass, newOpenBet;
							return regeneratorRuntime.wrap(function _callee2$(_context2) {
								while (1) {
									switch (_context2.prev = _context2.next) {
										case 0:
											submitCheckPass = eventOdds.every(function (event) {
												return event.status === 'Pending';
											});

											if (submitCheckPass) {
												_context2.next = 5;
												break;
											}

											res.json({ eventOdds: eventOdds, wagerDetails: {
													betType: 'risk',
													betAmount: 0,
													riskAmount: 0,
													winAmount: 0,
													confirm: false
												} });
											_context2.next = 14;
											break;

										case 5:
											newOpenBet = new _BetOrder.OpenBet({
												orderNumber: _uniqid2.default.process().toUpperCase(),
												orderType: orderType,
												owner: {
													player: req.user._id,
													agent: req.user.agent,
													superAgent: req.user.superAgent
												},
												wagerDetail: wagerDetails,
												status: 'Pending',
												eventOdds: eventOdds
											});
											_context2.next = 8;
											return newOpenBet.save();

										case 8:
											console.log('saved new openBet ' + newOpenBet.orderNumber);
											_context2.next = 11;
											return (0, _updatePlayerStatusAfterOrder2.default)(req.user._id);

										case 11:
											_context2.next = 13;
											return (0, _updateAgentOpenBetStatusAfterOrder2.default)(req.user.agent);

										case 13:
											res.json([]);

										case 14:
										case 'end':
											return _context2.stop();
									}
								}
							}, _callee2, undefined);
						})));

					case 15:
						_context3.next = 18;
						break;

					case 17:
						res.json('agentOutOfCredit');

					case 18:
						_context3.next = 23;
						break;

					case 20:
						_context3.prev = 20;
						_context3.t0 = _context3['catch'](0);
						throw _context3.t0;

					case 23:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, undefined, [[0, 20]]);
	}));

	return function submitRadioBetOrder(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

exports.default = submitRadioBetOrder;
//# sourceMappingURL=submitRadioBetOrder.js.map