var test = require('prova');
var flatGlob = require("./");

test('applies glob and returns a flat array with no duplicates', function (t){
  flatGlob(['index.js', '*.js'], function (error, files) {
    t.error(error);
    t.deepEqual(files, ['index.js', 'test.js']);
    t.end();
  });
});

test('without wildcard', function (t){
  flatGlob(['index.js', 'test.js', 'test.js'], function (error, files) {
    t.error(error);
    t.deepEqual(files, ['index.js', 'test.js']);
    t.end();
  });
});

test('runs synchronously optionally', function (t) {
  t.plan(1);
  t.deepEqual(flatGlob.sync(['index.js', '*.js']), ['index.js', 'test.js']);
});
