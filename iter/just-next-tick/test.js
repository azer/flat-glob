var nextTick = require("./");

it('calls passed function after once things are cool', function(done){
  var cool;

  nextTick(function () {
    expect(cool).to.be.true;
    done();
  });

  cool = true;
});
