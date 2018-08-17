'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var id = document.getElementById('btn');
var name = 'person';
exports.persoName = name;

var sort = function sort() {
    var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;
    var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    return a - b;
};

var person = function () {
    function person(x, y) {
        _classCallCheck(this, person);

        this.x = x;
        this.y = y;
    }

    _createClass(person, [{
        key: 'talk',
        value: function talk() {
            console.log('I can talk');
        }
    }, {
        key: 'walk',
        value: function walk() {
            console.log('I can walk');
        }
    }]);

    return person;
}();