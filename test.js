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

it('works with a single string glob pattern', function(){
  expect(flatGlob.sync('*.js')).to.deep.equal(['index.js', 'test.js']);
});

it('fails on an invalid property type', function(){
  try{  
    flatGlob.sync(new Object());
  }catch(e){
    expect(e.message).to.equal('Invalid property type. Must be an array of string file paths or glob patterns, or a single string.');
  }
});
