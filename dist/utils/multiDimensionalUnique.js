"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var multiDimensionalUnique = function multiDimensionalUnique(arr) {
    var uniques = [];
    var itemsFound = {};
    for (var i = 0, l = arr.length; i < l; i++) {
        var stringified = JSON.stringify(arr[i]);
        if (itemsFound[stringified]) {
            continue;
        }
        uniques.push(arr[i]);
        itemsFound[stringified] = true;
    }
    return uniques;
};

exports.default = multiDimensionalUnique;
//# sourceMappingURL=multiDimensionalUnique.js.map