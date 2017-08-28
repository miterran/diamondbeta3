'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var CoolDownSchema = _mongoose2.default.Schema({
	usage: { type: String },
	sec: { type: Number },
	updatedAt: { type: Date }
});

var CoolDown = _mongoose2.default.model('CoolDown', CoolDownSchema);

exports.default = CoolDown;
//# sourceMappingURL=CoolDown.js.map