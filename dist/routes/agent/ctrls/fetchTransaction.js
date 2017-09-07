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

var _AgentTransaction = require('../../../models/AgentTransaction');

var _AgentTransaction2 = _interopRequireDefault(_AgentTransaction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var fetchTransaction = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
		var weekNum, transactions;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						weekNum = req.body.weekNum;
						_context.next = 3;
						return _AgentTransaction2.default.find({
							'owner.agent': req.user._id,
							createdAt: { $gte: (0, _moment2.default)().subtract(weekNum, 'w').startOf('isoWeek'), $lte: (0, _moment2.default)().subtract(weekNum, 'w').endOf('isoWeek') }
						}).populate({ path: 'owner.agent', select: 'account.username' }).populate({ path: 'owner.player', select: 'account.username' });

					case 3:
						transactions = _context.sent;


						res.json(transactions);

						// await Promise.all(transactions.map(async transaction => {
						// 	if(transaction.orderType === 'Deposit'){
						// 		let agent = await Agent.findOne({ _id: transaction.user }, 'account.username')
						// 		transaction.user = agent.account.username
						// 		console.log(agent.account.username)
						// 		console.log(transaction.user)
						// 	}else{
						// 		let user = await Player.findOne({ _id: transaction.user }, 'account.username')
						// 		transaction.user = user.account.username
						// 	}
						// 	return transaction.user
						// })).then(data => {
						// 	res.json(data)
						// })

					case 5:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function fetchTransaction(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

exports.default = fetchTransaction;

// const fetchHistoryBet = async (req, res) => {

// 	const { weekNum, player } = req.body
// 	const historyBetList = await HistoryBet.find({ 'owner.agent': req.user._id, 'owner.player': player, 'closedAt': {$gte: moment().subtract(weekNum, 'w').startOf('isoWeek'), $lte: moment().subtract(weekNum, 'w').endOf('isoWeek') } })

// 	let historyBets = {
// 		historyBetList: historyBetList,
// 		weekSummary: {
// 			[moment().startOf('isoWeek').subtract(weekNum, 'w').add(0, 'd').format('MMM DD')]: { bets: 0, amount: 0 },
// 			[moment().startOf('isoWeek').subtract(weekNum, 'w').add(1, 'd').format('MMM DD')]: { bets: 0, amount: 0 },
// 			[moment().startOf('isoWeek').subtract(weekNum, 'w').add(2, 'd').format('MMM DD')]: { bets: 0, amount: 0 },
// 			[moment().startOf('isoWeek').subtract(weekNum, 'w').add(3, 'd').format('MMM DD')]: { bets: 0, amount: 0 },
// 			[moment().startOf('isoWeek').subtract(weekNum, 'w').add(4, 'd').format('MMM DD')]: { bets: 0, amount: 0 },
// 			[moment().startOf('isoWeek').subtract(weekNum, 'w').add(5, 'd').format('MMM DD')]: { bets: 0, amount: 0 },
// 			[moment().startOf('isoWeek').subtract(weekNum, 'w').add(6, 'd').format('MMM DD')]: { bets: 0, amount: 0 }
// 		}
// 	}


// 	if(!_.isEmpty(historyBetList)){
// 		historyBetList.forEach(historyBet => {
// 			historyBets.weekSummary[moment(historyBet.closedAt).format('MMM DD')].amount += Number(historyBet.resultAmount);
// 			historyBets.weekSummary[moment(historyBet.closedAt).format('MMM DD')].bets++;
// 		})
// 	}

// 	res.json(historyBets)

// }


// export default fetchHistoryBet
//# sourceMappingURL=fetchTransaction.js.map