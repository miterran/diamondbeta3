'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Schema = _mongoose2.default.Schema;

var schema = new Schema({
  firstName: String,
  lastName: String,
  pointOne: Number,
  pointTwo: Number,
  total: Number
});

var PersonClass = function () {
  function PersonClass() {
    _classCallCheck(this, PersonClass);
  }

  _createClass(PersonClass, [{
    key: 'getFullTotalNumber',
    value: function getFullTotalNumber() {
      return this.pointOne + this.pointTwo;
    }

    // const newPerson = new Person({})
    // newPerson.fullName = 'hi you'
    // res.json(newPerson)

    //  `getFullName()` becomes a document method
    // getFullName() {
    //   return `${this.firstName} ${this.lastName}`;
    // }

    // `findByFullName()` becomes a static

  }, {
    key: 'fullTotalNumber',

    // `fullName` becomes a virtual
    // get fullName() {
    //   return `${this.firstName} ${this.lastName}`;
    // }

    // set fullName(v) {
    // 	console.log(v)
    //   const firstSpace = v.indexOf(' ');
    //   this.firstName = v.split(' ')[0];
    //   this.lastName = firstSpace === -1 ? '' : v.substr(firstSpace + 1);
    // }

    // totalNumber(){
    // 	return this.num1 + this.num2
    // }

    // get totalNumber(){
    // 	return this.total
    // }


    get: function get() {
      return this.pointOne + this.pointTwo;
    }
  }, {
    key: 'totalNumber',
    set: function set(v) {
      this.total = v.pointOne + v.pointTwo;
    }
  }], [{
    key: 'findByFullName',
    value: function findByFullName(name) {
      var firstSpace = name.indexOf(' ');
      var firstName = name.split(' ')[0];
      var lastName = firstSpace === -1 ? '' : name.substr(firstSpace + 1);
      return this.findOne({ firstName: firstName, lastName: lastName });
    }
  }]);

  return PersonClass;
}();

schema.loadClass(PersonClass);

var Person = _mongoose2.default.model('Person', schema);

exports.default = Person;
//# sourceMappingURL=Person.js.map