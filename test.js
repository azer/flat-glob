var flatGlob = require("./");
var expect = require("chai").expect;

it('applies glob and returns a flat array with no duplicates', function (done){
  flatGlob(['index.js', '*.js'], function (error, files) {
    if (error) return done(error);

    expect(files).to.deep.equal(['index.js', 'test.js']);
    done();
  });
});

it('tests without wildcard', function (done){
  flatGlob(['index.js', 'test.js', 'test.js'], function (error, files) {
    if (error) return done(error);

    expect(files).to.deep.equal(['index.js', 'test.js']);
    done();
  });
});

it('runs synchronously optionally', function(){
  expect(flatGlob.sync(['index.js', '*.js', '*.md', '!README.md'])).to.deep.equal(['index.js', 'test.js']);
});
