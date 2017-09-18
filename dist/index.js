'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

require('babel-polyfill');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _methodOverride = require('method-override');

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _nodeSchedule = require('node-schedule');

var _nodeSchedule2 = _interopRequireDefault(_nodeSchedule);

var _resetUserStatus = require('./schedule/resetUserStatus');

var _resetUserStatus2 = _interopRequireDefault(_resetUserStatus);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _jwtStrategy = require('./middleware/jwtStrategy');

var _jwtStrategy2 = _interopRequireDefault(_jwtStrategy);

var _player = require('./routes/player');

var _player2 = _interopRequireDefault(_player);

var _agent = require('./routes/agent');

var _agent2 = _interopRequireDefault(_agent);

var _superAgent = require('./routes/superAgent');

var _superAgent2 = _interopRequireDefault(_superAgent);

var _createAccount = require('./routes/createAccount');

var _createAccount2 = _interopRequireDefault(_createAccount);

var _authLogin = require('./routes/authLogin');

var _authLogin2 = _interopRequireDefault(_authLogin);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_passport2.default.use(_jwtStrategy2.default);

_mongoose2.default.connect(_config2.default.mongoURL, { useMongoClient: true });
_mongoose2.default.Promise = _bluebird2.default;

var app = (0, _express2.default)();
app.server = _http2.default.createServer(app);

app.use((0, _morgan2.default)('dev'));

app.use((0, _cors2.default)());
app.use((0, _helmet2.default)());
app.use((0, _compression2.default)());
app.use((0, _methodOverride2.default)());

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.use(_passport2.default.initialize());

app.use(_express2.default.static(_path2.default.resolve(__dirname, '../client/build')));

(0, _resetUserStatus2.default)();
_nodeSchedule2.default.scheduleJob('* * 24 * * 1', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
	return regeneratorRuntime.wrap(function _callee$(_context) {
		while (1) {
			switch (_context.prev = _context.next) {
				case 0:
					_context.next = 2;
					return (0, _resetUserStatus2.default)();

				case 2:
				case 'end':
					return _context.stop();
			}
		}
	}, _callee, undefined);
})));

app.use('/api', _authLogin2.default);
//app.use('/test', createAccount);

app.use('/api', _passport2.default.authenticate('jwt', { session: false }));

app.use('/api/player', _player2.default);
app.use('/api/agent', _agent2.default);
app.use('/api/super-agent', _superAgent2.default);

app.get('*', function (request, response) {
	return response.sendFile(_path2.default.resolve(__dirname, '../client/build', 'index.html'));
});

app.server.listen(process.env.PORT || _config2.default.port, function () {
	return console.log('Started on port ' + app.server.address().port);
});

exports.default = app;
//# sourceMappingURL=index.js.map