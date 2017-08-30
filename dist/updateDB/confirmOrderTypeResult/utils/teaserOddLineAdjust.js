'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var teaserOddLineAdjust = function teaserOddLineAdjust(orderType, teamLength) {
	var teaserOddLine = 0;

	switch (orderType) {
		case 'Teaser6040':
			switch (teamLength) {
				case 2:
					teaserOddLine = -110;
					break;
				case 3:
					teaserOddLine = 160;
					break;
				case 4:
					teaserOddLine = 250;
					break;
				case 5:
					teaserOddLine = 400;
					break;
				case 6:
					teaserOddLine = 600;
					break;
				case 7:
					teaserOddLine = 900;
					break;
				case 8:
					teaserOddLine = 1400;
					break;
				default:
					break;
			}
			break;
		case 'Teaser6545':
			switch (teamLength) {
				case 2:
					teaserOddLine = -130;
					break;
				case 3:
					teaserOddLine = 140;
					break;
				case 4:
					teaserOddLine = 200;
					break;
				case 5:
					teaserOddLine = 350;
					break;
				case 6:
					teaserOddLine = 500;
					break;
				case 7:
					teaserOddLine = 800;
					break;
				case 8:
					teaserOddLine = 1200;
					break;
				default:
					break;
			}
			break;
		case 'Teaser7050':
			switch (teamLength) {
				case 2:
					teaserOddLine = -140;
					break;
				case 3:
					teaserOddLine = 120;
					break;
				case 4:
					teaserOddLine = 180;
					break;
				case 5:
					teaserOddLine = 300;
					break;
				case 6:
					teaserOddLine = 400;
					break;
				case 7:
					teaserOddLine = 700;
					break;
				case 8:
					teaserOddLine = 1000;
					break;
				default:
					break;
			}
			break;
		case 'SuperTeaser':
			switch (teamLength) {
				case 3:
					teaserOddLine = -130;
					break;
				default:
					break;
			}
			break;
		default:
			break;
	}

	return teaserOddLine;
};

exports.default = teaserOddLineAdjust;
//# sourceMappingURL=teaserOddLineAdjust.js.map