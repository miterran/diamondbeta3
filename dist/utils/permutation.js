"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var permutation = function permutation(arr) {
	var permutations = [];

	var swap = function swap(a, b) {
		var tmp = arr[a];
		arr[a] = arr[b];
		arr[b] = tmp;
	};

	var generate = function generate(n) {
		if (n === 1) {
			var newArr = arr.slice(0, 2);
			permutations.push(newArr);
		} else {
			for (var i = 0; i !== n; ++i) {
				generate(n - 1);
				swap(n % 2 ? 0 : i, n - 1);
			}
		}
	};

	generate(arr.length);
	return permutations;
};

exports.default = permutation;
//# sourceMappingURL=permutation.js.map