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
  var files = [];

  while (++i < len) {
    if (arr[i].indexOf('*') == -1 && arr[i].indexOf('!') !== 0) {
      result.push(arr[i]);
      continue;
    }

    files = glob.sync(arr[i]);
    if(arr[i].indexOf('!') !== 0){
      result = result.concat(glob.sync(arr[i]));
    }
  }

  i = -1;
  while (++i < len) {
    if (arr[i].indexOf('*') == -1 && arr[i].indexOf('!') === 0) {
      removeEntries(result, arr[i]);
      continue;
    }

    files = glob.sync(arr[i]);
    if(arr[i].indexOf('!') === 0){
      removeEntries(result, glob.sync(arr[i]));
    }
  }

  return uniques(flatten(result));
}

function removeEntries(list, removes){
  for(var i = 0; i < removes.length; i++){
    var index = list.indexOf(removes[i]);
    if(index > -1){
      list.splice(index, 1);
    }
  }
}
