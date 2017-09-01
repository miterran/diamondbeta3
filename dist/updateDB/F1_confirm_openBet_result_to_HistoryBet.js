'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Player = require('../models/Player');

var _Player2 = _interopRequireDefault(_Player);

var _BetOrder = require('../models/BetOrder');

var _updatePlayerStatusAfterOrder = require('./utils/updatePlayerStatusAfterOrder');

var _updatePlayerStatusAfterOrder2 = _interopRequireDefault(_updatePlayerStatusAfterOrder);

var _confirmResultStraight = require('./confirmOrderTypeResult/confirmResultStraight');

var _confirmResultStraight2 = _interopRequireDefault(_confirmResultStraight);

var _confirmResultParlay = require('./confirmOrderTypeResult/confirmResultParlay');

var _confirmResultParlay2 = _interopRequireDefault(_confirmResultParlay);

var _confirmResultTeaser = require('./confirmOrderTypeResult/confirmResultTeaser');

var _confirmResultTeaser2 = _interopRequireDefault(_confirmResultTeaser);

var _confirmResultReverse = require('./confirmOrderTypeResult/confirmResultReverse');

var _confirmResultReverse2 = _interopRequireDefault(_confirmResultReverse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var confirm_OpenBet_result_to_HistoryBet = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
		var openBets;
		return regeneratorRuntime.wrap(function _callee4$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						_context4.prev = 0;
						_context4.next = 3;
						return _BetOrder.OpenBet.find({});

					case 3:
						openBets = _context4.sent;

						if (_lodash2.default.isEmpty(openBets)) {
							next();
						}

						_context4.next = 7;
						return Promise.all(openBets.map(function () {
							var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(openBet) {
								var straightBetResult, parlayBetResult, teaserBetResult, reverseBetResult;
								return regeneratorRuntime.wrap(function _callee$(_context) {
									while (1) {
										switch (_context.prev = _context.next) {
											case 0:
												_context.t0 = openBet.orderType;
												_context.next = _context.t0 === 'Straight' ? 3 : _context.t0 === 'Parlay' ? 12 : _context.t0 === 'Teaser6040' ? 21 : _context.t0 === 'Teaser6545' ? 21 : _context.t0 === 'Teaser7050' ? 21 : _context.t0 === 'SuperTeaser' ? 21 : _context.t0 === 'WinReverse' ? 30 : _context.t0 === 'ActionReverse' ? 30 : 39;
												break;

											case 3:
												_context.next = 5;
												return (0, _confirmResultStraight2.default)(openBet);

											case 5:
												straightBetResult = _context.sent;

												if (!(straightBetResult === true)) {
													_context.next = 10;
													break;
												}

												return _context.abrupt('return', JSON.parse(JSON.stringify(openBet.owner.player)));

											case 10:
												return _context.abrupt('return', null);

											case 11:
												return _context.abrupt('break', 40);

											case 12:
												_context.next = 14;
												return (0, _confirmResultParlay2.default)(openBet);

											case 14:
												parlayBetResult = _context.sent;

												if (!(parlayBetResult === true)) {
													_context.next = 19;
													break;
												}

												return _context.abrupt('return', JSON.parse(JSON.stringify(openBet.owner.player)));

											case 19:
												return _context.abrupt('return', null);

											case 20:
												return _context.abrupt('break', 40);

											case 21:
												_context.next = 23;
												return (0, _confirmResultTeaser2.default)(openBet);

											case 23:
												teaserBetResult = _context.sent;

												if (!(teaserBetResult === true)) {
													_context.next = 28;
													break;
												}

												return _context.abrupt('return', JSON.parse(JSON.stringify(openBet.owner.player)));

											case 28:
												return _context.abrupt('return', null);

											case 29:
												return _context.abrupt('break', 40);

											case 30:
												_context.next = 32;
												return (0, _confirmResultReverse2.default)(openBet);

											case 32:
												reverseBetResult = _context.sent;

												if (!(reverseBetResult === true)) {
													_context.next = 37;
													break;
												}

												return _context.abrupt('return', JSON.parse(JSON.stringify(openBet.owner.player)));

											case 37:
												return _context.abrupt('return', null);

											case 38:
												return _context.abrupt('break', 40);

											case 39:
												return _context.abrupt('return', null);

											case 40:
											case 'end':
												return _context.stop();
										}
									}
								}, _callee, undefined);
							}));

							return function (_x) {
								return _ref2.apply(this, arguments);
							};
						}())).then(function () {
							var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(playerIds) {
								var playerIdArr;
								return regeneratorRuntime.wrap(function _callee3$(_context3) {
									while (1) {
										switch (_context3.prev = _context3.next) {
											case 0:
												playerIdArr = _lodash2.default.compact([].concat(_toConsumableArray(new Set(playerIds))));

												if (_lodash2.default.isEmpty(playerIdArr)) {
													_context3.next = 8;
													break;
												}

												console.log('update following players');
												console.log(playerIdArr);
												_context3.next = 6;
												return Promise.all(playerIdArr.map(function () {
													var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(playerId) {
														return regeneratorRuntime.wrap(function _callee2$(_context2) {
															while (1) {
																switch (_context2.prev = _context2.next) {
																	case 0:
																		_context2.next = 2;
																		return (0, _updatePlayerStatusAfterOrder2.default)(playerId);

																	case 2:
																		console.log('updated' + playerId);
																		return _context2.abrupt('return', null);

																	case 4:
																	case 'end':
																		return _context2.stop();
																}
															}
														}, _callee2, undefined);
													}));

													return function (_x3) {
														return _ref4.apply(this, arguments);
													};
												}())).catch(function (err) {
													throw err;
												});

											case 6:
												_context3.next = 9;
												break;

											case 8:
												console.log('no players need to update');

											case 9:
											case 'end':
												return _context3.stop();
										}
									}
								}, _callee3, undefined);
							}));

							return function (_x2) {
								return _ref3.apply(this, arguments);
							};
						}()).catch(function (err) {
							throw err;
						});

					case 7:
						_context4.next = 12;
						break;

					case 9:
						_context4.prev = 9;
						_context4.t0 = _context4['catch'](0);
						throw _context4.t0;

					case 12:
					case 'end':
						return _context4.stop();
				}
			}
		}, _callee4, undefined, [[0, 9]]);
	}));

	return function confirm_OpenBet_result_to_HistoryBet() {
		return _ref.apply(this, arguments);
	};
}();

exports.default = confirm_OpenBet_result_to_HistoryBet;

// import moment from 'moment';
// import _ from 'lodash';
// import Player from '../models/Player';

// import { OpenBet, HistoryBet } from '../models/BetOrder';

// import updatePlayerStatusAfterOrder from './utils/updatePlayerStatusAfterOrder';

// const confirm_OpenBet_result_to_HistoryBet = async () => {

// 	try{
// 		const openBets = await OpenBet.find({})
// 		if(_.isEmpty(openBets)){
// 			next()
// 		}

// 		await Promise.all(openBets.map(async openBet => {

// 			const eventsHaveWon       = _.some(openBet.eventOdds, { status: 'Won' })
// 			const eventsHaveLost      = _.some(openBet.eventOdds, { status: 'Lost' })
// 			const eventsHaveWonHalf   = _.some(openBet.eventOdds, { status: 'Won Half' })
// 			const eventsHaveLostHalf  = _.some(openBet.eventOdds, { status: 'Lost Half' })
// 			const eventsHavePush      = _.some(openBet.eventOdds, { status: 'Push' })
// 			const eventsHavePostponed = _.some(openBet.eventOdds, { status: 'Postponed' })
// 			const eventsHaveCanceled  = _.some(openBet.eventOdds, { status: 'Canceled' })
// 			const eventsHaveReview    = _.some(openBet.eventOdds, { status: 'Review' })
// 			const eventsHavePending   = _.some(openBet.eventOdds, { status: 'Pending' })

// 			const allEventsWon        = openBet.eventOdds.every(event => event.status === 'Won')
// 			const allEventsLost       = openBet.eventOdds.every(event => event.status === 'Lost')
// 			const allEventsWonHalf    = openBet.eventOdds.every(event => event.status === 'Won Half')
// 			const allEventsLostHalf   = openBet.eventOdds.every(event => event.status === 'Lost Half')
// 			const allEventsPush       = openBet.eventOdds.every(event => event.status === 'Push')
// 			const allEventsCanceled   = openBet.eventOdds.every(event => event.status === 'Canceled')
// 			const allEventsPostponed  = openBet.eventOdds.every(event => event.status === 'Postponed')
// 			const allEventsReview     = openBet.eventOdds.every(event => event.status === 'Review')
// 			const allEventsPending    = openBet.eventOdds.every(event => event.status === 'Pending')

// 			let betOrderStatus = 'TBD'
// 			let resultAmount = 0

// 			// dont know why switch() doesn't working here with array every boolean
// 			if(allEventsWon){
// 				betOrderStatus = 'Won'
// 				resultAmount = openBet.wagerDetail.winAmount
// 			}else if(allEventsLost){
// 				betOrderStatus = 'Lost'
// 				resultAmount = -openBet.wagerDetail.riskAmount
// 			}else if(allEventsWonHalf){
// 				betOrderStatus = 'Won Half'
// 				resultAmount = ( openBet.wagerDetail.winAmount / 2 ).toFixed()
// 			}else if(allEventsLostHalf){
// 				betOrderStatus = 'Lost Half'
// 				resultAmount = -( openBet.wagerDetail.riskAmount / 2 ).toFixed()
// 			}else if(allEventsPush){
// 				betOrderStatus = 'Push'
// 				resultAmount = 0
// 			}else if(allEventsCanceled){
// 				betOrderStatus = 'Canceled'
// 				resultAmount = 0
// 			}else if(allEventsPostponed){
// 				betOrderStatus = 'Postponed'
// 				resultAmount = 0
// 			}else{
// 				betOrderStatus = 'TBD'
// 				resultAmount = 0
// 			}

// 			if(openBet.orderType === 'Parlay'){
// 				switch(true){
// 					case eventsHaveLost:
// 						betOrderStatus = 'Lost'
// 						resultAmount = -openBet.wagerDetail.riskAmount
// 						openBet.eventOdds.map(event => {
// 							if(event.status !== 'Lost'){
// 								event.status = 'Closed'
// 							}
// 							return event
// 						})
// 						break;
// 					case eventsHaveWon && !eventsHaveLost && !eventsHaveReview && !eventsHavePending:
// 						const parlayPoint = _.compact(openBet.eventOdds.map(event => {
// 							if(event.status === 'Won'){
// 								if(event.betDetail.oddLine > 0){
// 									return (event.betDetail.oddLine + 100) / 100
// 								}else{
// 									return (Math.abs(event.betDetail.oddLine) + 100) / Math.abs(event.betDetail.oddLine)
// 								}
// 							}
// 							return null
// 						}))
// 						const riskPoint = parlayPoint.reduce((a, b) => a * b)
// 						resultAmount = ((openBet.wagerDetail.riskAmount * riskPoint - openBet.wagerDetail.riskAmount) * 1).toFixed()
// 						betOrderStatus = 'Won'
// 						break;
// 					default:
// 						return;
// 				}

// 			}

// 			if(betOrderStatus !== 'TBD'){
// 				const newHistoryBet = new HistoryBet({
// 					orderNumber: openBet.orderNumber,
// 					orderType: openBet.orderType,
// 					owner: openBet.owner,
// 					wagerDetail: openBet.wagerDetail,
// 					status: betOrderStatus,
// 					resultAmount: resultAmount,
// 					eventOdds: openBet.eventOdds,
// 					createdAt: openBet.createdAt,
// 					closedAt: moment()
// 				})

// 				await newHistoryBet.save()
// 				console.log('saved history bet' + newHistoryBet.orderNumber)
// 				await OpenBet.findOneAndRemove({ _id: openBet._id })
// 				console.log('deleted openbet ' + openBet.orderNumber)
// 				return JSON.parse(JSON.stringify(openBet.owner.player))

// 			}else{
// 				console.log(openBet.orderNumber + ' not finished')
// 				return null
// 			}

// 		})).then(async (playerIds) => {
// 			const playerIdArr = _.compact([ ...new Set(playerIds) ])
// 			if(!_.isEmpty(playerIdArr)){
// 				console.log('update following players')
// 				console.log(playerIdArr)
// 				await Promise.all(playerIdArr.map(async playerId => {
// 					await updatePlayerStatusAfterOrder(playerId)
// 					console.log('updated' + playerId)
// 					return null
// 				})).catch(err => { throw err })
// 			}else{
// 				console.log('no players need to update')
// 			}
// 		}).catch(err => { throw err })

// 	}catch(err){
// 		throw err
// 	}

// }

// export default confirm_OpenBet_result_to_HistoryBet
//# sourceMappingURL=F1_confirm_openBet_result_to_HistoryBet.js.map