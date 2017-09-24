'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _SuperAgent = require('../models/SuperAgent');

var _SuperAgent2 = _interopRequireDefault(_SuperAgent);

var _Agent = require('../models/Agent');

var _Agent2 = _interopRequireDefault(_Agent);

var _Player = require('../models/Player');

var _Player2 = _interopRequireDefault(_Player);

var _AgentDeposit = require('../models/AgentDeposit');

var _AgentDeposit2 = _interopRequireDefault(_AgentDeposit);

var _BetOrder = require('../models/BetOrder');

var _AgentTransaction = require('../models/AgentTransaction');

var _AgentTransaction2 = _interopRequireDefault(_AgentTransaction);

var _updatePlayerStatusAfterOrder = require('../updateDB/updateUser/updatePlayerStatusAfterOrder');

var _updatePlayerStatusAfterOrder2 = _interopRequireDefault(_updatePlayerStatusAfterOrder);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _EventOdd = require('../models/EventOdd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = _express2.default.Router();

router.get('/make-agent-transaction', function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(req, res) {
		var preTransactions, agent, agentDeposits, agentHistoryBets, resultAmount;
		return regeneratorRuntime.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						preTransactions = [];
						_context3.next = 3;
						return _Agent2.default.findOne({ 'account.username': 'diamond' });

					case 3:
						agent = _context3.sent;
						_context3.next = 6;
						return _AgentDeposit2.default.find({ 'owner.agent': agent._id });

					case 6:
						agentDeposits = _context3.sent;
						_context3.next = 9;
						return _BetOrder.HistoryBet.find({ 'owner.agent': agent._id, 'status': 'Lost' }, 'orderNumber orderType resultAmount owner closedAt');

					case 9:
						agentHistoryBets = _context3.sent;


						preTransactions = agentDeposits.concat(agentHistoryBets);

						preTransactions.sort(function (a, b) {
							return new Date(a.closedAt) - new Date(b.closedAt);
						});

						resultAmount = 0;
						_context3.next = 15;
						return Promise.all(preTransactions.map(function () {
							var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(transaction) {
								var newAgentTransaction;
								return regeneratorRuntime.wrap(function _callee$(_context) {
									while (1) {
										switch (_context.prev = _context.next) {
											case 0:
												newAgentTransaction = new _AgentTransaction2.default({
													owner: {
														// player: { type: Schema.Types.ObjectId, ref: 'Player' },
														superAgent: agent.superAgent,
														agent: agent._id
													},
													orderType: transaction.orderType,
													//			transactionType: { type: String, enum: [ 'in', 'out' ] },
													//			creditAmount: { type: Number },
													//			resultAmount: { type: Number },
													orderNumber: transaction.orderNumber,
													createdAt: (0, _moment2.default)(transaction.closedAt)
												});


												if (transaction.orderType === 'Deposit') {
													resultAmount += transaction.creditAmount;
													newAgentTransaction.transactionType = 'in';
													newAgentTransaction.creditAmount = transaction.creditAmount;
													newAgentTransaction.resultAmount = resultAmount;
												} else {
													resultAmount += transaction.resultAmount;
													newAgentTransaction.transactionType = 'out';
													newAgentTransaction.owner.player = transaction.owner.player;
													newAgentTransaction.creditAmount = transaction.resultAmount;
													newAgentTransaction.resultAmount = resultAmount;
												}

												_context.next = 4;
												return newAgentTransaction.save();

											case 4:
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
							var agentOpenBets, agentCreditPending, activePlayerCounter, agentCurrentStatus;
							return regeneratorRuntime.wrap(function _callee2$(_context2) {
								while (1) {
									switch (_context2.prev = _context2.next) {
										case 0:
											_context2.next = 2;
											return _BetOrder.OpenBet.find({ 'owner.agent': agent._id }, 'orderType wagerDetail.riskAmount wagerDetail.winAmount owner');

										case 2:
											agentOpenBets = _context2.sent;
											agentCreditPending = agentOpenBets.reduce(function (total, openBet) {
												return total + openBet.wagerDetail.winAmount;
											}, 0);
											activePlayerCounter = _lodash2.default.uniqBy([].concat.apply([], agentOpenBets.map(function (openBet) {
												return openBet.owner.player;
											})));
											agentCurrentStatus = {
												activePlayer: activePlayerCounter.length,
												credit: resultAmount,
												creditPending: agentCreditPending,
												availableCredit: resultAmount - agentCreditPending
											};
											_context2.next = 8;
											return _Agent2.default.findOneAndUpdate({ _id: agent._id }, { '$set': { currentStatus: agentCurrentStatus } });

										case 8:
										case 'end':
											return _context2.stop();
									}
								}
							}, _callee2, undefined);
						}))).then(function () {
							res.json('done');
						});

					case 15:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, undefined);
	}));

	return function (_x, _x2) {
		return _ref.apply(this, arguments);
	};
}()

// res.json('done')

);

router.get('/add-transaction', function () {
	var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(req, res) {
		var mTransactions;
		return regeneratorRuntime.wrap(function _callee5$(_context5) {
			while (1) {
				switch (_context5.prev = _context5.next) {
					case 0:
						_context5.next = 2;
						return _AgentTransaction2.default.find({ 'owner.agent': _mongoose2.default.Types.ObjectId('59bc8aad753ce1067fd7c49f') });

					case 2:
						mTransactions = _context5.sent;
						_context5.next = 5;
						return Promise.all(mTransactions.map(function () {
							var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(transaction) {
								var a;
								return regeneratorRuntime.wrap(function _callee4$(_context4) {
									while (1) {
										switch (_context4.prev = _context4.next) {
											case 0:
												_context4.next = 2;
												return _AgentTransaction2.default.findOneAndRemove({ '_id': transaction._id });

											case 2:
												a = _context4.sent;

												console.log(a);
												return _context4.abrupt('return', null);

											case 5:
											case 'end':
												return _context4.stop();
										}
									}
								}, _callee4, undefined);
							}));

							return function (_x6) {
								return _ref5.apply(this, arguments);
							};
						}())).then(function () {
							res.json('done');
						});

					case 5:
					case 'end':
						return _context5.stop();
				}
			}
		}, _callee5, undefined);
	}));

	return function (_x4, _x5) {
		return _ref4.apply(this, arguments);
	};
}()

//	await AgentTransaction.findOneAndRemove({})

// //	const superAgent = await SuperAgent.findOne({ 'account.username': 'super'})
// 	const agent = await Agent.findOne({ 'account.username': 'M999' })
// 	const agentHistoryBet = await HistoryBet.findOne({ 'orderNumber': 'TJ7QH8UTI', 'status': 'Lost' }, 'orderNumber orderType resultAmount owner closedAt')
// 	let newAgentTransaction = new AgentTransaction({
// 				owner:{
// 					// player: { type: Schema.Types.ObjectId, ref: 'Player' },
// 					superAgent : agent.superAgent,
// 					agent : agent._id
// 				},
// 				orderType: agentHistoryBet.orderType,
// 	//			transactionType: { type: String, enum: [ 'in', 'out' ] },
// 	//			creditAmount: { type: Number },
// 	//			resultAmount: { type: Number },
// 				orderNumber: agentHistoryBet.orderNumber,
// 				createdAt: moment(agentHistoryBet.closedAt)
// 			})


// 			resultAmount += transaction.resultAmount
// 			newAgentTransaction.transactionType = 'out'
// 			newAgentTransaction.owner.player = transaction.owner.player
// 			newAgentTransaction.creditAmount = transaction.resultAmount
// 			newAgentTransaction.resultAmount = resultAmount

// 	await newAgentTransaction.save()


);

router.get('/update-all-players', function () {
	var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(req, res) {
		var players;
		return regeneratorRuntime.wrap(function _callee7$(_context7) {
			while (1) {
				switch (_context7.prev = _context7.next) {
					case 0:
						_context7.next = 2;
						return _Player2.default.find({});

					case 2:
						players = _context7.sent;
						_context7.next = 5;
						return Promise.all(players.map(function () {
							var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(player) {
								return regeneratorRuntime.wrap(function _callee6$(_context6) {
									while (1) {
										switch (_context6.prev = _context6.next) {
											case 0:
												_context6.next = 2;
												return _Player2.default.findOneAndUpdate({ _id: player._id }, { $set: { lastOnline: (0, _moment2.default)() } });

											case 2:
											case 'end':
												return _context6.stop();
										}
									}
								}, _callee6, undefined);
							}));

							return function (_x9) {
								return _ref7.apply(this, arguments);
							};
						}())).then(function () {
							res.json('done');
						});

					case 5:
					case 'end':
						return _context7.stop();
				}
			}
		}, _callee7, undefined);
	}));

	return function (_x7, _x8) {
		return _ref6.apply(this, arguments);
	};
}());

router.get('/reset-all-agent-player', function () {
	var _ref8 = _asyncToGenerator(regeneratorRuntime.mark(function _callee12(req, res) {
		var agent, player;
		return regeneratorRuntime.wrap(function _callee12$(_context12) {
			while (1) {
				switch (_context12.prev = _context12.next) {
					case 0:
						_context12.next = 2;
						return _Agent2.default.findOne({ 'account.username': 'M999' });

					case 2:
						agent = _context12.sent;
						_context12.next = 5;
						return _Player2.default.findOneAndUpdate({ 'account.username': 'p777' }, { $set: { 'owner.agent': agent._id } });

					case 5:
						player = _context12.sent;
						_context12.next = 8;
						return _BetOrder.HistoryBet.find({ 'owner.player': player._id }).then(function () {
							var _ref9 = _asyncToGenerator(regeneratorRuntime.mark(function _callee9(result) {
								return regeneratorRuntime.wrap(function _callee9$(_context9) {
									while (1) {
										switch (_context9.prev = _context9.next) {
											case 0:
												_context9.next = 2;
												return Promise.all(result.map(function () {
													var _ref10 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(history) {
														return regeneratorRuntime.wrap(function _callee8$(_context8) {
															while (1) {
																switch (_context8.prev = _context8.next) {
																	case 0:
																		_context8.next = 2;
																		return _BetOrder.HistoryBet.findOneAndUpdate({ _id: history._id }, { $set: { 'owner.agent': agent._id } });

																	case 2:
																		return _context8.abrupt('return', null);

																	case 3:
																	case 'end':
																		return _context8.stop();
																}
															}
														}, _callee8, undefined);
													}));

													return function (_x13) {
														return _ref10.apply(this, arguments);
													};
												}()));

											case 2:
											case 'end':
												return _context9.stop();
										}
									}
								}, _callee9, undefined);
							}));

							return function (_x12) {
								return _ref9.apply(this, arguments);
							};
						}());

					case 8:
						_context12.next = 10;
						return _BetOrder.OpenBet.find({ 'owner.player': player._id }).then(function () {
							var _ref11 = _asyncToGenerator(regeneratorRuntime.mark(function _callee11(openBets) {
								return regeneratorRuntime.wrap(function _callee11$(_context11) {
									while (1) {
										switch (_context11.prev = _context11.next) {
											case 0:
												_context11.next = 2;
												return Promise.all(openBets.map(function () {
													var _ref12 = _asyncToGenerator(regeneratorRuntime.mark(function _callee10(openBet) {
														return regeneratorRuntime.wrap(function _callee10$(_context10) {
															while (1) {
																switch (_context10.prev = _context10.next) {
																	case 0:
																		_context10.next = 2;
																		return _BetOrder.OpenBet.findOneAndUpdate({ _id: openBet._id }, { $set: { 'owner.agent': agent._id } });

																	case 2:
																		return _context10.abrupt('return', null);

																	case 3:
																	case 'end':
																		return _context10.stop();
																}
															}
														}, _callee10, undefined);
													}));

													return function (_x15) {
														return _ref12.apply(this, arguments);
													};
												}()));

											case 2:
											case 'end':
												return _context11.stop();
										}
									}
								}, _callee11, undefined);
							}));

							return function (_x14) {
								return _ref11.apply(this, arguments);
							};
						}());

					case 10:

						res.json('done');

					case 11:
					case 'end':
						return _context12.stop();
				}
			}
		}, _callee12, undefined);
	}));

	return function (_x10, _x11) {
		return _ref8.apply(this, arguments);
	};
}());

router.get('/push', function () {
	var _ref13 = _asyncToGenerator(regeneratorRuntime.mark(function _callee13(req, res) {
		var agent, players;
		return regeneratorRuntime.wrap(function _callee13$(_context13) {
			while (1) {
				switch (_context13.prev = _context13.next) {
					case 0:
						_context13.next = 2;
						return _Agent2.default.findOne({ 'account.username': 'diamond' });

					case 2:
						agent = _context13.sent;
						_context13.next = 5;
						return _Player2.default.find({ agent: agent._id }, '_id');

					case 5:
						players = _context13.sent;


						players.forEach(function (player) {
							agent.players.push(player);
						});

						_context13.next = 9;
						return agent.save();

					case 9:
						console.log(players);
						res.json(agent);

					case 11:
					case 'end':
						return _context13.stop();
				}
			}
		}, _callee13, undefined);
	}));

	return function (_x16, _x17) {
		return _ref13.apply(this, arguments);
	};
}());

router.get('/setup', function () {
	var _ref14 = _asyncToGenerator(regeneratorRuntime.mark(function _callee15(req, res) {
		var players;
		return regeneratorRuntime.wrap(function _callee15$(_context15) {
			while (1) {
				switch (_context15.prev = _context15.next) {
					case 0:
						_context15.next = 2;
						return _Player2.default.find({});

					case 2:
						players = _context15.sent;
						_context15.next = 5;
						return Promise.all(players.map(function () {
							var _ref15 = _asyncToGenerator(regeneratorRuntime.mark(function _callee14(player) {
								return regeneratorRuntime.wrap(function _callee14$(_context14) {
									while (1) {
										switch (_context14.prev = _context14.next) {
											case 0:
												_context14.next = 2;
												return (0, _updatePlayerStatusAfterOrder2.default)(player._id);

											case 2:
											case 'end':
												return _context14.stop();
										}
									}
								}, _callee14, undefined);
							}));

							return function (_x20) {
								return _ref15.apply(this, arguments);
							};
						}())).then(function () {
							res.json('done');
						});

					case 5:
					case 'end':
						return _context15.stop();
				}
			}
		}, _callee15, undefined);
	}));

	return function (_x18, _x19) {
		return _ref14.apply(this, arguments);
	};
}());

router.get('/create-player', function () {
	var _ref16 = _asyncToGenerator(regeneratorRuntime.mark(function _callee17(req, res) {
		var superAgent, agent, newPlayer, player;
		return regeneratorRuntime.wrap(function _callee17$(_context17) {
			while (1) {
				switch (_context17.prev = _context17.next) {
					case 0:
						_context17.next = 2;
						return _SuperAgent2.default.findOne({ 'account.username': 'boss' });

					case 2:
						superAgent = _context17.sent;
						_context17.next = 5;
						return _Agent2.default.findOne({ 'account.username': 'diamond' });

					case 5:
						agent = _context17.sent;
						newPlayer = new _Player2.default({
							account: {
								username: 'f',
								password: '1234',
								passcode: '4321',
								activate: true
							},
							superAgent: superAgent._id,
							agent: agent._id
						});
						_context17.next = 9;
						return newPlayer.save().then(function () {
							var _ref17 = _asyncToGenerator(regeneratorRuntime.mark(function _callee16(newOne) {
								return regeneratorRuntime.wrap(function _callee16$(_context16) {
									while (1) {
										switch (_context16.prev = _context16.next) {
											case 0:
												_context16.next = 2;
												return (0, _updatePlayerStatusAfterOrder2.default)(newOne._id);

											case 2:
											case 'end':
												return _context16.stop();
										}
									}
								}, _callee16, undefined);
							}));

							return function (_x23) {
								return _ref17.apply(this, arguments);
							};
						}());

					case 9:
						player = _context17.sent;

						// await agent.players.push(player._id)
						// await agent.save()
						// await superAgent.players.push(player._id)
						// await superAgent.save()

						res.json(player);

					case 11:
					case 'end':
						return _context17.stop();
				}
			}
		}, _callee17, undefined);
	}));

	return function (_x21, _x22) {
		return _ref16.apply(this, arguments);
	};
}());

router.get('/create-agent', function () {
	var _ref18 = _asyncToGenerator(regeneratorRuntime.mark(function _callee18(req, res) {
		var superAgent, newAgent, agent;
		return regeneratorRuntime.wrap(function _callee18$(_context18) {
			while (1) {
				switch (_context18.prev = _context18.next) {
					case 0:
						_context18.next = 2;
						return _SuperAgent2.default.findOne({ 'account.username': 'boss' });

					case 2:
						superAgent = _context18.sent;

						if (_lodash2.default.isEmpty(superAgent)) {
							_context18.next = 11;
							break;
						}

						newAgent = new _Agent2.default({
							account: {
								username: 'diamond'
							}
						});
						_context18.next = 7;
						return newAgent.save();

					case 7:
						agent = _context18.sent;

						//		superAgent.agents.push(agent._id)
						//		await superAgent.save()
						res.json('done');
						_context18.next = 12;
						break;

					case 11:
						res.json('super agent not found');

					case 12:
					case 'end':
						return _context18.stop();
				}
			}
		}, _callee18, undefined);
	}));

	return function (_x24, _x25) {
		return _ref18.apply(this, arguments);
	};
}());

router.get('/create-super-agent', function (req, res) {
	var newSuperAgent = new _SuperAgent2.default({
		account: {
			username: 'boss',
			password: '1234',
			passcode: '4321',
			activate: true
		}
	});
	newSuperAgent.save().then(function () {
		console.log('saved superAgent');
		res.json('saved superAgent');
	}).catch(function (err) {
		throw err;
	});
});

router.get('/agent-info', function (req, res) {
	_Agent2.default.findOne({ 'account.username': 'diamond' }).populate('players').then(function (agent) {
		res.json(agent);
	});
});

router.get('/create-result', function (req, res) {

	var newResult = new _EventOdd.Result({

		"eventResultId": "pickMon_College_GAME_1414713",
		"uniqueId": "221_222_FOOTBALL_GAME_08312017",
		"sport": "Football",
		"oddType": "Game",
		"league": "College",
		"region": "",
		"details": "Presbyterian College At Wake Forest",
		"matchTime": _moment2.default.utc("2017-08-31T22:30:00.000Z"),
		"expireAt": _moment2.default.utc("2017-09-03T11:00:00.000Z"),
		"status": "Finished",
		"score": {
			"awayScore": 51,
			"homeScore": 7
		},
		"team": {
			"awayROT": "222",
			"away": "Wake Forest",
			"homeROT": "221",
			"home": "Presbyterian College"
		},
		"source": {
			"provider": "custom",
			"id": "0"
		}
	});

	_EventOdd.Result.findOne({ uniqueId: newResult.uniqueId }).then(function (result) {
		if (_lodash2.default.isEmpty(result)) {
			newResult.save().then(function () {
				res.json('done');
			});
		} else {
			res.json('existed');
		}
	});
});

exports.default = router;
//# sourceMappingURL=createAccount.js.map