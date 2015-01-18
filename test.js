var test = require('prova');
var flatGlob = require('./');

test('applies glob and returns a flat array with no duplicates', function (t){
  flatGlob(['index.js', '*.js'], function (error, files) {
    if (error) return t.end(error);

    t.deepEqual(files, ['index.js', 'test.js']);
    t.end();
  });
});

test('runs synchronously optionally', function(t){
  t.deepEqual(flatGlob.sync(['index.js', '*.js']), ['index.js', 'test.js']);
  t.end();
});

test('Supports {file1,file2} pattern', function(t){
  t.deepEqual(flatGlob.sync(['./{index,test}.js']), ['./index.js', './test.js']);
  t.end();
});
