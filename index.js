var glob = require("glob");
var flatten = require("flatten-array");
var uniques = require("uniques");
var loop = require("parallel-loop");

module.exports = async;
module.exports.sync = sync;

function async (arr, callback) {
  var result = [];
  arr = flatten(arr);

  loop(arr.length, each, function (error) {
    if (error) {
      return callback(error);
    }

    callback(undefined, uniques(flatten(result)));
  });

  function each (done, i) {
    glob(arr[i], function (error, files) {
      if (error) return callback(error);

      result.push(files);
      done();
    });
  }
}

function sync (arr) {
  var result = [];
  arr = flatten(arr);

  var i = -1;
  var len = arr.length;

  while (++i < len) {
    result.push(glob.sync(arr[i]));
  }

  return uniques(flatten(result));
}
