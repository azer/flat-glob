var glob = require("glob");
var flatten = require("flatten-array");
var uniques = require("uniques");
var iter = require("iter");

module.exports = flatGlob;

function flatGlob (arr, callback) {
  var result = [];
  arr = flatten(arr);

  iter(arr.length)
    .done(function () {
      callback(undefined, uniques(flatten(result)));
    })
    .run(function (next, i) {
      if (arr[i].indexOf('*') == -1) {
        result.push(arr[i]);
        return next();
      }

      glob(arr[i], function (error, files) {
        if (error) return callback(error);

        result.push(files);
        next();
      });
    });
}
