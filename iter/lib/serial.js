var nextTick = require("just-next-tick");

module.exports = serial;

function serial (from, to, chain) {
  nextTick(next);

  var i = from;

  function next(){
    if (i >= to) {
      chain.complete() && chain.complete()();
      return;
    }

    chain.step()(function(error){
      if (error) {
        chain.error() && chain.error()(error);
        return;
      }

      i++;
      next();
    }, i);
  };
}
