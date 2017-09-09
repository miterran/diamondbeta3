'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
				oddLine: Number(latestEvent.odds.moneyLineHome),
				oddTarget: 'Home',
				betType: 'M-Line'
			};
			break;
		case betType === 'M-Line' && oddTarget === 'Away':
			latestBetDetail = {
				oddLine: Number(latestEvent.odds.moneyLineAway),
				oddTarget: 'Away',
				betType: 'M-Line'
			};
			break;
		case betType === 'Spread' && oddTarget === 'Home':
			latestBetDetail = {
				oddLine: Number(latestEvent.odds.pointSpreadHomeLine),
				oddPoint: Number(latestEvent.odds.pointSpreadHome) + Number(teaserPoint),
				oddTarget: 'Home',
				betType: 'Spread'
			};
			break;
		case betType === 'Spread' && oddTarget === 'Away':
			latestBetDetail = {
				oddLine: Number(latestEvent.odds.pointSpreadAwayLine),
				oddPoint: Number(latestEvent.odds.pointSpreadAway) + Number(teaserPoint),
				oddTarget: 'Away',
				betType: 'Spread'
			};
			break;
		case betType === 'Total' && oddTarget === 'Over':
			latestBetDetail = {
				oddLine: Number(latestEvent.odds.overLine),
				oddPoint: Number(latestEvent.odds.totalNumber) - Number(teaserPoint),
				oddTarget: 'Over',
				betType: 'Total'
			};
			break;
		case betType === 'Total' && oddTarget === 'Under':
			latestBetDetail = {
				oddLine: Number(latestEvent.odds.underLine),
				oddPoint: Number(latestEvent.odds.totalNumber + teaserPoint),
				oddTarget: 'Under',
				betType: 'Total'
			};
			break;
		case betType === 'Draw':
			latestBetDetail = {
				oddLine: Number(latestEvent.odds.drawLine),
				betType: 'Draw'
			};
			break;
		default:
			return;
	}
	return { betDetailMatch: _lodash2.default.isEqual(prevEvent.betDetail, latestBetDetail), latestBetDetail: latestBetDetail };
};

exports.default = compareBetDetail;
//# sourceMappingURL=compareBetDetail.js.map