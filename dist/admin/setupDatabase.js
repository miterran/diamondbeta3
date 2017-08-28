'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SportLeague = require('../models/SportLeague');

var _SportLeague2 = _interopRequireDefault(_SportLeague);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _EventOdd = require('../models/EventOdd');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _xml2js = require('xml2js');

var _xml2js2 = _interopRequireDefault(_xml2js);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var parser = new _xml2js2.default.Parser({ explicitArray: false });

// router.get('/build', (req, res) => {
// 	fs.readFile(__dirname + '/pickmon.xml', function(err, data){
//     	parser.parseString(data, function (err, result) {
//     	    res.json(result)
//     	});
// 	})
// })

// import GlobalVar from '../models/GlobalVar'

// router.get('/build', (req, res) => {
// 	let newGlobalVar = new GlobalVar({
// 		middlewareUpdatedAt: moment(),
// 		stopWithinSec: 0
// 	})
// 	newGlobalVar.save().then(() => {
// 		console.log('done')
// 	})
// })


exports.default = router;
//# sourceMappingURL=setupDatabase.js.map