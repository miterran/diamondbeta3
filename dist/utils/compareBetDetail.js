'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// match prevEvent and latestevent betdDetail, then return true or false 
var compareBetDetail = function compareBetDetail(prevEvent, latestEvent) {
	var _prevEvent$betDetail = prevEvent.betDetail,
	    oddLine = _prevEvent$betDetail.oddLine,
	    oddPoint = _prevEvent$betDetail.oddPoint,
	    oddTarget = _prevEvent$betDetail.oddTarget,
	    betType = _prevEvent$betDetail.betType;

	var latestBetDetail = {};
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
				oddPoint: latestEvent.odds.pointSpreadHome,
				oddTarget: 'Home',
				betType: 'Spread'
			};
			break;
		case betType === 'Spread' && oddTarget === 'Away':
			latestBetDetail = {
				oddLine: latestEvent.odds.pointSpreadAwayLine,
				oddPoint: latestEvent.odds.pointSpreadAway,
				oddTarget: 'Away',
				betType: 'Spread'
			};
			break;
		case betType === 'Total' && oddTarget === 'Over':
			latestBetDetail = {
				oddLine: latestEvent.odds.overLine,
				oddPoint: latestEvent.odds.totalNumber,
				oddTarget: 'Over',
				betType: 'Total'
			};
			break;
		case betType === 'Total' && oddTarget === 'Under':
			latestBetDetail = {
				oddLine: latestEvent.odds.underLine,
				oddPoint: latestEvent.odds.totalNumber,
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

	return _lodash2.default.isEqual(prevEvent.betDetail, latestBetDetail);
};

exports.default = compareBetDetail;
//# sourceMappingURL=compareBetDetail.js.map