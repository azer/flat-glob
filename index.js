var glob = require("glob");
var flatten = require("flatten-array");
var uniques = require("uniques");
var iter = require("iter");

module.exports = async;
module.exports.sync = sync;

function async (arr, callback) {
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

function sync (arr) {
  var result = [];
  arr = flatten(arr);

  var i = -1;
  var len = arr.length;

  while (++i < len) {
    if (arr[i].indexOf('*') == -1) {
      result.push(arr[i]);
      continue;
    }

    result.push(glob.sync(arr[i]));
  }

  return uniques(flatten(result));
}
