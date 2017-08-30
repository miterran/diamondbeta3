'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// match prevEvent and latestevent betdDetail, then return true or false 
var compareBetDetail = function compareBetDetail(prevEvent, latestEvent, orderType) {
	var _prevEvent$betDetail = prevEvent.betDetail,
	    oddLine = _prevEvent$betDetail.oddLine,
	    oddPoint = _prevEvent$betDetail.oddPoint,
	    oddTarget = _prevEvent$betDetail.oddTarget,
	    betType = _prevEvent$betDetail.betType;

	var isTeaser = orderType.indexOf('Teaser') >= 0;
	var latestBetDetail = {};
	var teaserPoint = 0;

	if (isTeaser === true) {
		switch (orderType) {
			case 'Teaser6040':
				if (latestEvent.sport === 'Football') teaserPoint += 6;
				if (latestEvent.sport === 'Basketball') teaserPoint += 4;
				break;
			case 'Teaser6545':
				if (latestEvent.sport === 'Football') teaserPoint += 6.5;
				if (latestEvent.sport === 'Basketball') teaserPoint += 4.5;
				break;
			case 'Teaser7050':
				if (latestEvent.sport === 'Football') teaserPoint += 7;
				if (latestEvent.sport === 'Basketball') teaserPoint += 5;
				break;
			case 'SuperTeaser':
				if (latestEvent.sport === 'Football') teaserPoint += 10;
				if (latestEvent.sport === 'Basketball') teaserPoint += 7;
				break;
			default:
				break;
		}
	}

	switch (true) {
		case betType === 'M-Line' && oddTarget === 'Home':
			latestBetDetail = {
				oddLine: latestEvent.odds.moneyLineHome,
				oddTarget: 'Home',
				betType: 'M-Line'
			};
			break;
		case betType === 'M-Line' && oddTarget === 'Away':
			latestBetDetail = {
				oddLine: latestEvent.odds.moneyLineAway,
				oddTarget: 'Away',
				betType: 'M-Line'
			};
			break;
		case betType === 'Spread' && oddTarget === 'Home':
			latestBetDetail = {
				oddLine: latestEvent.odds.pointSpreadHomeLine,
				oddPoint: latestEvent.odds.pointSpreadHome + teaserPoint,
				oddTarget: 'Home',
				betType: 'Spread'
			};
			break;
		case betType === 'Spread' && oddTarget === 'Away':
			latestBetDetail = {
				oddLine: latestEvent.odds.pointSpreadAwayLine,
				oddPoint: latestEvent.odds.pointSpreadAway + teaserPoint,
				oddTarget: 'Away',
				betType: 'Spread'
			};
			break;
		case betType === 'Total' && oddTarget === 'Over':
			latestBetDetail = {
				oddLine: latestEvent.odds.overLine,
				oddPoint: latestEvent.odds.totalNumber - teaserPoint,
				oddTarget: 'Over',
				betType: 'Total'
			};
			break;
		case betType === 'Total' && oddTarget === 'Under':
			latestBetDetail = {
				oddLine: latestEvent.odds.underLine,
				oddPoint: latestEvent.odds.totalNumber + teaserPoint,
				oddTarget: 'Under',
				betType: 'Total'
			};
			break;
		case betType === 'Draw':
			latestBetDetail = {
				oddLine: latestEvent.odds.drawLine,
				betType: 'Draw'
			};
			break;
		default:
			return;
	}

	_lodash2.default.isEqual(prevEvent.betDetail, latestBetDetail) ? console.log('bet detail match') : console.log('bet detail not match, wager has updated');

	return { betDetailMatch: _lodash2.default.isEqual(prevEvent.betDetail, latestBetDetail), latestBetDetail: latestBetDetail };
};

exports.default = compareBetDetail;

// import _ from 'lodash';

// // match prevEvent and latestevent betdDetail, then return true or false 
// const compareBetDetail = (prevEvent, latestEvent, orderType) => {
// 	const { oddLine, oddPoint, oddTarget, betType } = prevEvent.betDetail
// 	const isTeaser = orderType.indexOf('Teaser') >= 0
// 	let latestBetDetail = {}
// 	let teaserPoint = 0


// 	if(isTeaser === true){

//   		switch(orderType){
//   			case 'Teaser6040':
//   				if(event.sport === 'Football') teaserPoint += 6
//   				if(event.sport === 'Basketball') teaserPoint += 4
//   				break;
//   			case 'Teaser6545':
//   				if(event.sport === 'Football') teaserPoint += 6.5
//   				if(event.sport === 'Basketball') teaserPoint += 4.5
//   				break;
//   			case 'Teaser7050':
//   				if(event.sport === 'Football') teaserPoint += 7
//   				if(event.sport === 'Basketball') teaserPoint += 5
//   				break;
//   			case 'SuperTeaser':
//   				if(event.sport === 'Football') teaserPoint += 10
//   				if(event.sport === 'Basketball') teaserPoint += 7
//   				break;
//   			default:
//   				break
//   		}

// 	}


// 	if(isTeaser == false){
// 		switch(true){
// 			case betType === 'M-Line' && oddTarget === 'Home':
// 				latestBetDetail = {
// 					oddLine: latestEvent.odds.moneyLineHome,
// 					oddTarget: 'Home',
// 					betType: 'M-Line'
// 				}
// 				break
// 			case betType === 'M-Line' && oddTarget === 'Away':
// 				latestBetDetail = {
// 					oddLine: latestEvent.odds.moneyLineAway,
// 					oddTarget: 'Away',
// 					betType: 'M-Line'
// 				}
// 				break
// 			case betType === 'Spread' && oddTarget === 'Home':
// 				latestBetDetail = {
// 					oddLine: latestEvent.odds.pointSpreadHomeLine,
// 					oddPoint: latestEvent.odds.pointSpreadHome,
// 					oddTarget: 'Home',
// 					betType: 'Spread'
// 				}
// 				break
// 			case betType === 'Spread' && oddTarget === 'Away':
// 				latestBetDetail = {
// 					oddLine: latestEvent.odds.pointSpreadAwayLine,
// 					oddPoint: latestEvent.odds.pointSpreadAway,
// 					oddTarget: 'Away',
// 					betType: 'Spread'
// 				}
// 				break
// 			case betType === 'Total' && oddTarget === 'Over':
// 				latestBetDetail = {
// 					oddLine: latestEvent.odds.overLine,
// 					oddPoint: latestEvent.odds.totalNumber,
// 					oddTarget: 'Over',
// 					betType: 'Total'
// 				}
// 				break
// 			case betType === 'Total' && oddTarget === 'Under':
// 				latestBetDetail = {
// 					oddLine: latestEvent.odds.underLine,
// 					oddPoint: latestEvent.odds.totalNumber,
// 					oddTarget: 'Under',
// 					betType: 'Total'
// 				}
// 				break
// 			case betType === 'Draw':
// 				latestBetDetail = {
// 					oddLine: latestEvent.odds.drawLine,
// 					betType: 'Draw'
// 				}
// 				break;
// 			default:
// 				return
// 		}
// 	}


// 	_.isEqual(prevEvent.betDetail, latestBetDetail) ? console.log('bet detail match') : console.log('bet detail not match, wager has updated')

// 	return { betDetailMatch: _.isEqual(prevEvent.betDetail, latestBetDetail), latestBetDetail: latestBetDetail }
// }

// export default compareBetDetail
//# sourceMappingURL=compareBetDetail.js.map