var glob = require("glob");
var flatten = require("./flatten-array");
var uniques = require("underscore").uniq;
var iter = require("./iter");

module.exports = async;
module.exports.sync = sync;

function async (arr, callback) {
  var result = [];
  
  if(typeof arr === 'string'){
    arr = [arr];
  }else if(!Array.isArray(arr)){
    //must be an object
    callback(new Error('Invalid property type. Must be an array of string file paths or glob patterns, or a single string.'));
    return;
  }
  
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
  
  if(typeof arr === 'string'){
    arr = [arr];
  }else if(!Array.isArray(arr)){
    //must be an object
    throw new Error('Invalid property type. Must be an array of string file paths or glob patterns, or a single string.');
  }
  
  arr = flatten(arr);

  var i = -1;
  var len = arr.length;
  var files = [];

  //this adds new files.
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

  //this part removes files
  i = -1;
  while (++i < len) {
    files = glob.sync(arr[i]);
    if(arr[i].indexOf('!') === 0){
      removeEntries(result, glob.sync(arr[i].substr(1)));
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
