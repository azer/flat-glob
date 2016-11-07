var flatGlob = require("./");
var expect = require("chai").expect;

describe('async option', function(){
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
  
  it('works with a single string glob pattern', function(done){
    flatGlob('*.js', function(error, files){
      expect(files).to.deep.equal(['index.js', 'test.js']);
      done();
    });
  });
  
  it('fails on an invalid property type', function(done){ 
    flatGlob(new Object(), function(e){
      expect(e.message).to.equal('Invalid property type. Must be an array of string file paths or glob patterns, or a single string.');
      done();
    });
  });
});

describe('sync option', function(){
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
});
