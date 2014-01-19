var flatGlob = require("./");

it('applies glob and returns a flat array with no duplicates', function (done){
  flatGlob(['index.js', '*.js'], function (error, files) {
    if (error) return done(error);

    expect(files).to.deep.equal(['index.js', 'test.js']);
    done();
  });
});
